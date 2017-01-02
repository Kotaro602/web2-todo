/*
日付をフォーマットするためのメソッド
*/
export function createFormatDate() {
    
    var date = new Date();
    var yyyy = date.getFullYear(); // 西暦を取得
    var mm = date.getMonth() + 1;  // 月を取得（返り値は実際の月-1なので、+1する）
    var dd = date.getDate(); // 日を取得
    var hh = date.getHours();
    var mi = date.getMinutes();
    var ss = date.getSeconds(); //秒
    var ms = date.getMilliseconds() //ミリ秒
     
    // 一桁の場合は先頭に0をつける
    if (mm < 10) mm = "0" + mm;
    if (dd < 10) dd = "0" + dd;
    if (hh < 10) hh = "0" + hh;
    if (mi < 10) mi = "0" + mi;
    if (ss < 10) ss = "0" + ss;
    
    return yyyy + mm + dd + hh + mi + ss + ms;
}

//暫定対応…
export function substr(text, lenPoint, truncation) {
    if (text == undefined || text == '') return '';
    if (truncation === undefined) { truncation = ''; }
    var text_array = text.split('');
    var point = 0;
    var str = '';
    for (var i = 0; i < text_array.length; i++) {
       if (text_array[i].match(/^[A-Z]+$/)) {
          point += 1.25;
       } else {
          var n = escape(text_array[i]);
          if (n.length < 4) point++;
          else point += 1.85;
       }
        if (point > lenPoint) {
            return str + truncation;
        }
        str += text.charAt(i);
    }
    return text;
}

export function getRandamMath(){
   return Math.random()　+ 1
}