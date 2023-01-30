describe("Navigation", () => {
  beforeEach(() => {
    cy.login(
      Cypress.env("CYPRESS_SPOTIFY_USER") as string,
      Cypress.env("CYPRESS_SPOTIFY_PW") as string
    );
  });

  it("should navigate to the Profile page", () => {
    // Start from the index page
    cy.visit("/");

    // Find a link with an href attribute containing "profile" and click it
    cy.navbarClick("Profile");

    // The new url should include "/profile"
    cy.url().should("include", "/");

    // The new page should contain an h1 with "About page"
    cy.get("h1").contains("Profile");
  });

  it("should navigate back to the feed when starting on a different page", () => {
    // Start from the profile page
    cy.visit("/profile");

    // Find a link with an href attribute containing "feed" and click it
    cy.navbarClick("Feed");

    // The new url should include "/"
    cy.url().should("include", "/");

    // The new page should contain an h1 with "Feed"
    cy.get("h1").contains("Feed");
  });

  it("should navigate to the feed when clicking on the logo", () => {
    // Start from the profile page
    cy.visit("/profile");

    // Find the logo and click it
    cy.navbarClick("DKMS");

    // The new url should include "/"
    cy.url().should("include", "/");

    // The new page should contain an h1 with "Feed"
    cy.get("h1").contains("Feed");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
