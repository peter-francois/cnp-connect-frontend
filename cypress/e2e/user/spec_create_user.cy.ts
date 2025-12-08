/// <reference types="cypress" />;

describe("Should add user in DB", () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.fr",
    role: "COORDINATOR",
  };
  
  beforeEach("Should load website", () => {
    cy.visit("/");
  });

  describe("Should display link for create user", () => {
    it("Should not display link for create user when user is not supervisor", () => {
      cy.loginAsCoordinator();
      cy.get('[data-cy="data-menu-button"]').click();
      cy.get('[data-cy="data-menu-link-newUser"]').should("not.be.visible");
    });

    it("Should display link for create user", () => {
      cy.loginAsSupervisor();
      cy.get('[data-cy="data-menu-button"]').click();
      cy.get('[data-cy="data-menu-link-newUser"]').should("exist");
    });
  });

  describe("Should add user in DB", () => {
    beforeEach("Should login as supervisor", () => {
      cy.loginAsSupervisor();
      cy.get('[data-cy="data-menu-button"]').click();
      cy.get('[data-cy="data-menu-link-newUser"]').should("exist");
      cy.get('[data-cy="data-menu-link-newUser"]').click();
      cy.url().should("include", "/nouvel-utilisateur");
    });

    it("Should display all errors", () => {
      cy.get('[data-cy="data-add-user-button"]').click();
      cy.get('[data-cy="data-error-lastName"]').should("exist");
      cy.get('[data-cy="data-error-firstName"]').should("exist");
      cy.get('[data-cy="data-error-email"]').should("exist");
      cy.get('[data-cy="data-error-role"]').should("exist");
    });

    it("Should not display lastName error", () => {
      cy.get('input[id="lastName"]').should("exist").type(user.lastName);
      cy.get('[data-cy="data-add-user-button"]').click();
      cy.get('[data-cy="data-error-lastName"]').should("not.exist");
    });

    it("Should not display firstName error", () => {
      cy.get('input[id="firstName"]').should("exist").type(user.firstName);
      cy.get('[data-cy="data-add-user-button"]').click();
      cy.get('[data-cy="data-error-firstName"]').should("not.exist");
    });

    it("Should not display email error", () => {
      cy.get('input[id="email"]').should("exist").type(user.email);
      cy.get('[data-cy="data-add-user-button"]').click();
      cy.get('[data-cy="data-error-emailName"]').should("not.exist");
    });

    it("Should not display role error", () => {
      cy.get(`label[for="${user.role}"]`).should("exist").click();
      cy.get('[data-cy="data-add-user-button"]').click();
      cy.get('[data-cy="data-error-role"]').should("not.exist");
    });

    it("Should add user in DB", () => {
      cy.intercept("POST", "/users", {
        statusCode: 201,
        body: {
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          },
          message: "Un nouvel utilisation vient d'être créé",
        },
      }).as("createUser");
      localStorage.clear();
      cy.get('input[id="lastName"]').should("exist").type(user.lastName);
      cy.get('input[id="firstName"]').should("exist").type(user.firstName);
      cy.get('input[id="email"]').should("exist").type(user.email);
      cy.get(`label[for="${user.role}"]`).should("exist").click();
      cy.get('[data-cy="data-add-user-button"]').click();
      cy.wait("@createUser").its("response.statusCode").should("eq", 201);
      cy.get('[data-cy="data-success-pop-up"]').should("have.class", "bg-green-700/40");
    });
  });
});
