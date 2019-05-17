/**
 * Copied from NGX-Bootstrap project, full up-to-date version is available here: https://github.com/valor-software/ngx-bootstrap
 */

import { DatepickerPo } from '../support/datepicker.po';
import * as globalLocales from 'ngx-bootstrap/locale';

describe('Datepicker demo test suite: Locales', () => {
  const datepicker = new DatepickerPo();
  const locales = datepicker.exampleDemosArr.locales;

  describe('Default state', () => {
    beforeEach(() => {
      datepicker.navigateTo();
    });

    it(`example contains 2 selects (with "en" locale), Datepicker and Daterangepicker and appropriate buttons`, () => {
      datepicker.isSelectExist(locales, 'en', 0);
      datepicker.isSelectExist(locales, 'en', 1);
      datepicker.isInputHaveAttrs(locales, [{ attr: 'placeholder', value: 'Datepicker' }], 0);
      datepicker.isInputHaveAttrs(locales, [{ attr: 'placeholder', value: 'Daterangepicker' }], 1);
      datepicker.isButtonExist(locales, 'Date Picker', 0);
      datepicker.isButtonExist(locales, 'Date Range Picker', 1);
    });

    it(`when user clicks on "Date Picker" btn, container opened with all info in English (month, days)`, () => {
      datepicker.clickOnBtn(locales, 0);
      datepicker.isDatepickerOpened(true);
      datepicker.clickOnNavigation('body', 'month');
      datepicker.isMonthLocaleAppropriate('en');
      datepicker.clickOnDatepickerTableItem('month', 'body', 0);
      datepicker.isWeekdayLocaleAppropriate('en');
    });
  });

  describe('Change Locale Datepicker', () => {
    before(() => {
      datepicker.navigateTo();
    });

    Object.values(globalLocales).forEach(globalLocale => {
      const currentLocale = globalLocale.abbr;
      if (currentLocale !== undefined) {
        it(`when user chose locale ${currentLocale} for "Datepicker", container shown in appropriate language`, () => {
          datepicker.selectOne(locales, currentLocale, 0);
          datepicker.isDatepickerOpened(true);
          datepicker.clickOnNavigation('body', 'month');
          datepicker.isMonthLocaleAppropriate(currentLocale);
          datepicker.clickOnDatepickerTableItem('month', 'body', 0);
          datepicker.isWeekdayLocaleAppropriate(currentLocale);
        });
      } else {
        throw new Error(`${globalLocale} missing abbr key`);
      }
    });
  });
});
