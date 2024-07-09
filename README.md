# AI-STOCK - Chrome-Extension
AI STOCK is a Chrome extension designed to predict the movement of stocks. It detects the stock ticker on Yahoo Finance pages, makes an API call to a server, and uses a machine learning model to predict the stock's future movement. The extension displays these predictions, indicating whether to buy, sell, or hold the stock, helping users make informed investment decisions.

## Features

- Automatically detects the stock ticker on Yahoo Finance pages.
- Makes an API call to a server to get stock predictions.
- Displays predictions for daily, weekly, and monthly movements.
- Provides clear "Buy", "Sell", or "Hold" signals.
- User-friendly interface with easy-to-understand predictions.

## Installation

1. Clone the repository:
2. Open Chrome and go to chrome://extensions/.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory where you cloned the repository.


## Usage
1. Navigate to a stock page on Yahoo Finance (e.g., https://finance.yahoo.com/quote/SPY/).
2. Click the AI STOCK extension icon in the Chrome toolbar.
3. View the stock prediction and decide whether to buy, sell, or hold based on the provided signals.


## Project Structure
 - manifest.json: Configuration file for the Chrome extension.
 - background.js: Handles background tasks such as making API calls and storing data to local storage.
 - contentScript.js: Injected into Yahoo Finance pages to detect the stock ticker.
 - popup.js: Manages the popup interface and displays the predictions.
 - popup.html: HTML for the extension's popup interface.
 - styles.css: Styles for the popup interface.
