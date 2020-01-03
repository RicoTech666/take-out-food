function bestCharge(selectedItems) {
  var allItems = loadAllItems();
  var allPromotions = loadPromotions();
  var inputMap = parseInput(selectedItems);
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
  var soldFoodItems = [];
  for (let [keyBarcode, valueFoodCount] of inputMap.entries()) {
    var foodItem = allItems.find(item => item.id === keyBarcode);
    foodItem['count'] = valueFoodCount;
    soldFoodItems.push(foodItem);
  }
  return soldFoodItems;
}


