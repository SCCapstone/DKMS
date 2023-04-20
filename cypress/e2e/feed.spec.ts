import type { User } from "next-auth";

const fixtureFile = `user${
  Cypress.env("environment") === "development" ? "-development" : ""
}.json` as const;

describe("Feed", () => {
  beforeEach(() => {
    cy.auth();
  });

  it("should start on the feed page", () => {
    // Start from the feed page
    cy.visit("/app");
    // The feed page should contain an h1 with "Friends"
    cy.get("h1").contains("Friends");
  });

  it("should be able to post text to the feed", () => {
    // Start from feed page
    cy.visit("/app");
    // Type in post box
    cy.get("input").type("Post Test");

    cy.get("button").contains("Post").click();

    // The feed should now contain a post that includes "Post Test"
    cy.get("p").contains("Post Test");
  });

  it("should be able to like a post", () => {
    // Start from feed page
    cy.visit("/app");
    // Find like button
    cy.get('[id="likeButton"]').click();
    // Should contain 1 like
    cy.get('[id="likeButton"]').contains("1");
  });
});

export {};
