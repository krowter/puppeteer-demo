require("dotenv").config();
const puppeteer = require("puppeteer");
const PORT = process.env.PORT;

const url = `http://localhost:${PORT}/sample-form.html`;

console.log("");
console.log("Puppeteer started!");
console.log("");

/**
 * important: these variable values are known beforehand by
 * examining the target website
 *  */
const selectors = {
  itemDetails: {
    name: ".name",
    price: ".price",
    category: ".category",
  },
  itemClass: "item",
  submitButton: "#submit-button",
  searchField: "#search-field",
};

const query = "nasi";

//main function
const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  //type the query
  await page.focus(selectors.searchField);
  await page.keyboard.type(query);

  //click "search" button
  await page.click(selectors.submitButton);

  const items = await page.evaluate((knownSelectors) => {
    const { itemDetails, itemClass } = knownSelectors;

    //capture Items
    const result = [...document.getElementsByClassName(itemClass)];

    //function to extract content
    const getValue = (element, selector) => {
      return element.querySelector(selector).textContent;
    };

    //extract contents to JS objects
    return result.map((item) => {
      let obj = {};
      for (prop in itemDetails) {
        obj[prop] = getValue(item, itemDetails[prop]);
      }
      return obj;
    });
  }, selectors);

  //print results to console
  console.log(items);
};

main();
