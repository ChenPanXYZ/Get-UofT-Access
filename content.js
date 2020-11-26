// content.js

// This defines the domains of the websites that UofT libraries have access to and should be redirected.
// Want to let the users input it.
const domainsBeingRedircted = [
    "journals.scholarsportal.info",
    "science.sciencemag.org",
    "www.sciencedirect.com",
    "dl.acm.org",
    "search.proquest.com",
    "www.ieee.org",
]


// Return the UofT library URL.
function UrlWithUofTAccessMaker(domain, url) {
    // Actually, just replace the first occur of the domain would be fine, because the very first part in a url must be the domain.
    return url.replace(domain, domain.replaceAll(".", "-") + ".myaccess.library.utoronto.ca")
    //return url.replace(/(http:|)(^|\/\/)(.*?\/)/g, 'https://' + domain.replaceAll(".", "-") + ".myaccess.library.utoronto.ca")
}


// When the user clicks the extension button.
chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.message === "clicked_browser_action") {
            // Get the domain of the page being visited.
            const domain = window.location.hostname

            // Get the full URL of the page being visited.
            const url = window.location.href

            if (domainsBeingRedircted.includes(domain)) {
                // UofT has the access to the URL.
                chrome.runtime.sendMessage({"message": "redirect_to_uoft_access", "url": UrlWithUofTAccessMaker(domain, url)})
            }
        }
    }
)