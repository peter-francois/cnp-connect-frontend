/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add("loginAsSupervisor", () => {
  localStorage.clear();
  cy.intercept("POST", "auth/signin").as("login");
  cy.get('input[id="email"]').clear().type("nicolassam33@gmail.com");
  cy.get('input[id="password"]').type("Password123!");
  cy.get('[data-cy="data-submit-signin"]').click();
  cy.wait("@login").its("response.statusCode").should("eq", 201);
  cy.url().should("include", "/utilisateurs");
});

Cypress.Commands.add("loginAsCoordinator", () => {
  localStorage.clear();
  cy.intercept("POST", "auth/signin").as("login");
  cy.get('input[id="email"]').clear().type("claireroyer57@gmail.com");
  cy.get('input[id="password"]').type("Password123!");
  cy.get('[data-cy="data-submit-signin"]').click();
  cy.wait("@login").its("response.statusCode").should("eq", 201);
  cy.url().should("include", "/utilisateurs");
});
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      loginAsSupervisor(): Chainable<void>;
      loginAsCoordinator(): Chainable<void>;
      //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}
