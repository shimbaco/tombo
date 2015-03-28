var gm = require("gm");

exports.convert = function(imgBody, fileName, params, callback) {
  var image = gm(imgBody).options({ imageMagick: true })
                         .strip()
                         .setFormat("jpg");
  var gravity = params.gravity || "Center";
  var quality = params.quality || "90";

  image = image.gravity(gravity).quality(quality);

  image.size(function(err, size) {
    if (err) return callback(err);

    var resizeWidth = resizeHeight = null;
    if (size.width < params.width)   resizeWidth  = params.width;
    if (size.height < params.height) resizeHeight = params.height;

    // 実際の画像の縦横よりも大きなサイズが指定されたとき、
    // 画像を指定されたサイズにリサイズする
    // (リサイズしないと実際の画像サイズからはみ出た部分が白色で描画されてしまう)
    if (resizeWidth || resizeHeight) {
      if (resizeWidth > resizeHeight) {
        image = image.resize(resizeWidth);
      } else {
        image = image.resize(null, resizeHeight);
      }
    }

    var extentWidth  = params.width  || size.width;
    var extentHeight = params.height || size.height;
    image = image.extent(extentWidth, extentHeight);

    if (params.blur) {
      image = image.blur(0, params.blur);
    }

    image.write("/tmp/" + fileName + ".jpg", function(err) {
      if (err) return callback(err);

      return callback(null);
    });
  });
};
