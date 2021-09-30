/*
Item     Unit price        Sale price
--------------------------------------
Milk      $3.97            2 for $5.00
Bread     $2.17            3 for $6.00
Banana    $0.99
Apple     $0.89
*/

// The calculateQuantityOfGroceryItem algorithm is used to format the user input by removing spaces and to count the quantity of Milk, Bread, Banana, Apple
const calculateQuantityOfGroceryItem = (userInput) => {
  // The groceryItems array based on the information above plus more attributes for calculation
  const groceryItems = [
    {
      item: "Milk",
      unitPrice: "3.97",
      salePrice: "5.00",
      saleQuantity: 2,
      priceTotal: 0,
      quantity: 0,
    },
    {
      item: "Bread",
      unitPrice: "2.17",
      salePrice: "6.00",
      saleQuantity: 3,
      priceTotal: 0,
      quantity: 0,
    },
    {
      item: "Banana",
      unitPrice: "0.99",
      salePrice: "N/A",
      saleQuantity: "N/A",
      priceTotal: 0,
      quantity: 0,
    },
    {
      item: "Apple",
      unitPrice: "0.89",
      salePrice: "N/A",
      saleQuantity: "N/A",
      priceTotal: 0,
      quantity: 0,
    },
  ];
  // The separatedItems array utilized to store the items entered
  const separatedItems = [];
  // The entered input is split into many elements using the , delimiter and stored in userInputArray
  const userInputArray = userInput.split(",");

  // Each letters of an element in userInputArray are converted into lower cased letters
  for (const aUserInput of userInputArray) {
    separatedItems.push(aUserInput.toLowerCase().replace(/\s/g, ""));
  }

  // Nested for...of loops are used to quantify the different items in the input entered
  for (const separatedItem of separatedItems) {
    for (const groceryItem of groceryItems) {
      if (separatedItem === groceryItem.item.toLowerCase()) {
        groceryItem.quantity++;
      }
    }
  }

  // Returns the updated groceryItems array
  return groceryItems;
};

// The priceCalculator algorithm is utilized to calculate the total price for each item entered, the total price of all the items after savings was applied and the total of the savings
const priceCalculator = (items) => {
  // The totalPrice variable is utilized to hold the total price of the items entered, so it is declared and initialized with 0 as the value
  let totalPrice = 0;
  // The totalSavings variable is utilized to hold the total savings of the items entered that are eligible for savings, so it is declared and initialized with 0 as the value
  let totalSavings = 0;

  // The for...loop and code inside it are utilized to calculate the total price and total savings of each items, then the price and savings are all added up to give the total price and savings of all of the items entered
  for (const item of items) {
    if (item.salePrice === "N/A") {
      item.priceTotal += parseFloat(item.unitPrice) * item.quantity;
    } else {
      if (item.quantity >= item.saleQuantity) {
        item.priceTotal +=
          parseFloat(item.salePrice) *
            Math.floor(item.quantity / item.saleQuantity) +
          parseFloat(item.unitPrice) * (item.quantity % item.saleQuantity);
        totalSavings +=
          parseFloat(item.unitPrice) * item.saleQuantity -
          parseFloat(item.salePrice);
      } else {
        item.priceTotal += parseFloat(item.unitPrice) * item.quantity;
      }
    }
    totalPrice += item.priceTotal;
  }

  // Returns the total price of items, total savings of the items and the updated groceryItem array that was initialized in line 13
  return [totalPrice, totalSavings, items];
};

// The readline module is utilized to enable user input and to store it
// The mododule is stored in the readline variable for easier access
const readline = require("readline");

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

input.question(
  "Please enter all the items purchased separated by a comma\n",
  (answer) => {
    // The answer variable stores the input entered which is then utilized in the priceCalculator and calculateQuantityOfGroceryItem algorithms
    // The priceCalculator and calculateQuantityOfGroceryItem algorithms are called to format the input, make the calculations and return the data that will be showned to the user
    const PRICE_CALCULATOR = priceCalculator(
      calculateQuantityOfGroceryItem(answer)
    );
    // The console.log keyword is used to print out information for the user regarding the items they entered
    console.log("\n");
    console.log("Item     Quantity      Price");
    console.log("--------------------------------------");
    console.log(
      `${PRICE_CALCULATOR[2][0].item}     ${
        PRICE_CALCULATOR[2][0].quantity
      }             $${PRICE_CALCULATOR[2][0].priceTotal.toFixed(2)}`
    );
    console.log(
      `${PRICE_CALCULATOR[2][1].item}    ${
        PRICE_CALCULATOR[2][1].quantity
      }             $${PRICE_CALCULATOR[2][1].priceTotal.toFixed(2)}`
    );
    console.log(
      `${PRICE_CALCULATOR[2][3].item}    ${
        PRICE_CALCULATOR[2][3].quantity
      }             $${PRICE_CALCULATOR[2][3].priceTotal.toFixed(2)}`
    );
    console.log(
      `${PRICE_CALCULATOR[2][2].item}   ${
        PRICE_CALCULATOR[2][2].quantity
      }             $${PRICE_CALCULATOR[2][2].priceTotal.toFixed(2)}`
    );
    console.log("\n");
    console.log(`Total price : $${PRICE_CALCULATOR[0].toFixed(2)}`);
    console.log(`You saved $${PRICE_CALCULATOR[1].toFixed(2)} today.`);

    input.close();
  }
);
