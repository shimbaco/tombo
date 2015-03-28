exports.convert = function(joinedParams) {
  var data = {
    width:  null,
    height: null
  };

  var params = joinedParams.split(",").map(function(p) {
    return p.split(":");
  });

  params.forEach(function(p) {
    switch (p[0]) {
      case "b":
        data.blur = p[1];
        break;
      case "g":
        data.gravity = p[1];
        break;
      case "h":
        data.height = p[1];
        break;
      case "q":
        data.quality = p[1];
        break;
      case "w":
        data.width = p[1];
        break;
    }
  });

  return data;
}
