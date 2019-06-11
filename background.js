// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
  // chrome.tabs.executeScript({
  //   "file": "embed.js",
  //   "allFrames": true
  // });

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" }, function (items) {
      if (items == null || items.length == 0) {
        return;
      }
      var now = new Date();
      var nowString = now.toLocaleString('en-us', { day: 'numeric', month: 'short' });

      var rows = Array.prototype.map.call(items, function (mark) {
        var response = "";

        if (mark.note != "") {
          response += "note: " + mark.note + "\n";
        }

        if (mark.title != "") {
          response += mark.title.replace('”Chapter', "”\nChapter") + "\n";
        }

        description = mark.description;
        description = description.replace('Today', nowString);
        description = description.replace('highlight', '');

        response += "Position: " + mark.position + "\n" + description;

        return response;
      });

      var input = document.createElement('textarea');
      input.style.position = 'fixed';
      input.style.opacity = 0;
      input.value = rows.join("\n\n");

      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);

      alert('Notes are copied to your clipboard');
    });
  });
});

