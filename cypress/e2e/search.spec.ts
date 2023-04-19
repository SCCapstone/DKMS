import type { User } from "next-auth";

const fixtureFile = `user${
  Cypress.env("environment") === "development" ? "-development" : ""
}.json` as const;

describe("Search", () => {
  beforeEach(() => {
    // Log in before each test
    cy.auth();
  });

  it("should start on the search page", () => {
    // Start from the search page
    cy.visit("/app/search");
    // The search page should contain an h1 with "Search"
    cy.get("h1").contains("Search");
  });

  it("should search for an artist", () => {
    // Start from the search page
    cy.visit("/app/search");
    // Search for an artist
    cy.get("input").type("RAYE");

    cy.get("button").contains("Search").click();

    // The search results should contain an h2 with "RAYE"
    cy.get("a").contains("RAYE");
    cy.url().should("include", "/search?q=RAYE");
  });

  it("should search for an album", () => {
    // Start from the search page
    cy.visit("/app/search");
    // Search for an album
    cy.get("input").type("Lover");

    cy.get("button").contains("Search").click();

    // The search results should contain an h2 with "Lover"
    cy.get("a").contains("Lover");
    cy.url().should("include", "/search?q=Lover");
  });

  it("should search for a track", () => {
    // Start from the search page
    cy.visit("/app/search");
    // Search for a track
    cy.get("input").type("Flamme");

    cy.get("button").contains("Search").click();

    // The search results should contain an h2 with "Flamme"
    cy.get("a").contains("Flamme");
    cy.url().should("include", "/search?q=Flamme");
  });

  it("should search for a playlist", () => {
    // Start from the search page
    cy.visit("/app/search");
    // Search for a playlist
    cy.get("input").type("Summer");

    cy.get("button").contains("Search").click();

    // The search results should contain an h2 with "Summer"
    cy.url().should("include", "/search?q=Summer");
    // cy.get("a").should("include", "Summer");
  });

  it("should search for a user by Spotify username", () => {
    cy.fixture(fixtureFile).then((user: User) => {
      // Start from the search page
      cy.visit("/app/search");
      // Search for a user
      cy.get("input").type(user.username);

      cy.get("button").contains("Search").click();

      // The search results should contain an h2 with the username
      cy.get("a").contains(user.username);
    });
  });

  it("should search for a user by DKMS display name", () => {
    cy.fixture(fixtureFile).then((user: User) => {
      // Start from the search page
      cy.visit("/app/search");
      // Search for a user
      cy.get("input").type(user.name);

      cy.get("button").contains("Search").click();

      // The search results should contain an h2 with the display name
      cy.get("a").contains(user.username);
    });
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
