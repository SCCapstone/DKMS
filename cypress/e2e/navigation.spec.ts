describe("Navigation", () => {
  beforeEach(() => {
    // Log in before each test
    cy.auth();
  });

  it("should start on the feed page", () => {
    // Start from the index page
    cy.visit("/app");
    // The new page should contain an h1 with "Friends"
    cy.get("h1").contains("Friends");
  });

  it("should navigate to the discover page", () => {
    // Start from the index page
    cy.visit("/app");

    // Find a link with an href attribute containing "discover" and click it
    cy.navbarClick("Discover");

    // The new url should include "/discover"
    cy.url().should("include", "/discover", { timeout: 10000 });

    // The new page should contain an h1 with "Discover"
    cy.get("h1").contains("Discover");
  });

  it("should navigate to the profile page", () => {
    // Start from the index page
    cy.visit("/app");

    // Find a link with an href attribute containing "profile" and click it
    cy.navbarClick("Profile");

    // The new url should include "/profile"
    cy.url().should("include", "/profile", { timeout: 10000 });

    // The new page should contain an h1 with "Profile"
    cy.get("h1").contains("Profile");
  });

  it("should navigate to the search page", () => {
    // Start from the index page
    cy.visit("/app");

    // Find a link with an href attribute containing "search" and click it
    cy.navbarClick("Search");

    // The new url should include "/search"
    cy.url().should("include", "/search", { timeout: 10000 });

    // The new page should contain an h1 with "Search"
    cy.get("h1").contains("Search");
  });

  it("should navigate to the recommendations page", () => {
    // Start from the index page
    cy.visit("/app");

    // Find a link with an href attribute containing "recommendations" and click it
    cy.navbarClick("Recommendations");

    // The new url should include "/recommendations"
    cy.url().should("include", "/recommendations", { timeout: 10000 });

    // The new page should contain an h1 with "Recommendations"
    cy.get("h1").contains("Recommendations");
  });

  it("should navigate to the settings page", () => {
    // Start from the index page
    cy.visit("/app");

    // Find a link with an href attribute containing "settings" and click it
    cy.navbarClick("Settings");

    // The new url should include "/settings"
    cy.url().should("include", "/settings", { timeout: 10000 });

    // The new page should contain an h1 with "Settings"
    cy.get("h1").contains("Settings");
  });

  it("should navigate back to the feed when starting on a different page", () => {
    // Start from the settings page
    cy.visit("/app/settings");

    // Find a link with an href attribute containing "feed" and click it
    cy.navbarClick("Feed");

    // The new url should include "/"
    cy.url().should("include", "/", { timeout: 10000 });

    // The new page should contain an h1 with "Friends"
    cy.get("h1").contains("Friends");
  });

  it("should navigate to the feed when clicking on the logo", () => {
    // Start from the settings page
    cy.visit("/app/settings");

    // Find the logo and click it
    cy.navbarClick("DKMS");

    // The new url should include "/"
    cy.url().should("include", "/", { timeout: 10000 });

    // The new page should contain an h1 with "Feed"
    cy.get("h1").contains("Friends");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
