// background.js

// Check if the user clicks the brower button.
chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let activeTab = tabs[0]
        chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" })
    })
})


chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.message === "redirect_to_uoft_access") {
            // Update the URL to redirect
            chrome.tabs.update({"url": request.url})
        }
    }
)