/**
 * Copied from NGX-Bootstrap project, full up-to-date version is available here: https://github.com/valor-software/ngx-bootstrap
 */

import { BaseComponent } from './base.component';
import * as globalLocales from 'ngx-bootstrap/locale';

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

  clickOnDatepickerInput(baseSelector: string, datepickerIndex = 0) {
    cy.get(`${baseSelector} ${this.datepickerInput}`).eq(datepickerIndex).click();
  }

  isSelectedDateExist(picker = 'datepicker', exist: boolean, baseSelector = 'body', expectedDay?: string) {
    const appropriateContainer: string = this.getAppropriateContainer(picker);

    if (!exist) {
      cy.get(`${baseSelector}>${appropriateContainer} .selected`)
        .should('not.exist');
    } else {
      cy.get(`${baseSelector}>${appropriateContainer} .selected`)
        .should('be.visible')
        .and('contain', expectedDay ? expectedDay : '');
    }
  }

  isVisibleMonthOrYearEqual(expectedMonth: string, baseSelector = 'body') {
    const appropriateContainer: string =
      this.getAppropriateContainer(baseSelector === 'body' ? 'datepicker' : 'datepickerInline');

    cy.get(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} button`).eq(1)
      .should('be.visible')
      .and('to.have.text', expectedMonth);
  }

  isDatepickerNavigationFullyActiveAndCorrect(mode = 'date',
                                              baseSelector = 'body',
                                              expectedMonth?: string,
                                              expectedYear?: string) {
    const currentMonth: string = this.monthNames[new Date().getMonth()];
    const currentYearSrt: string = new Date().getFullYear().toString();

    cy.get(`${baseSelector}>${this.datepickerContainer} ${this.datepickerNavView}`).as('DatepickerNavBarArray');
    cy.get('@DatepickerNavBarArray').find('button')
      .should('to.have.length', mode === 'date' ? 4 : 3);
    cy.get('@DatepickerNavBarArray').find('.previous')
      .should('be.visible')
      .and('to.have.text', '‹');
    cy.get('@DatepickerNavBarArray').find('.next')
      .should('be.visible')
      .and('to.have.text', '›');

    switch (mode) {
      case 'date':
        cy.get('@DatepickerNavBarArray').find('button').eq(1)
          .should('be.visible')
          .and('to.have.text', expectedMonth ? expectedMonth : currentMonth);
        cy.get('@DatepickerNavBarArray').find('button').eq(2)
          .should('be.visible')
          .and('to.have.text', expectedYear ? expectedYear : currentYearSrt);
        break;

      case 'month':
        cy.get('@DatepickerNavBarArray').find('button').eq(1)
          .should('be.visible')
          .and('to.have.text', expectedYear ? expectedYear : currentYearSrt);
        break;

      case 'year':
        cy.get('@DatepickerNavBarArray').find('button').eq(1)
          .should('be.visible')
          .and('to.have.text', `${new Date().getFullYear() - 7} - ${new Date().getFullYear() + 8}`);
        break;

      default:
        throw new Error('Unknown view mode');
    }
  }

  isDatePickerBodyExistAndCorrect(mode: string, baseSelector = 'body') {
    const bodyView = this.getBodyParams(mode).bodyView;
    const expectedLength = this.getBodyParams(mode).expectedLength;

    cy.get(`${baseSelector}>${this.datepickerContainer} ${bodyView} td`)
      .should('to.have.length', expectedLength);
  }

  isDatePickerTriggerCorrect(mode: string, baseSelector = 'body') {
    const bodyView = this.getBodyParams(mode).bodyView;

    cy.get(`${baseSelector}>${this.datepickerContainer} ${bodyView} td`)
      .each(date => {
        cy.wrap(date).trigger('mouseenter').should('to.have.class', 'is-highlighted');
      });
  }

  isDatepickerOpened(opened: boolean, baseSelector = 'body') {
    cy.get(`${baseSelector}>${baseSelector === 'body' ? this.datepickerContainer : this.datepickerInlineContainer}`)
      .should(opened ? 'to.be.exist' : 'not.to.be.exist');
  }

  isDaterangepickerOpened(opened: boolean, baseSelector = 'body') {
    cy.get(`${baseSelector}>${this.daterangepickerContainer}`).should(opened ? 'to.be.exist' : 'not.to.be.exist');
  }

  clickOnNavigation(baseSelector: string, navigationItem: string) {
    const appropriateContainer =
      this.getAppropriateContainer(baseSelector === 'body' ? 'datepicker' : 'datepickerInline');

    switch (navigationItem) {
      case '<' :
        cy.get(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} .previous`).click();
        break;

      case '>' :
        cy.get(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} .next`).click();
        break;

      case 'month' :
        cy.get(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} button`).eq(1).click();
        break;

      case 'year' :
        cy.get(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} button`).eq(2).click();
        break;

      default:
        throw new Error('Unknown navigation item, correct: <, >, month, year');
    }
  }

  clickOnDateRangePickerNavigation(navigationItem: string, baseSelector = 'body') {
    switch (navigationItem) {
      case '<' :
        cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`)
          .eq(0)
          .find('.previous')
          .click();
        break;

      case '>' :
        cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`)
          .eq(1)
          .find('.next')
          .click();
        break;

      case 'month-left' || 'yearInterval-left' :
        cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`)
          .eq(0)
          .find('button')
          .eq(1)
          .click();
        break;

      case 'month-right' || 'yearInterval-right' :
        cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`)
          .eq(1)
          .find('button')
          .eq(1)
          .click();
        break;

      case 'year-left' :
        cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`)
          .eq(0)
          .find('button')
          .eq(2)
          .click();
        break;

      case 'year-right' :
        cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`)
          .eq(1)
          .find('button')
          .eq(2)
          .click();
        break;

      default:
        throw new Error(`Unknown item, available: "<", ">", "month-left", "month-right",
        "year-left", "year-right", "yearInterval-left", "yearInterval-right"`);
    }
  }

  clickOnDatepickerTableItem(mode: string, baseSelector = 'body', itemIndex?: number, itemText?: string) {
    const bodyView = this.getBodyParams(mode).bodyView;
    const appropriateContainer =
      this.getAppropriateContainer(baseSelector === 'body' ? 'datepicker' : 'datepickerInline');

    if (itemText === undefined) {
      cy.get(`${baseSelector}>${appropriateContainer} ${bodyView} td`).eq(itemIndex).click();
    } else {
      cy.get(`${baseSelector}>${appropriateContainer} ${bodyView}`)
        .find(`td`)
        .not('.week')
        .find('span')
        .not('[class*="is-other-month"]')
        .contains(itemText).click();
    }
  }

  clickOnDaterangePickerTableItem(mode: string,
                                  pickerIndex = 0,
                                  baseSelector = 'body',
                                  itemIndex?: number,
                                  itemText?: string) {
    const bodyView = this.getBodyParams(mode).bodyView;

    if (itemText === undefined) {
      cy.get(`${baseSelector}>${this.daterangepickerContainer} ${bodyView}`)
        .eq(pickerIndex)
        .find(`td`)
        .not('.week')
        .find('span')
        .not('[class*="is-other-month"]')
        .eq(itemIndex).click();
    } else {
      cy.get(`${baseSelector}>${this.daterangepickerContainer} ${bodyView}`)
        .eq(pickerIndex)
        .find(`td`)
        .not('.week')
        .find('span')
        .not('[class*="is-other-month"]')
        .contains(itemText).click();
    }
  }

  isMonthLocaleAppropriate(expectedLocale: string, pickerType = 'datepicker', baseSelector = 'body') {
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
    cy.get(`${baseSelector}>${
      pickerType === 'datepicker' ? this.datepickerContainer : this.daterangepickerContainer} tbody td`)
      .eq(0).each((month, monthIndex) => {
      expect(month.text().toLowerCase()).to.contains(
        actualMonthArr ? actualMonthArr[monthIndex].toLowerCase() :
          new Date(2017, monthIndex)
            .toLocaleDateString(expectedLocale, { month: 'long' })
            .toLowerCase());
    });
  }

  isWeekdayLocaleAppropriate(expectedLocale: string, pickerType = 'datepicker', baseSelector = 'body') {
    cy.get(`${baseSelector}>${
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
