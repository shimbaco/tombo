var crypto = require("crypto");
var fs     = require("fs");

var koa         = require("koa");
var koaRouter   = require("koa-router");
var koaSendfile = require('koa-sendfile');
var _           = require("lodash");

var parameter = require("./lib/parameter");
var image     = require("./lib/image");

var app    = koa();
var router = koaRouter();

const port      = process.env.PORT || 5000;
const imageHost = process.env.TOMBO_IMAGE_HOST;

router.get("/:joinedParams([0-9a-zA-Z:,]+)/:path*", show);
app.use(router.routes());

function *show() {
  var url      = imageHost + "/" + this.params.path;
  var response = yield image.fetch(url);

  if (response.statusCode === 200) {
    this.type = "image/jpeg"

    var params   = parameter.convert(this.params.joinedParams);
    var fileName = crypto.randomBytes(8).toString("hex");
    yield image.convert(response.body, fileName, params);

    var filePath = "/tmp/" + fileName + ".jpg";
    var stats    = yield* koaSendfile.call(this, filePath);
  } else {
    this.status = 404;
    this.body = "Image Not Found";
  }
}

app.listen(port);
console.log("Node app is running at localhost:" + port);
