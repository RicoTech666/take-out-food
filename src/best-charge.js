var input = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
bestCharge(input);
function bestCharge(selectedItems) {
  var input = parseInput(selectedItems);
  var soldFoodItems = getSoldFood(input);
  var originalTotalPrice = getOriginalTotalPrice(soldFoodItems);
  printEachFood(soldFoodItems);
  printPromotion(getPromotion(soldFoodItems, originalTotalPrice));
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
  var discountedPrice = 0;
  var hasPromotions = false;
  var promotionType = "";
  let discountedNameSet = new Set();
  itemsToBePromoted.forEach(foodItem => {
    if (allPromotions[1]["items"].includes(foodItem.id)) {
      discountedPrice += parseInt(foodItem["totalPrice"]) / 2;
      discountedNameSet.add(foodItem.name);
    }
  });
  if (discountedPrice > 6) {
    promotionType = allPromotions[1]["type"];
  } else if (discountedPrice < 6 && originalTotalPrice >= promotionThreshold) {
    discountedPrice = 6;
    promotionType = allPromotions[0]["type"];
  } else if (
    6 === discountedPrice &&
    originalTotalPrice >= promotionThreshold
  ) {
    promotionType = allPromotions[0]["type"];
  }
  if (discountedPrice > 0) {
    hasPromotions = true;
  }
  return [hasPromotions, promotionType, discountedPrice, discountedNameSet];
}

function printEachFood(itemsToBePrinted) {
  console.log("============= 订餐明细 =============");
  itemsToBePrinted.forEach(eachFood => {
    console.log(
      `${eachFood.name} x ${eachFood.count} = ${eachFood.totalPrice}`
    );
  });
}

function printPromotion([
  hasPromotions,
  promotionType,
  discountedPrice,
  discountedNameSet
]) {
  if (!hasPromotions) {
    return;
  }

  console.log("-----------------------------------");
  console.log("使用优惠：");
  var allPromotions = loadPromotions();

  if (promotionType === allPromotions[0]["type"]) {
    console.log(`${promotionType}，省${discountedPrice}元`);
  } else if (promotionType === allPromotions[1]["type"]) {
    console.log(
      `${promotionType}(${[...discountedNameSet]})，省${discountedPrice}元`
    );
  }
}

function loadAllItems() {
  return [
    {
      id: "ITEM0001",
      name: "黄焖鸡",
      price: 18.0
    },
    {
      id: "ITEM0013",
      name: "肉夹馍",
      price: 6.0
    },
    {
      id: "ITEM0022",
      name: "凉皮",
      price: 8.0
    },
    {
      id: "ITEM0030",
      name: "冰锋",
      price: 2.0
    }
  ];
}

function loadPromotions() {
  return [
    {
      type: "满30减6元"
    },
    {
      type: "指定菜品半价",
      items: ["ITEM0001", "ITEM0022"]
    }
  ];
}
