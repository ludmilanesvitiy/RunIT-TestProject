/**
 * Copied from NGX-Bootstrap project, full up-to-date version is available here: https://github.com/valor-software/ngx-bootstrap
 */

import { DatepickerPo } from '../support/datepicker.po';

describe('Datepicker demo page test suite', () => {
  const datepicker = new DatepickerPo();

  beforeEach(() => datepicker.navigateTo());

  describe('Basic datepicker', () => {
    const basic = datepicker.exampleDemosArr.basic;

    it('example contains 2 inputs: Datepicker and Daterangepicker with appropriate placeholders', () => {
      datepicker.isInputHaveAttrs(basic, [
        { attr: 'placeholder', value: 'Datepicker' },
        { attr: 'type', value: 'text' }], 0);

      datepicker.isInputHaveAttrs(basic, [
        { attr: 'placeholder', value: 'Daterangepicker' },
        { attr: 'type', value: 'text' }], 1);
    });

    it('when user clicks on "Datepicker" input, container with 2 arrows: "‹", "›" opened, no one date selected', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.isSelectedDateExist('datepicker', false);
      datepicker.isDatepickerNavigationFullyActiveAndCorrect('date');
    });

    it('when user clicks on "‹" - previous month shown, when user clicks on "›" - next month shown', () => {
      const currentMonth = new Date().getMonth();
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('body', '<');
      datepicker.isSelectedDateExist('datepicker', false);
      datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[currentMonth === 0 ? datepicker.monthNames.length - 2 : currentMonth - 1]);
      datepicker.clickOnNavigation('body', '>');
      datepicker.isSelectedDateExist('datepicker', false);
      datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[currentMonth]);
      datepicker.clickOnNavigation('body', '>');
      datepicker.isSelectedDateExist('datepicker', false);
      datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[currentMonth + 1]);
    });

    it('when user clicks on month, then full table with 12 months shown with year in head block', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('body', 'month');
      datepicker.isDatepickerNavigationFullyActiveAndCorrect('month');
      datepicker.isDatePickerBodyExistAndCorrect('month');
    });

    it('when user clicks on month and "‹" button - previous year in head block shown', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('body', 'month');
      datepicker.clickOnNavigation('body', '<');
      datepicker.isDatePickerBodyExistAndCorrect('month');
      datepicker.isVisibleMonthOrYearEqual((new Date().getFullYear() - 1).toString());
    });

    it('when user clicks on month and "›" button - next year in head block shown', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('body', 'month');
      datepicker.clickOnNavigation('body', '>');
      datepicker.isDatePickerBodyExistAndCorrect('month');
      datepicker.isVisibleMonthOrYearEqual((new Date().getFullYear() + 1).toString());
    });

    it('when user clicks on month and then on any month - this month shown in head block, dates mode', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('body', 'month');
      datepicker.clickOnDatepickerTableItem('month', 'body', 5);
      datepicker.isDatePickerBodyExistAndCorrect('date');
      datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[5]);
    });

    it('when user clicks on year, then table with 16 years shown with year interval in head block', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('body', 'year');
      datepicker.isDatepickerNavigationFullyActiveAndCorrect('year');
      datepicker.isDatePickerBodyExistAndCorrect('year');
    });

    it('when user clicks on year and "‹" button - interval with previous 16 years shown', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('body', 'year');
      datepicker.clickOnNavigation('body', '<');
      datepicker.isDatePickerBodyExistAndCorrect('year');
      datepicker.isVisibleMonthOrYearEqual(
        `${(new Date().getFullYear() - 7 - 16)} - ${(new Date().getFullYear() + 8 - 16)}`);
    });

    it('when user clicks on year and "›" button - interval with next 16 years shown', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('body', 'year');
      datepicker.clickOnNavigation('body', '>');
      datepicker.isDatePickerBodyExistAndCorrect('year');
      datepicker.isVisibleMonthOrYearEqual(
        `${(new Date().getFullYear() - 7 + 16)} - ${(new Date().getFullYear() + 8 + 16)}`);
    });

    it('when user clicks on year and any year - then it shown in head block and table with 12 months shown', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('body', 'year');
      datepicker.clickOnDatepickerTableItem('year', 'body', 2);
      datepicker.isDatePickerBodyExistAndCorrect('month');
      datepicker.isVisibleMonthOrYearEqual(`${(new Date().getFullYear() - 7 + 2)}`);
    });

    it('when user clicks on year and any year - then it shown in head block and table with 12 months shown', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('body', 'year');
      datepicker.clickOnDatepickerTableItem('year', 'body', 2);
      datepicker.isDatePickerBodyExistAndCorrect('month');
      datepicker.isVisibleMonthOrYearEqual(`${(new Date().getFullYear() - 7 + 2)}`);
    });

    it('when user clicks on: year mode => year => any month - then this month, year shown with dates mode', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnNavigation('body', 'year');
      datepicker.clickOnDatepickerTableItem('year', 'body', 0);
      datepicker.clickOnDatepickerTableItem('month', 'body', 0);
      datepicker.isDatePickerBodyExistAndCorrect('date');
      datepicker.isDatepickerNavigationFullyActiveAndCorrect(
        'date', 'body', datepicker.monthNames[0], (new Date().getFullYear() - 7).toString());
    });

    it('when user clicks on any date - then this date appeared in the input in format "mm/dd/yyyy"', () => {
      const chosenDate = new Date(`${new Date().getMonth() + 1}/10/${new Date().getFullYear()}`);
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
      datepicker.isInputValueEqual(basic, `${chosenDate
        .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
    });

    it('when user chose date and click on "Datepicker" again, container opened and chosen date selected', () => {
      datepicker.clickOnDatepickerInput(basic);
      datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
      datepicker.clickOnDatepickerInput(basic);
      datepicker.isSelectedDateExist('datepicker', true, 'body', '10');
    });

    it('when user clears input, add date in format "mm.dd.yyyy", click "Enter" - it converted to "mm/dd/yyyy"', () => {
      datepicker.clearInputAndSendKeys(basic, '05.10.2015', 0);
      datepicker.clickEnterOnInput(basic);
      datepicker.isInputValueEqual(basic, '05/10/2015');
      datepicker.clickOnDatepickerInput(basic);
      datepicker.isSelectedDateExist('datepicker', true, 'body', '10');
      datepicker.isDatepickerNavigationFullyActiveAndCorrect('date', 'body', datepicker.monthNames[4], '2015');
    });

    it('when user clears input and add there date in bad format, click "Enter" - "Invalid date" shown', () => {
      datepicker.clearInputAndSendKeys(basic, '20,10,2015', 0);
      datepicker.clickEnterOnInput(basic);
      datepicker.isInputValueEqual(basic, 'Invalid date', 0);
      datepicker.clickOnDatepickerInput(basic);
      datepicker.isSelectedDateExist('datepicker', false);
    });

    it('when user clears input, add date in format "mmddyyyy", click "Enter" - date converted "mm/dd/yyyy"', () => {
      datepicker.clearInputAndSendKeys(basic, '05102015', 0);
      datepicker.clickEnterOnInput(basic);
      datepicker.isInputValueEqual(basic, '05/10/2015');
      datepicker.clickOnDatepickerInput(basic);
      datepicker.isSelectedDateExist('datepicker', true, 'body', '10');
      datepicker.isDatepickerNavigationFullyActiveAndCorrect('date', 'body', datepicker.monthNames[4], '2015');
    });
  });
});
