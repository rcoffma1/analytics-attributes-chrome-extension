var attributes = [].slice.apply(document.getElementsByTagName('*'));
attributes = attributes.map(function(element) {
  var output = '';
  for (var a=0; a < element.attributes.length; a++) {
    var attribute = element.attributes[a];
    if (/^data-analytics/.test(attribute.nodeName)) {
      output = element.nodeName + ': ' + attribute.name + "=\"" + attribute.value + "\"";
    }
    if (element.nodeName.toLowerCase() == 'form' && attribute.nodeName == 'id') {
      output = "FORM: id = \"" + attribute.value + "\"";
    }
  }
  return output;
}).filter(function(attribute) {
  return attribute.length > 0;
});
chrome.extension.sendRequest(attributes);