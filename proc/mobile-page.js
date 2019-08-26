(function () {
  var origin = window.location;
  var host = origin.host;
  var href = origin.href;
  var pathname = origin.pathname;
  var search = origin.search;
  var blogMe = href.indexOf("blog.me") > -1;
  var target;

  if (blogMe) {
    target = "https://m.blog.naver.com/" + host.split(".")[0] + pathname;
  } else {
    switch (window.location.host) {
      case "blog.naver.com":
        target = search ? "https://m." + host + "/" + search.match(/blogId=[0-9a-zA-Z_-]+/)[0].split("=")[1] + "/" + search.match(/logNo=[0-9]+/)[0].split("=")[1] : href.replace(host, "m." + host);
        break;
      case "blog.daum.net":
        if (pathname == "/_blog/BlogTypeView.do") {
          var metas = document.head.getElementsByTagName("meta");
          for (var i = 0; i < metas.length; i++) {
            if (metas[i].outerHTML.indexOf("og:url") > -1) {
              target = "//m." + metas[i].outerHTML.substring(40, metas[i].outerHTML.length-2);
              break;
            }
          }
        } else {
          target = "//" + href.replace(host, "m." + host);
          target = search ? target.split("?")[0] : target;
        }
        break;
      case "cafe.naver.com":
        target = search ? "//m." + host + pathname + search.match(/articleid=[0-9]+/)[0].split("=")[1] : href.replace(host, "m." + host);
        break;
      case "cafe.daum.net":
        if (search) {
          var scripts = document.head.getElementsByTagName("script");
          var cafeText;
          for (var j = 0; j < scripts.length; j++) {
            if (scripts[i].innerText.indexOf("var CAFEAPP") == 0) {
              cafeText = scripts[i].innerText;
              break;
            }
          }
          var evalText = eval("(" + cafeText.substring(cafeText.indexOf("{"), cafeText.lastIndexOf("}") + 1) + ")");
          target = "//m." + host + "/" + evalText.GRPCODE + "/" + evalText.FLDID + "/" + search.match(/datanum=[0-9]+/)[0].split("=")[1];
          break;
        } else {
          target = href.replace(host, "m." + host);
        }
        break;
      case "news.khan.co.kr":
        target = "//m.khan.co.kr/view.html?art_id=" + search.match(/artid=[0-9]+/)[0].split("=")[1];
        break;
      case "www.aladin.co.kr":
        target = "//" + host + "/m/mproduct.aspx?" + search.match(/ItemId=[0-9]+/)[0];
        break;
      case "search.danawa.com":
        var v = (search.match(/k1=[^&]+/) || search.match(/query=[^&]+/))[0].split("=")[1];
        target = "//" + host + "/mobile/dsearch.php?keyword=" + v;
        break;
      case "prod.danawa.com":
        target = "//m.danawa.com/product/product.html?code=" + search.match(/pcode=[0-9]+/)[0].split("=")[1] + "&cateCode=" + search.match(/cate=[0-9]+/)[0].split("=")[1];
        break;
      default:
        window.alert("처리할 수 없는 주소입니다.");
        break;
    }
  }

  window.open(target, "_self");
})();
