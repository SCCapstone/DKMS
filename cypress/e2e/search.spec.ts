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

    // The search results should contain a link with "RAYE"
    cy.get("a").contains("RAYE");
    cy.url().should("include", "/search?q=RAYE");
  });

  it("should search for an album", () => {
    // Start from the search page
    cy.visit("/app/search");
    // Search for an album
    cy.get("input").type("Lover");

    cy.get("button").contains("Search").click();

    // The search results should contain a link with "Lover"
    cy.get("a").contains("Lover");
    cy.url().should("include", "/search?q=Lover");
  });

  it("should search for a track", () => {
    // Start from the search page
    cy.visit("/app/search");
    // Search for a track
    cy.get("input").type("Flamme");

    cy.get("button").contains("Search").click();

    cy.url().should("include", "/search?q=Flamme");
    // The search results should contain a link with "Flamme"
    cy.get("a").contains("Flamme");
  });

  it("should search for a playlist", () => {
    // Start from the search page
    cy.visit("/app/search");
    // Search for a playlist
    cy.get("input").type("Summer");

    cy.get("button").contains("Search").click();

    cy.url().should("include", "/search?q=Summer");
    // The search results should contain a link with "Summer"
    cy.get("a").contains("Summer");
  });

  it("should search for a user by Spotify username", () => {
    cy.fixture(fixtureFile).then((user: User) => {
      // Start from the search page
      cy.visit("/app/search");
      // Search for a user
      cy.get("input").type(user.username);

      cy.get("button").contains("Search").click();

      // The search results should contain a link with the username
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

      // The search results should contain a link with the display name
      cy.get("a").contains(user.username);
    });
  });
});

describe("Search Navigation", () => {
  beforeEach(() => {
    // Log in before each test
    cy.auth();
  });

  it("should navigate to an artist's page", () => {
    // Start from the search results page
    cy.visit("/app/search?q=RAYE");

    // Find a link with an href attribute containing "artist" and click it
    cy.get('a[href*="artist"]').contains("RAYE").click();

    // The artist page should contain an h2 with "RAYE"
    cy.get("h2").contains("RAYE");
  });

  it("should navigate to an album's page", () => {
    // Start from the search results page
    cy.visit("/app/search?q=Lover");

    // Find a link with an href attribute containing "album" and click it
    cy.get('a[href*="album"]').contains("Lover").click();

    // The album page should contain an h2 with "Lover"
    cy.get("h2").contains("Lover");
  });

  it("should navigate to a track's page", () => {
    // Start from the search results page
    cy.visit("/app/search?q=Flamme");

    // Find a link with an href attribute containing "track" and click it
    cy.get('a[href*="track"]').contains("Flamme").click();

    // The track page should contain an h2 with "Flamme"
    cy.get("h2").contains("Flamme");
  });

  it("should navigate to a playlist's page", () => {
    // Start from the search results page
    cy.visit("/app/search?q=Summer");

    // Find a link with an href attribute containing "playlist" and click it
    cy.get('a[href*="playlist"]').contains("Summer").click();

    // The playlist page should contain an h2 with "Summer"
    cy.get("h2").contains("Summer");
  });

  it("should navigate to a user's page", () => {
    cy.fixture(fixtureFile).then((user: User) => {
      // Start from the search results page
      cy.visit(`/app/search?q=${user.name}`);

      // Find a link with an href attribute containing "user" and click it
      cy.get('a[href*="profile"]').contains(user.username).click();

      // The user page should contain an h2 with the username
      cy.get("h2").contains(user.username);
    });
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
