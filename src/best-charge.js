function bestCharge(selectedItems) {
  var allItems = loadAllItems();
  var allPromotions = loadPromotions();

  console.log("============= 订餐明细 =============");
}

function parseInput(selectedItems) {
  const inputMap = new Map();
  selectedItems.forEach(elem => {
    inputMap.set(elem.split(" x ")[0],elem.split(" x ")[1]);
  });
  return inputMap;
}

function calculateOriginalPrice(inputItems) {

}