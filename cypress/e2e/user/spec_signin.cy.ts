describe("Should signin", () => {
  const validUser = {
    email: "furty51@hotmail.fr",
    password: "Password123!",
  };
  const invalidUser = {
    email: "test@test.fr",
    password: "wrongPassword",
  };

  beforeEach("Should load website", () => {
    cy.visit("/");
    cy.intercept("POST", "auth/signin").as("login");
  });

  describe("Should accept a valid email", () => {
    beforeEach("Error email popup shouln't be displayed", () => {
      cy.get('[data-cy="data-error-email"]').should("not.exist");
    });

    it("Should have email and password fields", () => {
      cy.get('input[id="email"]').should("exist");
      cy.get('input[id="password"]').should("exist");
    });

    it("Should display an error when the email is empty", () => {
      cy.get('[data-cy="data-submit-signin"]').click();
      cy.get('[data-cy="data-error-email"]').should("be.visible");
    });

    it("Should display an error when the email format is invalid", () => {
      cy.get('input[id="email"]').type("test");
      cy.get('[data-cy="data-submit-signin"]').click();
      cy.get('[data-cy="data-error-email"]').should("exist");
    });

    it("Should accept a valid email", () => {
      cy.get('input[id="email"]').type(validUser.email);
      cy.get('[data-cy="data-submit-signin"]').click();
      cy.get('[data-cy="data-error-email"]').should("not.exist");
    });
  });

  describe("Should signin", () => {
    it("Should display an error when the passwort is empty", () => {
      cy.get('[data-cy="data-submit-signin"]').click();
      cy.get('[data-cy="data-error-password"]').should("be.visible");
    });

    it("Should be redirected to error page with 'not found' error", () => {
      cy.get('input[id="email"]').type(invalidUser.email);
      cy.get('input[id="password"]').type(invalidUser.password);
      cy.get('[data-cy="data-submit-signin"]').click();
      cy.wait("@login").its("response.statusCode").should("eq", 404);
    });

    it("Should be redirected to error page with 'precondition failed' error", () => {
      cy.get('input[id="email"]').clear().type(validUser.email);
      cy.get('input[id="password"]').type(invalidUser.password);
      cy.get('[data-cy="data-submit-signin"]').click();
      cy.wait("@login").its("response.statusCode").should("eq", 412);
    });

    it("Should signin", () => {
      cy.get('input[id="email"]').clear().type(validUser.email);
      cy.get('input[id="password"]').type(validUser.password);
      cy.get('[data-cy="data-submit-signin"]').click();
      cy.wait("@login").its("response.statusCode").should("eq", 201);
      cy.url().should("include", "/utilisateurs");
    });
  });
});
