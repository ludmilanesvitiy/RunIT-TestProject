/**
 * Copied from NGX-Bootstrap project, full up-to-date version is available here: https://github.com/valor-software/ngx-bootstrap
 */

import { DatepickerPo } from '../support/datepicker.po';
import * as globalLocales from 'ngx-bootstrap/locale';

describe('Datepicker demo test suite: Locales', () => {
  const datepicker = new DatepickerPo();
  const locales = datepicker.exampleDemosArr.locales;

  describe('Default state', () => {
    beforeEach(async () => {
      await datepicker.navigateTo();
    });

    it(`example contains 2 selects (with "en" locale), Datepicker and Daterangepicker and appropriate buttons`, async () => {
      await datepicker.isSelectExist(locales, 'en', 0);
      await datepicker.isSelectExist(locales, 'en', 1);
      await datepicker.isInputHaveAttrs(locales, [{attr: 'placeholder', value: 'Datepicker'}], 0);
      await datepicker.isInputHaveAttrs(locales, [{attr: 'placeholder', value: 'Daterangepicker'}], 1);
      await datepicker.isButtonExist(locales, 'Date Picker', 0);
      await datepicker.isButtonExist(locales, 'Date Range Picker', 1);
    });

    it(`when user clicks on "Date Picker" btn, container opened with all info in English (month, days)`, async () => {
      await datepicker.clickOnBtn(locales, 0);
      await datepicker.isDatepickerOpened(true);
      await datepicker.clickOnNavigation('body', 'month');
      await datepicker.isMonthLocaleAppropriate('en');
      await datepicker.clickOnDatepickerTableItem('month', 'body', 0);
      await datepicker.isWeekdayLocaleAppropriate('en');
    });
  });

  describe('Change Locale Datepicker', () => {

    beforeAll(async () => await datepicker.navigateTo());

    Object.values(globalLocales).forEach((globalLocale) => {
      it(`when user chose locale ${globalLocale.abbr} for "Datepicker", container shown in appropriate language`, async () => {
        await datepicker.selectOne(locales, globalLocale.abbr, 0);
        await datepicker.isDatepickerOpened(true);
        await datepicker.clickOnNavigation('body', 'month');
        await datepicker.isMonthLocaleAppropriate(globalLocale.abbr);
        await datepicker.clickOnDatepickerTableItem('month', 'body', 0);
        await datepicker.isWeekdayLocaleAppropriate(globalLocale.abbr);
      });
    });
  });
});
