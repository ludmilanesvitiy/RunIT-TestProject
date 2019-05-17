import { SortablePo } from '../support/sortable.po';

describe('Sortable demo page test suite', () => {
  const sortable = new SortablePo();

  beforeEach(async () => await sortable.navigateTo());

  describe('Complex data model', () => {
    const complexData = sortable.exampleDemosArr.complexData;

    it(`example contains 2 bs-sortable components (each of them contains of 3 items) by default
    each component user see code-preview block with appropriate models (each object in model have id and name)`, async () => {
      await sortable.isSortableVisible(complexData, 0);
      await sortable.isSortableVisible(complexData, 1);
      await sortable.isSortableLengthEqual(complexData, 0, 3);
      await sortable.isSortableLengthEqual(complexData, 1, 3);
    });
  });

  describe('Custom item template', () => {
    const customItem = sortable.exampleDemosArr.customItem;

    it(`example contains 2 bs-sortable (the 1st contain 4 items, 2d - 2) by default, each item in the first bs-sortable
     have index (starting from 0), under each component user see code-preview with appropriate models`, async () => {
      await sortable.isSortableVisible(customItem, 0);
      await sortable.isSortableVisible(customItem, 1);
      await sortable.isSortableLengthEqual(customItem, 0, 4);
      await sortable.isSortableLengthEqual(customItem, 1, 2);
      await sortable.isSortableItemsWithIndexes(customItem, 0, true);
      await sortable.isSortableItemsWithIndexes(customItem, 1, false);
    });
  });
});
