class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
    this.updateQualityOfItem = this.updateQualityOfItem.bind(this);
    this.calculateNewQuality = this.calculateNewQuality.bind(this);
  }
  updateQuality() {
    this.items = this.items.map(this.updateQualityOfItem);
    return this.items;
  }
  updateQualityOfItem(item) {
    if (item.name.indexOf("Sulfuras") >= 0) return item;
    return new Item(item.name, item.sellIn - 1, this.calculateNewQuality(item));
  }
  calculateNewQuality(item) {
    if (item.name.indexOf("Brie") >= 0) return this.handleBrie(item);
    if (item.name.indexOf("Conjured") >= 0) return this.handleConjured(item);
    if (item.name.indexOf("Backstage") >= 0) return this.handleBackstage(item);
    const result = item.sellIn >= 0 ? item.quality - 1 : item.quality - 2;
    return result >= 0 ? result : 0;
  }
  handleBrie(item) {
    return item.quality === 50 ? 50 : item.quality + 1;
  }
  handleConjured(item) {
    const conjuredResult = item.sellIn >= 0 ? item.quality - 2 : item.quality - 4;
    return conjuredResult > 0 ? conjuredResult : 0;
  }
  handleBackstage(item) {
    if (item.sellIn > 10) return item.quality + 1;
    if (item.sellIn > 5) return item.quality + 2;
    if (item.sellIn > 0) return item.quality + 3;
    if (item.sellIn <= 0) return 0;
  }
}

module.exports = {
  Item,
  Shop
};
