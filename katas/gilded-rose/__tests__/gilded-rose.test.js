const Item = require('../gilded-rose.js').Item;
const Shop = require('../gilded-rose.js').Shop;

const itemNames = {
  sulfuras: "Sulfuras, Hand of Ragnaros",
  brie: "Aged Brie",
  backstage: "Backstage passes to a TAFKAL80ETC concert",
  conjured: "Conjured Wand of Enchantment"
}

describe.only("Gilded Rose", function() {
  const setup = (...items) => new Shop(items);

  describe("Has a Shop that", () => {

    it("should update the quality of an item", () => {
      const baseItem = new Item("testItem", 10, 10);
      const shop = setup(baseItem);
      const expected = new Item("testItem", 9, 9);
      const actual = shop.updateQuality()[0];
      expect(actual).toEqual(expected);
    });

    it("should degrade quality twice as fast when sellin < 0", () => {
      const expiredItem = new Item("expiredItem", -1, 10);
      const shop = setup(expiredItem);
      const expected = new Item("expiredItem", -2, 8);
      const actual = shop.updateQuality()[0];
      expect(actual).toEqual(expected);
    });

    it("should not degrade quality below 0", () => {
      const lowQualityItem = new Item("lowQualityItem", 10, 0);
      const shop = setup(lowQualityItem);
      const expected = new Item("lowQualityItem", 9, 0);
      const actual = shop.updateQuality()[0];
      expect(actual).toEqual(expected);
    });

    it("should increase quality of Aged Brie instead of decreasing it", () => {
      const brie = new Item(itemNames.brie , 10, 10);
      const shop = setup(brie);
      const expected = new Item(itemNames.brie, 9, 11);
      const actual = shop.updateQuality()[0];
      expect(actual).toEqual(expected);
    })

    it("should not increase quality above 50", () => {
      const oldBrie = new Item(itemNames.brie, -50, 50);
      const shop = setup(oldBrie);
      const expected = new Item(itemNames.brie, -51, 50);
      const actual = shop.updateQuality()[0];
      expect(actual).toEqual(expected);
    });

    it("should never change Sulfuras' sellin or quality", () => {
      const sulfuras = new Item(itemNames.sulfuras, 10, 80);
      const shop = setup(sulfuras);
      const expected = new Item(itemNames.sulfuras, 10, 80);
      const actual = shop.updateQuality()[0];
      expect(actual).toEqual(expected);
    });

    it("should decrease quality of conjured items twice as fast", () => {
      const conjured = new Item(itemNames.conjured, 10, 40);
      const shop = setup(conjured);
      const expected = new Item(itemNames.conjured, 9, 38);
      const actual = shop.updateQuality()[0];
      expect(actual).toEqual(expected);
    });

    it("should decrease quality of conjured items twice as fast also after sellIn", () => {
      const conjured = new Item(itemNames.conjured, -1, 40);
      const shop = setup(conjured);
      const expected = new Item(itemNames.conjured, -2, 36);
      const actual = shop.updateQuality()[0];
      expect(actual).toEqual(expected);
    });

    describe("has Backstage Passes that", () => {

      it("should increase in quality instead of decreasing when sellin > 10", () => {
        const passes = new Item(itemNames.backstage, 15, 10);
        const shop = setup(passes);
        const expected = new Item(itemNames.backstage, 14, 11);
        const actual = shop.updateQuality()[0];
        expect(actual).toEqual(expected);
      });

      it("should increase in quality by 2 when sellin <= 10 && > 5", () => {
        const passes = new Item(itemNames.backstage, 10, 10);
        const shop = setup(passes);
        const expected = new Item(itemNames.backstage, 9, 12);
        const actual = shop.updateQuality()[0];
        expect(actual).toEqual(expected);
      });

      it("should increase in quality by 3 when sellin <= 5", () => {
        const passes = new Item(itemNames.backstage, 5, 10);
        const shop = setup(passes);
        const expected = new Item(itemNames.backstage, 4, 13);
        const actual = shop.updateQuality()[0];
        expect(actual).toEqual(expected);
      });

      it("should decrease quality to 0 once sellin is < 0", () => {
        const passes = new Item(itemNames.backstage, 0, 10);
        const shop = setup(passes);
        const expected = new Item(itemNames.backstage, -1, 0);
        const actual = shop.updateQuality()[0];
        expect(actual).toEqual(expected);
      });

    });

  });

});