/**
 * Copied from NGX-Bootstrap project, full up-to-date version is available here: https://github.com/valor-software/ngx-bootstrap
 */

import { BaseComponent } from './base.component';
import * as globalLocales from 'ngx-bootstrap/locale';
import { $, $$, browser, by, element } from 'protractor';

export class DatepickerPo extends BaseComponent {
  pageUrl = '/datepicker';

  datepickerInput = 'input[bsdatepicker]';
  datepickerNavView = 'bs-datepicker-navigation-view';
  datepickerContainer = 'bs-datepicker-container';
  datepickerInlineContainer = 'bs-datepicker-inline-container';
  daterangepickerContainer = 'bs-daterangepicker-container';
  datepickerBodyDaysView = 'bs-days-calendar-view';
  datepickerBodyMonthView = 'bs-month-calendar-view';
  datepickerBodyYearsView = 'bs-years-calendar-view';
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December', 'January'];


  exampleDemosArr = {
    basic: 'demo-datepicker-basic',
    initialState: 'demo-datepicker-date-initial-state',
    customFormat: 'demo-date-picker-custom-format',
    hideOnScroll: 'demo-date-picker-hide-on-scroll',
    themes: 'demo-datepicker-color-theming',
    locales: 'demo-datepicker-change-locale',
    minMax: 'demo-datepicker-min-max',
    daysDisabled: 'demo-datepicker-daysdisabled',
    minMode: 'demo-datepicker-min-mode',
    disabled: 'demo-datepicker-disabled',
    forms: 'demo-datepicker-forms',
    reactiveForms: 'demo-datepicker-reactive-forms',
    manualTrigger: 'demo-datepicker-triggers-manual',
    placement: 'demo-datepicker-placement',
    configMethod: 'demo-datepicker-config-method',
    visibilityEvents: 'demo-datepicker-visibility-events',
    valueChangeEvent: 'demo-datepicker-value-change-event',
    configProperties: 'demo-datepicker-config-object',
    selectFromOtherMonth: 'demo-datepicker-select-dates-from-other-months',
    outsideClick: 'demo-datepicker-outside-click',
    triggerByIsOpen: 'demo-datepicker-trigger-by-isopen',
    customTriggers: 'demo-datepicker-triggers-custom',
    selectWeek: 'demo-datepicker-select-week',
    inlineDatepicker: 'bs-datepicker-inline',
    customTodayClass: 'demo-datepicker-custom-today-class'
  };

  async clickOnDatepickerInput(baseSelector: string, datepickerIndex = 0) {
    // cy.get(`${baseSelector} ${this.datepickerInput}`).eq(datepickerIndex).click();
    await $$(`${baseSelector} ${this.datepickerInput}`).get(datepickerIndex).click();
  }

  async isSelectedDateExist(picker = 'datepicker', exist: boolean, baseSelector = 'body', expectedDay?: string) {
    const appropriateContainer: string = this.getAppropriateContainer(picker);

    if (!exist) {
      // cy.get(`${baseSelector}>${appropriateContainer} .selected`).should('not.exist');
      expect(await $(`${baseSelector}>${appropriateContainer} .selected`).isPresent()).toBe(false);
    } else {
      /*cy.get(`${baseSelector}>${appropriateContainer} .selected`)
        .should('be.visible')
        .and('contain', expectedDay ? expectedDay : '');*/
      const element = await $(`${baseSelector}>${appropriateContainer} .selected`);
      expect(await element.isDisplayed()).toBeTruthy();
      expect(await element.getText()).toContain(expectedDay ? expectedDay : '');
    }
  }

  async isVisibleMonthOrYearEqual(expectedMonth: string, baseSelector = 'body') {
    const appropriateContainer: string =
      this.getAppropriateContainer(baseSelector === 'body' ? 'datepicker' : 'datepickerInline');

    /*cy.get(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} button`).eq(1)
      .should('be.visible')
      .and('to.have.text', expectedMonth);*/
    const element = $$(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} button`).get(1);
    expect(await element.isDisplayed()).toBeTruthy();
    expect(await element.getText()).toContain(expectedMonth);
  }

  async isDatepickerNavigationFullyActiveAndCorrect(mode = 'date',
                                              baseSelector = 'body',
                                              expectedMonth?: string,
                                              expectedYear?: string) {
    const currentMonth: string = this.monthNames[new Date().getMonth()];
    const currentYearSrt: string = new Date().getFullYear().toString();

    /*cy.get(`${baseSelector}>${this.datepickerContainer} ${this.datepickerNavView}`).as('DatepickerNavBarArray');
    cy.get('@DatepickerNavBarArray').find('button')
      .should('to.have.length', mode === 'date' ? 4 : 3);
    cy.get('@DatepickerNavBarArray').find('.previous')
      .should('be.visible')
      .and('to.have.text', '‹');
    cy.get('@DatepickerNavBarArray').find('.next')
      .should('be.visible')
      .and('to.have.text', '›');*/
    const datepickerNavBarArrayBtn = $$(`${baseSelector}>${this.datepickerContainer} ${this.datepickerNavView} button`);
    const datepickerNavBarPrev = $(`${baseSelector}>${this.datepickerContainer} ${this.datepickerNavView} .previous`);
    const datepickerNavBarNext = $(`${baseSelector}>${this.datepickerContainer} ${this.datepickerNavView} .next`);
    expect(await datepickerNavBarArrayBtn.count()).toEqual(mode === 'date' ? 4 : 3);
    expect(await datepickerNavBarPrev.isDisplayed()).toBeTruthy();
    expect(await datepickerNavBarNext.isDisplayed()).toBeTruthy();
    expect(await datepickerNavBarPrev.getText()).toEqual('‹');
    expect(await datepickerNavBarNext.getText()).toEqual('›');


    switch (mode) {
      case 'date':
        /*cy.get('@DatepickerNavBarArray').find('button').eq(1)
          .should('be.visible')
          .and('to.have.text', expectedMonth ? expectedMonth : currentMonth);
        cy.get('@DatepickerNavBarArray').find('button').eq(2)
          .should('be.visible')
          .and('to.have.text', expectedYear ? expectedYear : currentYearSrt);*/
        expect(await datepickerNavBarArrayBtn.get(1).isDisplayed()).toBeTruthy();
        expect(await datepickerNavBarArrayBtn.get(1).getText()).toEqual(expectedMonth ? expectedMonth : currentMonth);
        expect(await datepickerNavBarArrayBtn.get(2).isDisplayed()).toBeTruthy();
        expect(await datepickerNavBarArrayBtn.get(2).getText()).toEqual(expectedYear ? expectedYear : currentYearSrt);
        break;

      case 'month':
        /*cy.get('@DatepickerNavBarArray').find('button').eq(1)
          .should('be.visible')
          .and('to.have.text', expectedYear ? expectedYear : currentYearSrt);*/
        expect(await datepickerNavBarArrayBtn.get(1).isDisplayed()).toBeTruthy();
        expect(await datepickerNavBarArrayBtn.get(1).getText()).toEqual(expectedYear ? expectedYear : currentYearSrt);
        break;

      case 'year':
       /* cy.get('@DatepickerNavBarArray').find('button').eq(1)
          .should('be.visible')
          .and('to.have.text', `${new Date().getFullYear() - 7} - ${new Date().getFullYear() + 8}`);*/
        expect(await datepickerNavBarArrayBtn.get(1).isDisplayed()).toBeTruthy();
        expect(await datepickerNavBarArrayBtn.get(1).getText()).toEqual(`${new Date().getFullYear() - 7} - ${new Date().getFullYear() + 8}`);
        break;

      default:
        throw new Error('Unknown view mode');
    }
  }

  async isDatePickerBodyExistAndCorrect(mode: string, baseSelector = 'body') {
    const bodyView = this.getBodyParams(mode).bodyView;
    const expectedLength = this.getBodyParams(mode).expectedLength;

    /*cy.get(`${baseSelector}>${this.datepickerContainer} ${bodyView} td`)
      .should('to.have.length', expectedLength);*/
    const element = $$(`${baseSelector}>${this.datepickerContainer} ${bodyView} td`);
    expect(await element.count()).toEqual(expectedLength);
  }

  async isDatepickerOpened(opened: boolean, baseSelector = 'body') {
    /*cy.get(`${baseSelector}>${baseSelector === 'body' ? this.datepickerContainer : this.datepickerInlineContainer}`)
      .should(opened ? 'to.be.exist' : 'not.to.be.exist');*/
    const element = $(`${baseSelector}>${baseSelector === 'body' ? this.datepickerContainer : this.datepickerInlineContainer}`);
    expect(await element.isDisplayed()).toEqual(opened);
  }

  async isDaterangepickerOpened(opened: boolean, baseSelector = 'body') {
    // cy.get(`${baseSelector}>${this.daterangepickerContainer}`).should(opened ? 'to.be.exist' : 'not.to.be.exist');
    const element = await $(`${baseSelector}>${this.daterangepickerContainer}`);
    expect(await element.isPresent()).toEqual(opened ? 'true' : 'false')
  }

  async clickOnNavigation(baseSelector: string, navigationItem: string) {
    const appropriateContainer =
      this.getAppropriateContainer(baseSelector === 'body' ? 'datepicker' : 'datepickerInline');

    switch (navigationItem) {
      case '<' :
       // cy.get(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} .previous`).click();
        await $(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} .previous`).click();
        break;

      case '>' :
        // cy.get(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} .next`).click();
        await $(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} .next`).click();
        break;

      case 'month' :
        // cy.get(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} button`).eq(1).click();
        await $$(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} button`).get(1).click();
        break;

      case 'year' :
        // cy.get(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} button`).eq(2).click();
        await $$(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} button`).get(2).click();
        break;

      default:
        throw new Error('Unknown navigation item, correct: <, >, month, year');
    }
  }

  async clickOnDatepickerTableItem(mode: string, baseSelector = 'body', itemIndex?: number, itemText?: string) {
    const bodyView = this.getBodyParams(mode).bodyView;
    const appropriateContainer =
      this.getAppropriateContainer(baseSelector === 'body' ? 'datepicker' : 'datepickerInline');

    if (itemText === undefined) {
      // cy.get(`${baseSelector}>${appropriateContainer} ${bodyView} td`).eq(itemIndex).click();
      await $$(`${baseSelector}>${appropriateContainer} ${bodyView} td`).get(itemIndex).click();
    } else {
      /*cy.get(`${baseSelector}>${appropriateContainer} ${bodyView}`)
        .find(`td`)
        .not('.week')
        .find('span')
        .not('[class*="is-other-month"]')
        .contains(itemText).click();*/
      await element(by.cssContainingText(`${baseSelector}>${appropriateContainer} ${bodyView} td:not(.week) span:not([class*="is-other-month"])`, itemText)).click();
    }
  }

    async clickOnDaterangePickerTableItem(mode: string,
                                    pickerIndex = 0,
                                    baseSelector = 'body',
                                    itemIndex?: number,
                                    itemText?: string) {
      const bodyView = this.getBodyParams(mode).bodyView;

      if (itemText === undefined) {
        /*cy.get(`${baseSelector}>${this.daterangepickerContainer} ${bodyView}`)
          .eq(pickerIndex)
          .find(`td`)
          .not('.week')
          .find('span')
          .not('[class*="is-other-month"]')
          .eq(itemIndex).click();*/
        await $$(`${baseSelector}>${this.daterangepickerContainer} ${bodyView}`).get(pickerIndex).$$(`td:not(.week) span:not([class*="is-other-month"])`).get(itemIndex).click();
      } else {
        /*cy.get(`${baseSelector}>${this.daterangepickerContainer} ${bodyView}`)
          .eq(pickerIndex)
          .find(`td`)
          .not('.week')
          .find('span')
          .not('[class*="is-other-month"]')
          .contains(itemText).click();*/
        await element.all(by.bss(`${baseSelector}>${this.daterangepickerContainer} ${bodyView}`)).get(pickerIndex).all(by.cssContainingText(`td:not(.week) span:not([class*="is-other-month"])`, itemText)).click();
      }
    }

    async isMonthLocaleAppropriate(expectedLocale: string, pickerType = 'datepicker', baseSelector = 'body') {
      let actualMonthArr: any;
      switch (expectedLocale) {
        case 'hi' :
          actualMonthArr = globalLocales.hiLocale.months;
          break;

        case 'gl' :
          actualMonthArr = globalLocales.glLocale.months;
          break;

        case 'mn' :
          actualMonthArr = globalLocales.mnLocale.months;
          break;

        default:
          actualMonthArr = undefined;
      }
      /*cy.get(`${baseSelector}>${
        pickerType === 'datepicker' ? this.datepickerContainer : this.daterangepickerContainer} tbody td`)
        .eq(0).each((month, monthIndex) => {
        expect(month.text().toLowerCase()).to.contains(
          actualMonthArr ? actualMonthArr[monthIndex].toLowerCase() :
            new Date(2017, monthIndex)
              .toLocaleDateString(expectedLocale, { month: 'long' })
              .toLowerCase());
      });*/
      await $$(`${baseSelector}>${
        pickerType === 'datepicker' ? this.datepickerContainer : this.daterangepickerContainer} tbody td`).each(async (month, monthIndex) => {
          const monthExpected =  await month.getText();
        const actualMonth = await browser.executeScript(`return new Date(2017,  ${monthIndex}).toLocaleDateString('${expectedLocale}', { month: 'long' }).toLowerCase();`);
        expect(monthExpected.toLowerCase()).toContain(actualMonthArr ? actualMonthArr[monthIndex].toLowerCase() : actualMonth);
      });
    }

    async isWeekdayLocaleAppropriate(expectedLocale: string, pickerType = 'datepicker', baseSelector = 'body') {
      /*cy.get(`${baseSelector}>${
        pickerType === 'datepicker' ? this.datepickerContainer : this.daterangepickerContainer} table`)
        .eq(0)
        .find('th[aria-label*="weekday"]')
        .each((weekday, weekdayIndex) => {
          Object.values(globalLocales).forEach(globalLocale => {
            if (globalLocale === expectedLocale) {
              expect(weekday.text().toLowerCase())
                .to.contains(globalLocale.weekdaysShort[globalLocale.week.dow + weekdayIndex]);
            }
          });
        });*/
      await $$(`${baseSelector}>${
        pickerType === 'datepicker' ? this.datepickerContainer : this.daterangepickerContainer} table`)
        .get(0)
        .$$('th[aria-label*="weekday"]')
        .each(async (weekday, weekdayIndex) => {
          Object.values(globalLocales).forEach(async globalLocale => {
            if (globalLocale === expectedLocale) {
              expect(await weekday.text().toLowerCase())
                .toContain(globalLocale.weekdaysShort[globalLocale.week.dow + await weekdayIndex]);
            }
          });
        });
    }

  private getBodyParams(mode: string) {
    let bodyView: string;
    let expectedLength: number;
    switch (mode) {
      case 'date':
        bodyView = this.datepickerBodyDaysView;
        expectedLength = 48;
        break;
      case 'month':
        bodyView = this.datepickerBodyMonthView;
        expectedLength = 12;
        break;
      case 'year':
        bodyView = this.datepickerBodyYearsView;
        expectedLength = 16;
        break;
      default:
        throw new Error('Unknown view mode');
    }

    return { bodyView, expectedLength };
  }

  private getAppropriateContainer(picker: string) {
    let appropriateContainer: string;
    switch (picker) {
      case 'datepicker':
        return appropriateContainer = this.datepickerContainer;
      case 'daterangepicker':
        return appropriateContainer = this.daterangepickerContainer;
      case 'datepickerInline':
        return appropriateContainer = this.datepickerInlineContainer;
      default:
        return appropriateContainer = this.datepickerContainer;
    }
  }
}
