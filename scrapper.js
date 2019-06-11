
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      var marks = document.querySelectorAll('.panel-mrk-row');
      if (marks.length == 0) {
        // alert('No notes found. Make sure your bookmarks menu is open to the side');
        sendResponse(null);
        return;
      }

      var items = Array.prototype.map.call(marks, function (mark) {
        return {
          description: mark.querySelector('.panel-mrk-row-desc').innerText,
          note: mark.querySelector('.panel-mrk-row-note').innerText,
          title: mark.querySelector('.panel-mrk-row-title').innerText,
          position: mark.querySelector('.panel-mrk-row-pos-box').innerText
        }
      });

      sendResponse(items);
    }
  }
);
