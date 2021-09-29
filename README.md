# Dauntless React Test

## Overview

The purpose of this test is to assess your skills and approach to composing a simple React web app given an API feed. We will also assess the generated HTML, CSS, and JS output.

This test is expected to take about 1-2 hours.

## How to use

Download or clone this [repo](https://github.com/WeAreDauntless/react-api-test)

Install it and run:

```sh
npm install
npm start
```

## The idea behind the test

In the source code of this test we have a basic template that makes use of [Create React App](https://github.com/facebookincubator/create-react-app) and `@mui/material` and its peer dependencies, including `emotion`, the default style engine in MUI v5.

The template is a page that is ready to display images, titles and information in a material-ui card style. In the code that is provided to you it will render the application with 9 cards of dummy information which it generates based on the basic array called `cards` that lives within the `App.js` file. The images for each card are called from and random image generator and the card title and details are "hard coded".

You tasks will be to turn this static content in to a dynamic feed of crypto currencies that are traded against the dollar (USD). More detailed steps on the application requirement are set out below.

For this test you will be making use of the the **free** [CoinGecko API](https://www.coingecko.com/en/api/documentation). Keep in mind when building that their free API has a rate limit of 50 calls/minute, however this should be more than sufficient.

## Application requirement

- Access the CoinGecko api using the `/coins/markets` endpoint and return 45 results using `USD` for the `vs_currency` parameter

- With the returned data you will need to display the 45 results with the following information on the cards;

  - Image
  - Currency Name
  - Current Price
  - 24h High Price
  - 24H Low Price

- The cards currently have a "MORE" button that is not connected to any routes. This button needs to take the user to a route for the clicked on currency with the path following the following format `/currency/{symbol}` where `{symbol}` is a value from the returned data.

- Once the user lands on the `/currency/{symbol}` page for the selected crypto currency you need to display the following information;
  - Currency Name
  - Current Price
  - All time high price
  - Market Cap
  - Market Cap Rank

## Additional items to consider

- Ensure you have navigation back from the currency specific pages back to the main list page.
- The code provided has no code or libraries related to data fetching and this is the main focus of what you are implementing. For this test we do not require that you use a specific library but would recommend [React Query](https://react-query.tanstack.com/) as this is our preferred option.
- We want to see you use React function components
- Making use of React Hooks where and if it may make sense would show us your understanding of this.
- If you would like to showcase your understanding of component styling then feel inspired to modify the basics that have been provided to you.

## Steps to complete your project

- At the start of this project you would have forked the Dauntless React Test repository and once you are complete we would like you to push the code to a public repository in your github account and then provide the link to the repository to Dauntless.
