var tools = (function () {
  var tplReplace = function (template, replaceObject) {
    return template.replace(/{{(.*?)}}/g, (node, key) => {
      return replaceObject[key];
    });
  }

  var imgLazyLoad = function (images, doc) {
    var len = images.length,
      cHeight = doc.documentElement.clientHeight,
      n = 0;

    return function () {
      var sTop = doc.documentElement.scrollTop || doc.body.scrollTop,
        imgItem;

      for (var i = n; i < len; i++) {
        imgItem = images[i];

        if (imgItem.offsetTop < cHeight + sTop) {
          imgItem.src = imgItem.getAttribute("data-src");
          imgItem.removeAttribute("data-src");
          n++;
        }
      }
    };
  }
  var throttle = function (fn, delay) {
    var t = null,
      res,
      begin = new Date().getTime();

    return function () {
      var args = arguments,
        _self = this,
        cur = new Date().getTime();

      if (t) {
        clearTimeout(t);
      }

      if (cur - begin >= delay) {
        res = fn.apply(_self, args);
        begin = cur;
      } else {
        t = setTimeout(function () {
          res = fn.apply(_self, args);
        }, delay);
      }
      return res;
    };
  }


  return {
    tplReplace,
    throttle,
    imgLazyLoad
  }
})();