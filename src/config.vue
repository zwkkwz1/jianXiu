<script type="text/javascript">
const host = 'http://localhost:9180';

export default {
  host,
  /**
   * 字符串16位转8位
   */
  utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
	  c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
	      out += str.charAt(i);
      } else if (c > 0x07FF) {
	      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
	      out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
	      out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
      } else {
	      out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
	      out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
      }
    }
  	return out;
	},
	time1To2(i) {
	  return i < 10 ? '0' + i : i;
	},
	dateToString(dateTime,format) {
	  var d, k, o;
    o = {
      "M+": dateTime.getMonth() + 1,
      "d+": dateTime.getDate(),
      "h+": dateTime.getHours(),
      "m+": dateTime.getMinutes(),
      "s+": dateTime.getSeconds(),
      "q+": Math.floor((dateTime.getMonth() + 3) / 3),
      "S": dateTime.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (k in o) {
    	d = o[k];
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? d : ("00" + d).substr(("" + d).length));
      }
    }
    return format;
	}
};
</script>