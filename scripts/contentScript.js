

//With this function we get the ticker from the link and then we send it to the background.js file for the API call. Function definition found at end of file
let ticker = getTicker();

chrome.runtime.sendMessage({type:"ContentScript", message: ticker});




//fucntion gets the ticker by first using the URL api to get url and parse it, then returning it
function getTicker(){
    let url = window.location.href;
    let urlObject = new URL(url);
    let pathSegments = urlObject.pathname.split('/');//this will give us the string: "/quote/[ticker]/" which we then split by the delimeter '/' which yields an array
    let ticker = pathSegments[pathSegments.length - 1] || pathSegments[pathSegments.length - 2];//usually the last value in the array would be the ticker but the split function yields
                                                                                                 //an array whose final value is sometimes an empty string, so to mediate we check first
                                                                                                 //if the final value is null and if so we take the previous one
    return ticker;
}
