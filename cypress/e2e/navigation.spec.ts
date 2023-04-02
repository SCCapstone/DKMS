describe("Navigation", () => {
  beforeEach(() => {
    // Log in before each test
    cy.auth();
  });

  it("should navigate to the Settings page", () => {
    // Start from the index page
    cy.visit("/");

    // Find a link with an href attribute containing "settings" and click it
    cy.navbarClick("Settings");

    // The new url should include "/settings"
    cy.url().should("include", "/settings");

    // The new page should contain an h1 with "Settings"
    cy.get("h1").contains("Settings");
  });

  it("should navigate back to the feed when starting on a different page", () => {
    // Start from the settings page
    cy.visit("/settings");

    // Find a link with an href attribute containing "feed" and click it
    cy.navbarClick("Feed");

    // The new url should include "/"
    cy.url().should("include", "/");

    // The new page should contain an h1 with "Friends"
    cy.get("h1").contains("Friends");
  });

  it("should navigate to the feed when clicking on the logo", () => {
    // Start from the settings page
    cy.visit("/settings");

    // Find the logo and click it
    cy.navbarClick("DKMS");

    // The new url should include "/"
    cy.url().should("include", "/");

    // The new page should contain an h1 with "Feed"
    cy.get("h1").contains("Friends");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
