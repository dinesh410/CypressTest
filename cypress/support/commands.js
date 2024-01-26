// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// To get elements containing data-cy test attributes.
Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});

// To verify URL contains certain text.
Cypress.Commands.add("verifyUrl", (urlText) => {
  return cy.url().should("contain", urlText);
});

// To verify clipboard text.
Cypress.Commands.add("verifyClipboardText", (text) => {
  cy.window().then((win) => {
    win.navigator.clipboard.readText().then((text) => {
      expect(text).to.eq("npm install cypress --save-dev");
    });
  });
});
