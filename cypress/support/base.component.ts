export abstract class BaseComponent {
  abstract pageUrl: string;

  navigateTo() {
    cy.visit(`${ this.pageUrl }`);
  }

  scrollToMenu(subMenu: string) {
    cy.get('examples h3').contains(subMenu).scrollIntoView();
  }

  clickOnDemoMenu(subMenu: string) {
    cy.get('add-nav').contains('a', subMenu).click();
  }

  clickOnBtn(baseSelector: string, buttonIndex?: number) {
    cy.get(`${ baseSelector } button`).eq(buttonIndex ? buttonIndex : 0).click();
  }

  isInputHaveAttrs(baseSelector: string, attributes: any, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex)
      .then(input => {
        let i = 0;
        for (; i < attributes.length; i++) {
          expect(input).to.have.attr(attributes[i].attr, attributes[i].value);
        }
      });
  }

  isInputValueEqual(baseSelector: string, expectedTxt: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).should('to.have.value', expectedTxt);
  }

  clearInputAndSendKeys(baseSelector: string, dataToSend: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).clear().type(dataToSend);
  }

  clickEnterOnInput(baseSelector: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).type('{enter}');
  }

  pressEsc() {
    cy.get(`body input`).type('{esc}', { force: true });
  }

  isDemoContainsTxt(baseSelector: string, expectedTxt: string, expectedTxtOther?: string) {
    cy.get(`${baseSelector}`).invoke('text')
      .should(blockTxt => {
        expect(blockTxt).to.contains(expectedTxt);
        expect(blockTxt).to.contains(expectedTxtOther ? expectedTxtOther : expectedTxt);
      });
  }

  isButtonExist(baseSelector: string, buttonName: string, buttonNumber?: number, exist = true) {
    if (exist === true) {
      cy.get(`${baseSelector} button`).eq(buttonNumber ? buttonNumber : 0).invoke('text')
        .should(btnTxt => expect(btnTxt).to.equal(buttonName));
    } else {
      cy.get(`${baseSelector} button`).contains(buttonName).should('not.exist');
    }
  }

  isSelectExist(baseSelector: string, selectText: string, selectNumber = 0) {
    cy.get(`${baseSelector} select`).eq(selectNumber).invoke('text')
      .should(btnTxt => expect(btnTxt).to.contain(selectText));
  }

  selectOne(baseSelector: string, selectToChose: string, selectNumber = 0) {
    cy.get(`${baseSelector} select`).eq(selectNumber).select(selectToChose);
  }

  isCodePreviewExist(baseSelector: string, previewText: string, exist = true, previewNumber?: number) {
    if (exist) {
      cy.get(`${baseSelector} .code-preview`).eq(previewNumber ? previewNumber : 0).invoke('text')
        .should(btnTxt => expect(btnTxt).to.contain(previewText));
    } else {
      cy.get(`${baseSelector} .code-preview`)
        .should('not.exist');
    }
  }
}
