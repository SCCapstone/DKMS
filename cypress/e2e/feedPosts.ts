describe("Post and Delete Feed Item and Comment", () => {
  beforeEach(() => {
    // Log in before each test
    cy.auth();
  });

  it("should start on the feed page", () => {
    // Start from the feed page
    cy.visit("/app");
    // The feed page should contain an h1 with "Friends"
    cy.get("h1").contains("Friends");
  });

  it("should post a feed item", () => {
    // Start from the feed page

    cy.visit("/app");
    // Post a feed item
    cy.get("textarea[id=comment]").click();
    cy.type("This is a test post!");

    cy.get("button").contains("POST").click();

    // A feed item should be posted with "This is a test post!"
    cy.get("p").contains("This is a test post!");
  });

  it("should post a comment", () => {
    // Start from the feed page

    cy.visit("/app");
    // Post a comment
    cy.get('textarea[id="chat"]').click();
    cy.type("This is a test comment!");

    cy.get("button").contains("COMMENT").click();

    // A feed comment should be posted with "This is a test comment!"
    cy.get("p").contains("This is a test comment!");
  });

  it("should delete a comment", () => {
    // Start from the feed page
    cy.visit("/app");

    // Delete the comment that was just posted
    cy.get(`button[title="Delete feed item"]`).eq(1).click();

    // A comment with "This is a test comment!" should be deleted
    cy.contains("This is a test comment!").should("not.exist");
  });

  it("should delete a feed item", () => {
    // Start from the feed page
    cy.visit("/app");

    // Delete the feed item that was just posted
    cy.get(`button[title="Delete feed item"]`).eq(0).click();

    // A feed item with "This is a test post!" should be deleted
    cy.contains("This is a test post!").should("not.exist");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
