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

  it("should be able to comment on a post", () => {
    // Start from feed page
    cy.visit("/app");
    // Type in comment box
    cy.get("[id=chat]").type("Comment");
    cy.get("p").contains("Comment");
  });

  it("should be able to like a post", () => {
    // Start from feed page
    cy.visit("/app");
    // Find like button
    cy.get("[id=likeButton]").click();
    // Should contain 1 like
    cy.get("[id=likeButton]").contains("1");
  });

  it("should be able to save a post", () => {
    // Start from feed page
    cy.visit("/app");
    // Find save button
    cy.get("[id=saveButton]").click();
    // Switch to saved posts
    cy.get("button").contains("Saved").click();
    // Search saved posts
    cy.get("p").contains("Post Test");
  });

  it("should be able to delete a post", () => {
    // Start from feed page
    cy.visit("/app");
    // Find delete button
    cy.get("[id=deleteButton]").click();
    // Post should no longer exist
    cy.get("p").contains("Post Text").should("not.exist");
  });
});

export {};
