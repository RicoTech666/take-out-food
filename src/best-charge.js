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

function getPromotion(itemsToBePromoted, originalTotalPrice) {
  const promotionThreshold = 30;
  var allPromotions = loadPromotions();
  var hasPromotions = false;
  var promotionType = '';
  itemsToBePromoted.forEach(foodItem=>{
    if(foodItem.id === allPromotions[1]['items'][0]){
      itemsToBePromoted.forEach(foodItemInner=>{
        if(foodItemInner.id === allPromotions[1]['items'][1]){
          hasPromotions = true;
        }
      })
    }
  })
  if (originalTotalPrice > promotionThreshold) {
    hasPromotions = true;
    promotionType = allPromotions[0]['type'];
  } else if(hasPromotions) {
    promotionType = allPromotions[1]['type'];
  }
  return [hasPromotions, promotionType];
}

function 