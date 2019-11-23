/**
 * 經實測，require 的寫法最終產生出來的的檔案會大一些，以此份檔案為例 968 byte
 * import from 的寫法最終產生出來的檔案會小一些，以此份檔案為例 1.04 Kib
 * import from 方法目前也能直接被較新的瀏覽器所接受，因為被包含在了 ES6 的規範內
 * 如果要壓榨出極限的載入效能優化，應該是個可以考慮的點 XDD
 */

/**
 * 在撰寫下面引入位置檔案名稱的時候
 * 根據 eslint 和開發社群的建議，在開發時似乎不要再加入副檔名(擴展名)，讓套件自動判斷較好
 * 但若未經打包，尚未確認瀏覽器是否能自動判斷此檔案，不知哪種為正確
 * eslint 預設加入擴展名，會被報錯
 */
// const utils = require('./utils.js');
import utils from './utils';

/**
 * 測試如何呼叫同隻檔案的多個 function
*/
console.log(utils.add(3, 6));
console.log(utils.mutiple(6, 8));
