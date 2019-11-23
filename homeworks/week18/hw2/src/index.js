// 經實測，require 的寫法最終產生出來的的檔案會大一些，以此份檔案為例 968 byte
// const utils = require('./utils.js');

// import from 的寫法最終產生出來的檔案會小一些，以此份檔案為例 1.04 Kib
// 此方法目前也能直接被較新的瀏覽器所接受，因為被包含在了 ES6 的規範內
// 如果要壓榨出極限的載入效能優化，應該是個可以考慮的點 XDD
import utils from './utils';

console.log(utils(3, 6));
