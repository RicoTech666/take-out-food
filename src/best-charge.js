function bestCharge(selectedItems) {
  let input = parseInput(selectedItems);
  let soldFoodItems = getSoldFood(input);
  let originalTotalPrice = getOriginalTotalPrice(soldFoodItems);
  let [, , discountedPrice] = getPromotion(soldFoodItems, originalTotalPrice);
  return (
    printEachFood(soldFoodItems) +
    printPromotion(getPromotion(soldFoodItems, originalTotalPrice)) +
    printFinalPrice(originalTotalPrice, discountedPrice)
  );
}

function parseInput(selectedItems) {
  const inputMap = new Map();
  selectedItems.forEach(elem => {
    inputMap.set(elem.split(" x ")[0], elem.split(" x ")[1]);
  });
  return inputMap;
}

function getSoldFood(inputMap) {
  let allItems = loadAllItems();
  let soldFoodItems = [];
  for (let [keyBarcode, valueFoodCount] of inputMap.entries()) {
    let foodItem = allItems.find(item => item.id === keyBarcode);
    foodItem["count"] = valueFoodCount;
    foodItem["totalPrice"] =
      parseInt(foodItem.count) * parseInt(foodItem.price);
    soldFoodItems.push(foodItem);
  }
  return soldFoodItems;
}

function getOriginalTotalPrice(itemsToBeSummed) {
  let originalTotalPrice = 0;
  itemsToBeSummed.forEach(foodItem => {
    originalTotalPrice += foodItem.totalPrice;
  });
  return originalTotalPrice;
}

function getPromotion(itemsToBePromoted, originalTotalPrice) {
  const promotionThreshold = 30;
  let allPromotions = loadPromotions();
  let discountedPrice = 0;
  let hasPromotions = false;
  let promotionType = "";
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
  let printedContent = "============= 订餐明细 =============\n";
  itemsToBePrinted.forEach(eachFood => {
    printedContent += `${eachFood.name} x ${eachFood.count} = ${eachFood.totalPrice}元\n`;
  });
  return printedContent;
}

function printPromotion([
  hasPromotions,
  promotionType,
  discountedPrice,
  discountedNameSet
]) {
  if (!hasPromotions) {
    return '';
  }
  let printedContent = `-----------------------------------\n使用优惠:\n`;
  let allPromotions = loadPromotions();

  if (promotionType === allPromotions[0]["type"]) {
    printedContent += `${promotionType}，省${discountedPrice}元\n`;
  } else if (promotionType === allPromotions[1]["type"]) {
    printedContent += `${promotionType}(${`${[...discountedNameSet]}`.replace(
      ",",
      "，"
    )})，省${discountedPrice}元\n`;
  }
  return printedContent;
}

function printFinalPrice(originalTotalPrice, discountedPrice) {
  return `-----------------------------------\n总计：${originalTotalPrice -
    discountedPrice}元\n===================================`;
}
