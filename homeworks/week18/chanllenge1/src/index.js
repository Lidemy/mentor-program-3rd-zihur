/**
 * 測試後發現如果有載入多支 .css 會連同 .styl 彙整成一支 css 檔案
 */
const utils = require('./utils.js');
import './file.styl';


/**
 * 測試如何呼叫同隻檔案的多個 function
*/
console.log(utils.add(3, 6));
console.log(utils.mutiple(6, 8));
