// 取得 cookie 的值
function getCookie(cookieName) {
  const decodecookie = decodeURI(document.cookie);
  const cookieArray = decodecookie.split(';');
  for (let i = 0; i < cookieArray.length; i += 1) {
    const cookie = cookieArray[i];
    let cookieValue = '';
    if (cookie.indexOf(cookieName) !== -1) {
      cookieValue = cookie.substring(cookieName.length + 2);
      return cookieValue;
    }
  }
  return undefined;
}
// 簡單處理 JS 逃逸，尚未完整分析理解這段細節
// from: https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript/4835406#4835406
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
// 處理 nl2br，尚未完整分析理解這段細節
// from: https://gist.github.com/yidas/41cc9272d3dff50f3c9560fb05e7255e
function nl2br(str, replaceMode, isXhtml) {
  const breakTag = (isXhtml) ? '<br />' : '<br>';
  const replaceStr = (replaceMode) ? `$1${breakTag}` : `$1${breakTag}$2`;
  return (`${str}`).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
}

// 處理第一個主留言框
const unlogin = document.querySelector('form > .unlogin');
unlogin.addEventListener('click', () => {
  window.location = './login.php';
});

// 送出主留言
const leaveMsg = document.querySelector('.comments__btn-leaveMsg');
leaveMsg.addEventListener('click', (e) => {
  e.preventDefault();
  if (document.querySelector('textarea').value === '') {
    alert('你並沒有留言喔！');
  } else {
    const comments = $('textarea').val();
    const csrfToken = getCookie('csrfToken');
    $.ajax({
      type: 'POST',
      url: './handle/handle_add_msg.php',
      data: {
        comments,
        csrfToken,
      },
    }).done((res) => {
      const data = JSON.parse(res);
      if (data.status !== 1) return alert(data.msg);
      const text = `
      <section class="msgcard invisible">
        <div class="msgcard__header">
          <img src="${data.avatar}" alt="avatar" class="avatar">
          <p class="msgcard__nickname  ${data.authority}">${data.nickname}</p>
          <p class="msgcard__datetime">${data.createdTime}</p>
        </div>
        <p class="msgcard__content">${data.content}</p>
        <button class="msgcard__btn-edit" data-post_id="${data.postId}">Edit 編輯</button>`
      + `<button class="msgcard__btn-delete" data-post_id="${data.postId}" data-csrftoken="${csrfToken}">Delete 刪除</button>`
      + `<button class="msgcard__btn-thumb" data-post_id="${data.postId}">按讚 <i class="far fa-thumbs-up fa-lg" aria-hidden="true"></i> 0</button>
        <form class="reply">
          <div class="reply__wrap">
            <textarea name="comments" class="reply__textarea" placeholder="回復留言"></textarea>
            <button class="msgcard__btn-reply" data-parent_id="${data.postId}" data-csrfToken="${csrfToken}">Reply 回覆</button>
          </div>
        </form>
      </section>`;
      alert(data.msg);
      $('.msgcard:first').before(text);
      $('.msgcard:first').slideDown().removeClass('invisible');
      $('textarea').val('');
      return res;
    }).fail((res) => {
      alert(res.status);
    });
  }
});

// 處理編輯留言
const contain = {};// 利用物件建立訊息容器
const msgboard = document.querySelector('.msgboard');
msgboard.addEventListener('click', (e) => {
  if (!e.target.classList.contains('msgcard__btn-edit')) return;
  e.stopImmediatePropagation();
  let target = '';
  const postId = e.target.getAttribute('data-post_id');
  if (e.target.parentNode.children[1].nodeName === 'P') {
    contain[postId] = e.target.parentNode.querySelector('.msgcard__content').innerText;
  }
  const editForm = `
  <textarea name="comments" class="msgcard__textarea">${contain[postId]}</textarea>
  <button class="msgcard__btn-send" data-post_id="${postId}" data-csrftoken="${getCookie('csrfToken')}">Change 更改留言`;
  if (!e.target.classList.contains('editing')) {
    e.target.innerText = 'Cancel 取消編輯';
    target = e.target.parentNode.querySelector('.msgcard__content');
    target.outerHTML = editForm;
  } else {
    e.target.innerText = 'Edit 編輯';
    target = e.target.parentNode.querySelector('textarea');
    target.outerHTML = `<p class="msgcard__content">${nl2br(escapeHtml(contain[postId]))}</p>`;
    e.target.parentNode.removeChild(e.target.parentNode.querySelector('.msgcard__btn-send'));
  }
  e.target.classList.toggle('editing');
});

// 處理更正留言
$('.msgboard').on('click', '.msgcard__btn-send', (e) => {
  e.stopImmediatePropagation();
  const postId = $(e.target).data('post_id');
  const comments = $(e.target).prev().val();
  const csrfToken = getCookie('csrfToken');
  $.ajax({
    type: 'POST',
    url: './handle/handle_edit_msg.php',
    data: {
      post_id: postId,
      comments,
      csrfToken,
    },
  }).done((res) => {
    const data = JSON.parse(res);
    if (data.status === 1) {
      alert(data.msg);
      $(e.target).next().text('Edit 編輯');
      const pText = `<p class="msgcard__content">${nl2br(escapeHtml(comments))}</p>`;
      $(e.target).prev().replaceWith(pText);
      $(e.target).next().toggleClass('editing');
      $(e.target).remove();
    } else {
      alert(data.msg);
    }
  }).fail((res) => {
    alert(res.status);
  });
});

// 彈出子留言回覆視窗
msgboard.addEventListener('click', (e) => {
  if (!e.target.parentNode.classList.contains('msgcard__inside') || e.target.classList.contains('msgcard__textarea')) return;
  e.stopPropagation();
  $(e.target).parent().find('form').slideToggle()
    .removeClass('invisible');
});

// 處理回復按鈕
$('.msgboard').on('click', '.msgcard__btn-reply', (e) => {
  e.preventDefault();
  if ($(e.target).prev().val() === '') return alert('你並沒有留言喔！');
  const comments = $(e.target).prev().val();
  const csrfToken = getCookie('csrfToken');
  const parentId = $(e.target).data('parent_id');
  $.ajax({
    type: 'POST',
    url: './handle/handle_add_msg.php',
    data: {
      comments,
      csrfToken,
      parent_id: parentId,
    },
  }).done((res) => {
    const data = JSON.parse(res);
    if (data.status !== 1) return alert(data.msg);
    const userTitleType = (data.userId === data.parentUserId) ? 'author' : data.authority;
    const text = `
    <div class="msgcard__inside invisible">
      <div class="inside__header">
      <img src="${data.avatar}" alt="avatar" class="avatar">
      <p class="inside__nickname  ${userTitleType}">
        ${data.nickname}
      </p>
      <p class="msgcard__datetime">${data.createdTime}</p>
    </div>
    <p class="msgcard__content">${nl2br(escapeHtml(data.content))}</p>
    <button class='msgcard__btn-edit' data-post_id='${data.postId}'>Edit 編輯</button>`
  + `<button class='msgcard__btn-delete' data-post_id='${data.postId}' data-csrfToken='${csrfToken}'>Delete 刪除</button>`
  + `<button class="msgcard__btn-thumb" data-post_id="${data.postId}">按讚 <i class="far fa-thumbs-up fa-lg" aria-hidden="true"></i> 0</button>
    <form class="reply">
      <div class="reply__wrap">
        <textarea name="comments" class="reply__textarea" placeholder="回復留言"></textarea>
        <button class="msgcard__btn-reply" data-parent_id="${parentId}" data-csrfToken="${csrfToken}">Reply 回覆</button>
      </div>
    </form>`;
    alert(data.msg);
    $(e.target).parents('.msgcard').append(text);
    $(e.target).parents('.msgcard').children('.invisible').slideDown()
      .removeClass('invisible');
    $('textarea').val('');
    return res;
  }).fail((res) => {
    alert(res.status);
  });
  return false;
});

// 處理刪除留言
$('.msgboard').on('click', '.msgcard__btn-delete', (e) => {
  e.stopImmediatePropagation();
  const postId = $(e.target).data('post_id');
  const csrfToken = getCookie('csrfToken');
  $.ajax({
    type: 'POST',
    url: './handle/handle_delete.php',
    data: {
      post_id: postId,
      csrfToken,
    },
  }).done((res) => {
    const data = JSON.parse(res);
    if (data.status !== 1) return alert(data.msg);
    alert(data.msg);
    $(e.target).parent('.msgcard').fadeOut(500);
    $(e.target).parent('.msgcard__inside').fadeOut(500);
    return res;
  }).fail((res) => {
    alert(res.status);
  });
});

// 處理按讚監聽
$('.msgboard').on('click', '.msgcard__btn-thumb', (e) => {
  e.stopImmediatePropagation();
  let $target = $(e.target);
  if (!$(e.target).hasClass('msgcard__btn-thumb')) {
    $target = $(e.target).parent('.msgcard__btn-thumb');
  }
  const postId = $target.data('post_id');
  $.ajax({
    type: 'POST',
    url: './handle/handle_thumbs.php',
    data: {
      post_id: postId,
    },
  }).done((res) => {
    const data = JSON.parse(res);
    if (data.status !== 1) return alert(data.msg);
    $target.toggleClass('thumb-actived');
    const thumbdown = '按讚 <i class="far fa-thumbs-up fa-lg" aria-hidden="true"></i> 0';
    const thumbup = '取消按讚 <i class="far fa-thumbs-up fa-lg" aria-hidden="true"></i> 1';
    $target.html($target.html() === thumbdown ? thumbup : thumbdown);
    return res;
  }).fail((res) => {
    alert(res.status);
  });
});
