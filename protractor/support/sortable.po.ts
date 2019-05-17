/**
 * Copied from NGX-Bootstrap project, full up-to-date version is available here: https://github.com/valor-software/ngx-bootstrap
 */

import { BaseComponent } from './base.component';
import { $$, browser } from 'protractor';

export class SortablePo extends BaseComponent {
  pageUrl = '/sortable';

  exampleDemosArr = {
    basic: 'basic-demo',
    complexData: 'complex-datamodel-demo',
    customItem: 'custom-item-template-demo',
    accessibility: 'demo-accessibility'
  };

  async isSortableLengthEqual(baseSelector: string, sortableIndex: number, expectedLength: number) {
    /*cy.get(`${baseSelector} bs-sortable`)
      .eq(sortableIndex)
      .find(`.sortable-item`)
      .should('have.length', expectedLength);*/
    const sortableItemsArr = $$(`${baseSelector} bs-sortable`).get(sortableIndex).$$(`.sortable-item`);

    expect(await sortableItemsArr.count()).toEqual(expectedLength);
  }

  async isSortableVisible(baseSelector: string, sortableIndex: number) {
    /*cy.get(`${baseSelector} bs-sortable div`)
      .eq(sortableIndex)
      .should('be.visible');*/
    const sortable = $$(`${baseSelector} bs-sortable div`).get(sortableIndex);
    expect(await sortable.isDisplayed()).toBeTruthy();
  }

  async moveSortableItem(
    baseSelector: string,
    sortableIndexFrom: number,
    itemIndexFrom: number,
    sortableIndexTo: number,
    itemIndexTo: number) {

   /* const dragEvent = {
      dataTransfer: {
        setData: Function.prototype
      }
    };

    cy.get(`${baseSelector} bs-sortable`)
      .eq(sortableIndexFrom)
      .find('.sortable-item')
      .eq(itemIndexFrom).as('ItemFrom');

    cy.get(`${baseSelector} bs-sortable`)
      .eq(sortableIndexTo)
      .find('.sortable-item')
      .eq(itemIndexTo).as('ItemTo');

    cy.get(`${baseSelector} bs-sortable`)
      .eq(sortableIndexTo)
      .find('.sortable-wrapper').as('SortableTo');

    cy.get('@ItemFrom')
      .trigger('dragstart', dragEvent);

    cy.get('@ItemTo')
      .trigger('dragover');

    cy.get('@SortableTo')
      .trigger('drop');*/
    const elem = await $$(`${baseSelector} bs-sortable`).get(sortableIndexFrom).$$('.sortable-item').get(itemIndexFrom).getWebElement();
    const target = await $$(`${baseSelector} bs-sortable`).get(sortableIndexTo).$$('.sortable-item').get(0).getWebElement();
    await browser.actions({bridge: true}).move({origin: elem}).press().move({origin: target}).release().perform(); //TODO
  }

  async isSortableItemsWithIndexes(baseSelector: string, sortableIndex: number, existIndexes: boolean) {
    /*cy.get(`${baseSelector} bs-sortable`)
      .eq(sortableIndex)
      .find('.sortable-item')
      .each((sortableItem, itemIndex) => {
        if (existIndexes) {
          expect(sortableItem.text()).to.contains(`${itemIndex}: `);
        } else {
          expect(sortableItem.text()).not.to.contains(`${itemIndex}: `);
        }
      });*/
    $$(`${baseSelector} bs-sortable`)
      .get(sortableIndex)
      .$$('.sortable-item')
      .each(async (sortableItem, itemIndex) => {
        if (existIndexes) {
          expect(await sortableItem.getText()).toContain(`${itemIndex}: `);
        } else {
          expect(await sortableItem.getText()).not.toContain(`${itemIndex}: `);
        }
      });
  }
}
