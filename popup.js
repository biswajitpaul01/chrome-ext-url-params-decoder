document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getURLParams" },
      function (response) {
        displayDecodedParams(response);
      }
    );
  });

  function displayDecodedParams(params) {
    const decodedList = document.getElementById("decodedList");

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const listItem = document.createElement("li");
        const val = params[key];
        const isUrl = isValidHttpUrl(val);
        listItem.innerHTML =
          key +
          ": " +
          `${
            isUrl
              ? `<a href="${val}" target="_blank" title="${val}">${val}</a>`
              : val
          }`;
        decodedList.appendChild(listItem);
      }
    }
  }

  function isValidHttpUrl(string) {
    try {
      const newUrl = new URL(string);
      return ["http:", "https:"].includes(newUrl.protocol);
    } catch (err) {
      return false;
    }
  }
});
