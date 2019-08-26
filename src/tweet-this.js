// 현재 페이지를 트윗
(function () {
  window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(location) + "&text=" + encodeURIComponent(document.title), "_blank", "width=552,height=450,menubar=no,toolbar=no");
})();
