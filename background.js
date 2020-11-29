// background.js

// Check if it's chrome(edge) or firefox.
let goodthing = undefined
if (chrome !== undefined) {
    goodthing = chrome
}
else if (browser !== undefined) {
    goodthing = browser
}


function UrlWithUofTAccessMaker(domain, url) {
    // Actually, just replace the first occur of the domain would be fine, because the very first part in a url must be the domain.

    return url.replace(domain, domain.replaceAll(".", "-") + ".myaccess.library.utoronto.ca")
    //return url.replace(/(http:|)(^|\/\/)(.*?\/)/g, 'https://' + domain.replaceAll(".", "-") + ".myaccess.library.utoronto.ca")
}


// Only if the user is using a compatible browser.
if (goodthing !== undefined) {
    // Check if the user clicks the brower button.
    goodthing.browserAction.onClicked.addListener((tab) => {
        const url = new URL(tab.url)
        let xhr = new XMLHttpRequest()
        // We don't do redirections for homepages.
        if (url.pathname !== "/") {
            const UofTAccessLink = UrlWithUofTAccessMaker(url.hostname, url.href)
            // Send a fake request to see if UofT has access to this page.
            xhr.open("GET", UofTAccessLink, true)
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status !== 404) {
                        // If the UofT has the access to this page.
                        goodthing.tabs.update({"url": UofTAccessLink})
                    }
                }
            }
            xhr.send()
        }
    })
}