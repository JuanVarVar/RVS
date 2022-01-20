
function importPublic() {
  var content = {};
  var r = require.context('../resources/test', false, /\.(png|jpe?g|svg)$/)
  r.keys().forEach((key) => (content[key] = r(key).default));
  return content;
}

function importInterface(mode = false) {
  var content = {};
  var r = require.context('../resources/interface', false, /\.(png|jpe?g|svg)$/)
  if(mode == false) {r.keys().forEach((key) => (content[key] = r(key).default));
  }else{r.keys().forEach((key) => (content[key] = r(key)));}
  return content;
}


function importProfile() {
  var content = {};
  var r = require.context('../resources/profile', false, /\.(png|jpe?g|svg)$/)
  r.keys().forEach((key) => (content[key] = r(key).default));
  return content;
}

export{importPublic
  ,importInterface
  ,importProfile
};