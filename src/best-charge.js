function bestCharge(selectedItems) {
  var input = parseInput(selectedItems);
  var soldFoodItems = getSoldFood(input);
  console.log("============= 订餐明细 =============");
}

function parseInput(selectedItems) {
  const inputMap = new Map();
  selectedItems.forEach(elem => {
    inputMap.set(elem.split(" x ")[0], elem.split(" x ")[1]);
  });
  return inputMap;
}

function getSoldFood(inputMap) {
  var allItems = loadAllItems();
  var soldFoodItems = [];
  for (let [keyBarcode, valueFoodCount] of inputMap.entries()) {
    var foodItem = allItems.find(item => item.id === keyBarcode);
    foodItem["count"] = valueFoodCount;
    foodItem["totalPrice"] =
      parseInt(foodItem.count) * parseInt(foodItem.price);
    soldFoodItems.push(foodItem);
  }
  return soldFoodItems;
}

function getOriginalTotalPrice(itemsToBeSummed) {
  var originalTotalPrice = 0;
  itemsToBeSummed.forEach(foodItem => {
    originalTotalPrice += foodItem.totalPrice;
  });
  return originalTotalPrice;
}
