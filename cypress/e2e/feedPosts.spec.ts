describe("Post and Delete Feed Item and Comment", () => {
  beforeEach(() => {
    // Log in before each test
    cy.auth();
  });

  it("should post and delete feed item and comment", () => {
    const postText = `Testing: ${Math.random().toString(36).substring(2, 8)}`;
    const commentText = `Testing: ${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    // Start from the feed page
    cy.visit("/app");
    // The feed page should contain an h1 with "Friends"
    cy.get("h1").contains("Friends");

    // Post a feed item
    cy.get("textarea[id=comment]").click();
    cy.get("textarea[id=comment]").type(postText);

    cy.get(`button:contains("Post")`).eq(1).click();

    // A feed item should be posted with random string for testing
    cy.get("p").contains(postText);

    // Post a comment
    cy.get("textarea[id=chat]").eq(0).click();
    cy.get("textarea[id=chat]").eq(0).type(commentText);

    cy.get("button").contains("Comment").click();

    // A feed comment should be posted with a random string for testing
    cy.get("p").contains(commentText);

    // Delete the comment that was just posted
    cy.get(`button[title="Delete feed item"]`).eq(1).click();

    // A comment with the random strings for a comment should be deleted
    cy.contains(commentText).should("not.exist", { timeout: 10000 });

    // Delete the feed item that was just posted
    cy.get(`button[title="Delete feed item"]`).eq(0).click();

    // A feed item with the random string for a post should be deleted
    cy.contains(postText).should("not.exist", { timeout: 10000 });
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
