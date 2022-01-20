function set(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function get(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length,c.length);
      }
  }
  return "";
}

function check(cname) {
    var resul = false;
    var username = get(cname);
    if (username != "") {
      resul = true;
    }
    return resul;
}

function destroy(cname) {
    return document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export default {set,get,check,destroy}