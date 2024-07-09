

const url = 'https://stock-prediction-dxym.onrender.com/api_?ticker='; //the link we use to make api calls to site. We need to add simply the ticker at the end

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { //wait until the contentScript sends us the signal with the ticker
    if(request.type === "ContentScript"){ //only do the following if its the ContentScript sending the message
        if(request.message != null){//if the message is empty we log an error message
            let newUrl = url + request.message;//add ticker to the url
    
            async function fetchData() { //async funct used to make the api call
                try {
                    const response = await fetch(newUrl,{ //wait for response with GET method
                        method: 'GET',
                    });
    
                    let data = await response.json(); //we jsonify our return values

                    chrome.storage.local.set({ //we store data on the local storage, this will allow the user to open and close the tab and still have the data displayed
                        apiData: [data,request.message],//store the data and the ticker in an array
                        tabId: sender.tab.id //we store the tab id for the tab which contains yahoo finance since we need it to check if user has closed the tab
                    });
                    sendResponse({ status: "success" });
                    chrome.runtime.sendMessage({type:"background", message: "Update the UI :)"});//lets popup know that that something has been saved to local storage(this is needed if the popup is alredy open and its being updated at the same time)
    
                  } catch (error) {//error handling
                    console.error('Error fetching API data', error);
                    sendResponse({ status: "error", error: error.message });
                  }
            }
            fetchData();//call the async function
        }
        else{
            console.log("No ticker received");
            sendResponse({ status: "error", error: "No ticker received" });
        }
    }
    else{
        console.log("Not CS type");
        sendResponse({ status: "error", error: "Invalid request type" });
    }

})

/*We listen for the user closing the tab which contains the yahoo finance website. We do this by accessing the tabId we previously stored and checking if it matches the tabId that
was just closed. If it matches we empty the storage and we set the popup html back to the original one */
chrome.tabs.onRemoved.addListener((tabId) => {//listen for tab closing
    chrome.storage.local.get('tabId', (result) => {//get tabId that we stored
        if (result.tabId === tabId) {//if the tabId closed matches our stored one we proceed
            chrome.storage.local.remove(['apiData', 'tabId'], () => {//remove stored data and re-set our default popup html file
                chrome.action.setPopup({popup: "default_popup.html"});
            });
        }
    });
});