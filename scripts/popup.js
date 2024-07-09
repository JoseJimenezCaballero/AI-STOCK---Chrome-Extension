
//Listener waits until the popup is oppened to then verify if necessary data has been stored in the local storage
document.addEventListener('DOMContentLoaded', () => {//once the dom is loaded then 
    chrome.storage.local.get('apiData', (result) => {//try to get apiData from local storage and execute call back function with result
        if (result.apiData) { 
            let button = document.querySelector(".stockBtnStyle");

            button.classList.add("stockBtnStyleSide");
            addLogo(result.apiData[1],'#btnLogo');//index 1 is the stock ticker, index 0 is the api data
            button.classList.add(`${result.apiData[1]}btn`);//this will add the proper style to the btn based on the stock

            setupMessageListener();            
        }
    });
});

//Event listener for both the stock btn and back btn that when clicked will toggle results
document.querySelector('#stockBtn').addEventListener('click', toggleStockBtn);
document.querySelector('#backBtn').addEventListener('click', toggleStockBtn);



//Event listener for about button
document.querySelector("#about").addEventListener("click", () => {
    let body = document.querySelector(".body-class");//selects body
    let btn = document.querySelector("#about");//selects button
    let titleRow = document.querySelector("#titleRow");//selects title row
    let subRow = document.querySelector("#subRow");//selects row underneath title row
    let aboutContainer = document.querySelector("#aboutContainer");//selects container that holds about text
    let aboutLinks = document.querySelector(".aboutLinks");//for the links underneath about section

    //check if there is stock data stored, if there is it means the stock logo is showing and it needs to be moved out
    chrome.storage.local.get('apiData', (result) => {//try to get apiData from local storage to check if we need to toggle logo btn
        if (result.apiData) { 
            let stockBtn = document.querySelector(".stockBtnStyle");
            stockBtn.classList.toggle("stockBtnStyleSide");//toggle class list to move btn
        }
    });

    body.classList.toggle("bodyAbout");//toggle the classes for movement up
    
    btn.classList.toggle("btnStyleUp");

    titleRow.classList.toggle("rowPlacementUp");
    subRow.classList.toggle("rowPlacementUp");

    //condition to check if the button has the correct text in the about button and replaces it accordignly. Needed to use this for i tag of bootstrap5
    btn.innerHTML = btn.innerHTML === '<i style="position: relative; right: 5px;" class="bi bi-question-circle"></i>About' ? '<i class="bi bi-arrow-down-circle"></i>' : '<i style="position: relative; right: 5px;" class="bi bi-question-circle"></i>About';

    aboutContainer.classList.toggle('aboutContainerUp');

    aboutLinks.classList.toggle("aboutLinksUp");

});



//this function will create a url path for the ticker and try to open the file, if its oppened sucesdfully then it will be added to the logo image tag as the src
function addLogo(ticker,tagId) {

    let logoPath = chrome.runtime.getURL(`static/images/logos/${ticker}.png`);//get the url with the ticker name
    let imgTag = document.querySelector(tagId);//get the image tag
    const imgTest = new Image();//create an image object to test if it loads sucessfully
    imgTest.src = logoPath;//open the image or atempt to

    imgTest.onload = function(){ //if it loads successfully replace the image source, otherwise leave as is
        imgTag.setAttribute("src", logoPath);
    };

}


//fucntion that executes when both the stock btn is clicked and the back button. It toggles CSS classes for the elements which allows for styling and animations
function toggleStockBtn(){
    //********variable declarations***********/
    let body = document.querySelector(".body-class");//selects body
    let stockBtn = document.querySelector("#stockBtn");
    let titleRow = document.querySelector("#titleRow");//selects title row
    let subRow = document.querySelector("#subRow");//selects row underneath title row
    let aboutContainer = document.querySelector("#about");//selects container that holds about text
    let resultLogoRow = document.querySelector("#resultLogoRow");//row which contains the logo for the results page
    let companyNameTag = document.querySelector("#companyName");//tag where we enter the company name
    let resultsContainer = document.querySelector("#resultsContainer");


    //********************************The following are things for the stock button********************************

        //toggle classes to move button
        stockBtn.classList.toggle('stockBtnStyleSideLeft');

        //check if logo class is added and toggle it if so
        chrome.storage.local.get('apiData', (result) => {//try to get apiData from local storage and execute call back function with result
            if (result.apiData) { 
                stockBtn.classList.toggle(`${result.apiData[1]}btn`);
            }
        });


    /***************************************************///**********************************************************/



    //*******************The following are things for the rest of the elements in the home screen to be moved or modified*****************

        //toggle classes to move title and subtitle rows left
        titleRow.classList.toggle("rowPlacementLeft");
        subRow.classList.toggle("rowPlacementLeft");

        //toggle class to move about button to the left
        aboutContainer.classList.toggle('aboutContainerLeft');

        //toggle class for body background image
        body.classList.toggle("bodyResults");//toggle the classes for movement up

    /**************************************************///***********************************************************/



    //*******************The following are for the results page and its display*******************
        resultLogoRow.classList.toggle('logoContainerLeft');

        chrome.storage.local.get('apiData', (result) => {
            if (result.apiData) { 
               companyNameTag.innerText = result.apiData[0].name;//add the stock company name to result page
                addLogo(result.apiData[1],"#resultLogo");        
                displayData(result.apiData)//we call the function displayData to display the results onto the appropiate container
            }
        });

        resultsContainer.classList.toggle("resultsContainerLeft")


    
    /*************************************************///***********************************************************/
}


//This function takes the data returned from the API call and displays it on the popup.html file
function displayData(data){

    let moreInfo = document.querySelector("#moreInfo");

    //monthly prediction
    let monthly = document.querySelector("#month");
    if(data[0].month[0] === 1){//if the prediction did not underperform reality then display the prediciton, otherwise state could not predict

        if(data[0].month[1] === 1){//if the prediciton is to buy then state Buy otherwise Sell
            monthly.innerHTML = '<h5 class="styleResultsBuy">Buy<i class="bi bi-arrow-up-short"></i></h5>';
        }
        else{
            monthly.innerHTML = '<h5 class="styleResultsSell">Sell<i class="bi bi-arrow-down-short"></i></h5>';
        }
    }
    else{
        monthly.innerHTML = '<h5 class="styleResults">No Prediction</h5>';
    }

    //weekly prediction
    let weekly = document.querySelector("#week");
    if(data[0].week[0] === 1){//if the prediction did not underperform reality then display the prediciton, otherwise state could not predict

        if(data[0].week[1] === 1){//if the prediciton is to buy then state Buy otherwise Sell
            weekly.innerHTML = '<h5 class="styleResultsBuy">Buy<i class="bi bi-arrow-up-short"></i></h5>';
        }
        else{
            weekly.innerHTML = '<h5 class="styleResultsSell">Sell<i class="bi bi-arrow-down-short"></i></h5>';
        }
    }
    else{
        weekly.innerHTML = '<h5 class="styleResults">No Prediction</h5>';
    }

    //daily prediction
    let daily = document.querySelector("#day");
    if(data[0].day[0] === 1){//if the prediction did not underperform reality then display the prediciton, otherwise state could not predict

        if(data[0].day[1] === 1){//if the prediciton is to buy then state Buy otherwise Sell
            daily.innerHTML = '<h5 class="styleResultsBuy">Buy<i class="bi bi-arrow-up-short"></i></h5>';
        }
        else{
            daily.innerHTML = '<h5 class="styleResultsSell">Sell<i class="bi bi-arrow-down-short"></i></h5>';
        }
    }
    else{
        daily.innerHTML = '<h5 class="styleResults">No Prediction</h5>';
    }

    moreInfo.setAttribute("href",`https://stock-prediction-dxym.onrender.com/final?linear=on&ticker=${data[1]}`);

}

function setupMessageListener() {
    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type === "background") {
            chrome.storage.local.get('apiData', (result) => {//try to get apiData from local storage and execute call back function with result
                if (result.apiData) { 
                    let button = document.querySelector(".stockBtnStyle");
        
                    button.classList.add("stockBtnStyleSide");
                    addLogo(result.apiData[1],'#btnLogo');//index 1 is the stock ticker, index 0 is the api data
                    button.classList.add(`${result.apiData[1]}btn`);//this will add the proper style to the btn based on the stock
        
                    
                }
            });
        }
    });
}