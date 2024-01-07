chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "getURLParams") {
    var urlParams = getUrlParams();
    sendResponse(urlParams);
  }
});

function getUrlParams() {
  var searchParams = new URLSearchParams(window.location.search);
  var params = {};

  for (var pair of searchParams.entries()) {
    params[pair[0]] = pair[1];
  }

  return params;
}
