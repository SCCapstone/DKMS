describe("Login", () => {
  beforeEach(() => {
    void Cypress.session.clearAllSavedSessions();
  });

  it("should login to Spotify", () => {
    cy.login(
      Cypress.env("CYPRESS_SPOTIFY_USER") as string,
      Cypress.env("CYPRESS_SPOTIFY_PW") as string
    );

    cy.visit("/");
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should logout of Spotify", () => {
    cy.login(
      Cypress.env("CYPRESS_SPOTIFY_USER") as string,
      Cypress.env("CYPRESS_SPOTIFY_PW") as string
    );

    cy.visit("/");

    cy.logout();

    cy.visit("/");

    cy.url().should(
      "eq",
      "http://localhost:3000/api/auth/signin?callbackUrl=%2F"
    );
  });

  it("should not be able to access the feed without logging in", () => {
    cy.visit("/");

    cy.url().should(
      "eq",
      "http://localhost:3000/api/auth/signin?callbackUrl=%2F"
    );
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
