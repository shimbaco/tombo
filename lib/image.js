var gm = require("gm");

exports.convert = function(imgBody, fileName, params, callback) {
  var image = gm(imgBody).options({ imageMagick: true })
                         .strip()
                         .setFormat("jpg");
  var gravity = params.gravity || "Center";
  var quality = params.quality || "90";

  image = image.gravity(gravity).quality(quality);

  image.size(function(err, originalSize) {
    if (err) return callback(err);

    if (resizedHeight(originalSize, params) < params.height) {
      image = image.resize(null, params.height);
    } else {
      image = image.resize(params.width);
    }

    var extentWidth  = params.width  || originalSize.width;
    var extentHeight = params.height || originalSize.height;
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

function resizedHeight(originalSize, params) {
  return (originalSize.height * params.width) / originalSize.width;
}
