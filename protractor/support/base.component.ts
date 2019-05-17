import { $, $$, browser, by, element, protractor } from 'protractor';

export abstract class BaseComponent {
  abstract pageUrl: string;

  async navigateTo() {
    await browser.get(`ngx-bootstrap/#${ this.pageUrl }`);
  }

  async scrollToMenu(subMenu: string) {
    // cy.get('examples h3').contains(subMenu).scrollIntoView();
    const elem = element(by.cssContainingText('examples h3', subMenu));
    await browser.actions({bridge: true}).move({origin: elem, x: 0, y: 0}).perform();
  }

  async clickOnDemoMenu(subMenu: string) {
    // cy.get('add-nav').contains('a', subMenu).click();
    await element(by.cssContainingText('add-nav a', subMenu)).click();
  }

  async clickOnBtn(baseSelector: string, buttonIndex?: number) {
    // cy.get(`${ baseSelector } button`).eq(buttonIndex ? buttonIndex : 0).click();
    await $$(`${ baseSelector } button`).get(buttonIndex ? buttonIndex : 0).click();
  }

  async isInputHaveAttrs(baseSelector: string, attributes: any, inputIndex = 0) {
    /*cy.get(`${baseSelector} input`).eq(inputIndex)
      .then(input => {
        let i = 0;
        for (; i < attributes.length; i++) {
          expect(input).to.have.attr(attributes[i].attr, attributes[i].value);
        }
      });*/
    const input = $$(`${baseSelector} input`).get(inputIndex);
      let i = 0;
      for (; i < attributes.length; i++) {
        expect(await input.getAttribute(attributes[i].attr)).toEqual(attributes[i].value);
      }
  }

  async isInputValueEqual(baseSelector: string, expectedTxt: string, inputIndex = 0) {
    // cy.get(`${baseSelector} input`).eq(inputIndex).should('to.have.value', expectedTxt);
    const input = $$(`${baseSelector} input`).get(inputIndex);
    expect(await input.getAttribute('value')).toEqual(expectedTxt);
  }

  async clearInputAndSendKeys(baseSelector: string, dataToSend: string, inputIndex = 0) {
    // cy.get(`${baseSelector} input`).eq(inputIndex).clear().type(dataToSend);
    const input = $$(`${baseSelector} input`).get(inputIndex);
    await input.clear();
    await input.sendKeys(dataToSend);
  }

  async clickEnterOnInput(baseSelector: string, inputIndex = 0) {
    //cy.get(`${baseSelector} input`).eq(inputIndex).type('{enter}');
    await browser.actions({bridge: true}).sendKeys(protractor.Key.ENTER).perform(); // TODO pay attention, not on input, but at all
  }

  async pressEsc() {
    // cy.get(`body input`).type('{esc}', { force: true });
    await browser.actions({bridge: true}).sendKeys(protractor.Key.ESCAPE).perform();
  }

  async isDemoContainsTxt(baseSelector: string, expectedTxt: string, expectedTxtOther?: string) {
    /*cy.get(`${baseSelector}`).invoke('text')
      .should(blockTxt => {
        expect(blockTxt).to.contains(expectedTxt);
        expect(blockTxt).to.contains(expectedTxtOther ? expectedTxtOther : expectedTxt);
      });*/
    const element = await $(`${baseSelector}`);
    expect(await element.getText()).toEqual(expectedTxt);
    expect(await element.getText()).toEqual(expectedTxtOther ? expectedTxtOther : expectedTxt);
  }

  async isButtonExist(baseSelector: string, buttonName: string, buttonNumber?: number, exist = true) {
    /*if (exist === true) {
      cy.get(`${baseSelector} button`).eq(buttonNumber ? buttonNumber : 0).invoke('text')
        .should(btnTxt => expect(btnTxt).to.equal(buttonName));
    } else {
      cy.get(`${baseSelector} button`).contains(buttonName).should('not.exist');
    }*/
    const element = $$(`${baseSelector} button`).get(buttonNumber ? buttonNumber : 0);
    if (exist === true) {
      expect(await element.getText()).toEqual(buttonName);
    } else {
      expect(await element.isPresent()).toBe(false);
    }
  }

  async isSelectExist(baseSelector: string, selectText: string, selectNumber = 0) {
    /*cy.get(`${baseSelector} select`).eq(selectNumber).invoke('text')
      .should(btnTxt => expect(btnTxt).to.contain(selectText));*/
    const select = $$(`${baseSelector} select`).get(selectNumber);
     expect(await select.getText()).toContain(selectText);
  }

  async selectOne(baseSelector: string, selectToChose: string, selectNumber = 0) {
    //cy.get(`${baseSelector} select`).eq(selectNumber).select(selectToChose);
    await element.all(by.css(`${baseSelector} select option[value="${selectToChose}"]`)).get(0).click();
  }
}
