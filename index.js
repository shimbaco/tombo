var crypto = require("crypto");
var fs     = require("fs");

var express = require("express");
var request = require("request");
var _       = require("lodash");

var parameter = require("./lib/parameter");
var image     = require("./lib/image");

var app = express();

app.set("port", (process.env.PORT || 5000));
app.set("imageHost", process.env.TOMBO_IMAGE_HOST);

app.get("/:joinedParams([0-9a-zA-Z:,]+)/:path*", function(req, res) {
  var path = req.params.path + req.params[0];
  var url  = app.get("imageHost") + "/" + path;

  request.get({ url: url, encoding: null }, function(err, imgRes, imgBody) {
    if (imgRes.statusCode === 200) {
      var params   = parameter.convert(req.params.joinedParams);
      var fileName = crypto.randomBytes(8).toString("hex");

      image.convert(imgBody, fileName, params, function(err) {
        if (err) return console.log(err);

        var options = {
          root: "/tmp",
          headers: {
            "Content-Type": "image/jpeg"
          }
        };

        res.sendFile(fileName + ".jpg", options);
      });
    } else {
      res.status(404).send("Image Not Found");
    }
  });
});

app.listen(app.get("port"), function() {
  console.log("Node app is running at localhost:" + app.get("port"));
});
