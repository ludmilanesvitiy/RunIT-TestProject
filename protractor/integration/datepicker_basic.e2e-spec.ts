/**
 * Copied from NGX-Bootstrap project, full up-to-date version is available here: https://github.com/valor-software/ngx-bootstrap
 */

import { DatepickerPo } from '../support/datepicker.po';

describe('Datepicker demo page test suite', () => {
  const datepicker = new DatepickerPo();

  beforeEach(async () => await datepicker.navigateTo());

  describe('Basic datepicker', () => {
    const basic = datepicker.exampleDemosArr.basic;

    it('example contains 2 inputs: Datepicker and Daterangepicker with appropriate placeholders', async () => {
      await datepicker.isInputHaveAttrs(basic, [
        { attr: 'placeholder', value: 'Datepicker' },
        { attr: 'type', value: 'text' }], 0);

      await datepicker.isInputHaveAttrs(basic, [
        { attr: 'placeholder', value: 'Daterangepicker' },
        { attr: 'type', value: 'text' }], 1);
    });

    it('when user clicks on "Datepicker" input, container with 2 arrows: "‹", "›" opened, no one date selected', async () => {
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.isSelectedDateExist('datepicker', false);
      await datepicker.isDatepickerNavigationFullyActiveAndCorrect('date');
    });

    it('when user clicks on "‹" - previous month shown, when user clicks on "›" - next month shown', async () => {
      const currentMonth = new Date().getMonth();
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.clickOnNavigation('body', '<');
      await datepicker.isSelectedDateExist('datepicker', false);
      await datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[currentMonth === 0 ? datepicker.monthNames.length - 2 : currentMonth - 1]);
      await datepicker.clickOnNavigation('body', '>');
      await datepicker.isSelectedDateExist('datepicker', false);
      await datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[currentMonth]);
      await datepicker.clickOnNavigation('body', '>');
      await datepicker.isSelectedDateExist('datepicker', false);
      await datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[currentMonth + 1]);
    });

    it('when user clicks on month, then full table with 12 months shown with year in head block', async() => {
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.clickOnNavigation('body', 'month');
      await datepicker.isDatepickerNavigationFullyActiveAndCorrect('month');
      await datepicker.isDatePickerBodyExistAndCorrect('month');
    });

    it('when user clicks on month and "‹" button - previous year in head block shown', async () => {
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.clickOnNavigation('body', 'month');
      await datepicker.clickOnNavigation('body', '<');
      await datepicker.isDatePickerBodyExistAndCorrect('month');
      await datepicker.isVisibleMonthOrYearEqual((new Date().getFullYear() - 1).toString());
    });

    it('when user clicks on month and "›" button - next year in head block shown', async () => {
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.clickOnNavigation('body', 'month');
      await datepicker.clickOnNavigation('body', '>');
      await datepicker.isDatePickerBodyExistAndCorrect('month');
      await datepicker.isVisibleMonthOrYearEqual((new Date().getFullYear() + 1).toString());
    });

    it('when user clicks on month and then on any month - this month shown in head block, dates mode', async () => {
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.clickOnNavigation('body', 'month');
      await datepicker.clickOnDatepickerTableItem('month', 'body', 5);
      await datepicker.isDatePickerBodyExistAndCorrect('date');
      await datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[5]);
    });

    it('when user clicks on year, then table with 16 years shown with year interval in head block', async () => {
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.clickOnNavigation('body', 'year');
      await datepicker.isDatepickerNavigationFullyActiveAndCorrect('year');
      await datepicker.isDatePickerBodyExistAndCorrect('year');
    });

    it('when user clicks on year and "‹" button - interval with previous 16 years shown', async () => {
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.clickOnNavigation('body', 'year');
      await datepicker.clickOnNavigation('body', '<');
      await datepicker.isDatePickerBodyExistAndCorrect('year');
      await datepicker.isVisibleMonthOrYearEqual(
        `${(new Date().getFullYear() - 7 - 16)} - ${(new Date().getFullYear() + 8 - 16)}`);
    });

    it('when user clicks on year and "›" button - interval with next 16 years shown', async () => {
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.clickOnNavigation('body', 'year');
      await datepicker.clickOnNavigation('body', '>');
      await datepicker.isDatePickerBodyExistAndCorrect('year');
      await datepicker.isVisibleMonthOrYearEqual(
        `${(new Date().getFullYear() - 7 + 16)} - ${(new Date().getFullYear() + 8 + 16)}`);
    });

    it('when user clicks on year and any year - then it shown in head block and table with 12 months shown', async () => {
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.clickOnNavigation('body', 'year');
      await datepicker.clickOnDatepickerTableItem('year', 'body', 2);
      await datepicker.isDatePickerBodyExistAndCorrect('month');
      await datepicker.isVisibleMonthOrYearEqual(`${(new Date().getFullYear() - 7 + 2)}`);
    });

    it('when user clicks on year and any year - then it shown in head block and table with 12 months shown', async () => {
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.clickOnNavigation('body', 'year');
      await datepicker.clickOnDatepickerTableItem('year', 'body', 2);
      await datepicker.isDatePickerBodyExistAndCorrect('month');
      await datepicker.isVisibleMonthOrYearEqual(`${(new Date().getFullYear() - 7 + 2)}`);
    });

    it('when user clicks on: year mode => year => any month - then this month, year shown with dates mode', async () => {
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.clickOnNavigation('body', 'year');
      await datepicker.clickOnDatepickerTableItem('year', 'body', 0);
      await datepicker.clickOnDatepickerTableItem('month', 'body', 0);
      await datepicker.isDatePickerBodyExistAndCorrect('date');
      await datepicker.isDatepickerNavigationFullyActiveAndCorrect(
        'date', 'body', datepicker.monthNames[0], (new Date().getFullYear() - 7).toString());
    });

    it('when user clicks on any date - then this date appeared in the input in format "mm/dd/yyyy"', async () => {
      const chosenDate = new Date(`${new Date().getMonth() + 1}/10/${new Date().getFullYear()}`);
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
      await datepicker.isInputValueEqual(basic, `${chosenDate
        .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
    });

    it('when user chose date and click on "Datepicker" again, container opened and chosen date selected', async () => {
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.isSelectedDateExist('datepicker', true, 'body', '10');
    });

    it('when user clears input, add date in format "mm.dd.yyyy", click "Enter" - it converted to "mm/dd/yyyy"', async () => {
      await datepicker.clearInputAndSendKeys(basic, '05.10.2015', 0);
      await datepicker.clickEnterOnInput(basic);
      await datepicker.isInputValueEqual(basic, '05/10/2015');
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.isSelectedDateExist('datepicker', true, 'body', '10');
      await datepicker.isDatepickerNavigationFullyActiveAndCorrect('date', 'body', datepicker.monthNames[4], '2015');
    });

    it('when user clears input and add there date in bad format, click "Enter" - "Invalid date" shown', async () => {
      await datepicker.clearInputAndSendKeys(basic, '20,10,2015', 0);
      await datepicker.clickEnterOnInput(basic);
      await datepicker.isInputValueEqual(basic, 'Invalid date', 0);
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.isSelectedDateExist('datepicker', false);
    });

    it('when user clears input, add date in format "mmddyyyy", click "Enter" - date converted "mm/dd/yyyy"', async () => {
      await datepicker.clearInputAndSendKeys(basic, '05102015', 0);
      await datepicker.clickEnterOnInput(basic);
      await datepicker.isInputValueEqual(basic, '05/10/2015');
      await datepicker.clickOnDatepickerInput(basic);
      await datepicker.isSelectedDateExist('datepicker', true, 'body', '10');
      await datepicker.isDatepickerNavigationFullyActiveAndCorrect('date', 'body', datepicker.monthNames[4], '2015');
    });
  });
});
