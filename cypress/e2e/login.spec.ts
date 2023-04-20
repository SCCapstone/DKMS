/**
 * NOTE: This test is skipped by default. To run it, remove the ".skip" from the
 * describe.skip() function. This is done to prevent the test from running
 * during CI, because Spotify detects the automated browser and blocks the
 * request (and eventually the account itself).
 */
describe.skip("Login", () => {
  beforeEach(() => {
    void Cypress.session.clearAllSavedSessions();
  });

  it("should login to Spotify", () => {
    cy.envLogin();

    cy.visit("/app");
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should logout of Spotify", () => {
    cy.envLogin();

    cy.visit("/app");

    cy.logout();

    cy.visit("/app");

    cy.url().should(
      "eq",
      "http://localhost:3000/api/auth/signin?callbackUrl=%2F"
    );
  });

  it("should not be able to access the feed without logging in", () => {
    cy.visit("/app");

    cy.url().should(
      "eq",
      "http://localhost:3000/api/auth/signin?callbackUrl=%2F"
    );
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
