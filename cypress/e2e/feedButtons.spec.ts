describe("Feed", () => {
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

  it("should be able to post an item, comment on it, like it, unlike it, save it, unsave it, and delete it", () => {
    const postText = `Testing: ${Math.random().toString(36).substring(2, 8)}`;
    const commentText = `Testing: ${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    // Start from feed page
    cy.visit("/app");

    // Post a feed item
    cy.get("textarea[id=comment]").click();
    cy.get("textarea[id=comment]").type(postText);

    cy.get(`button:contains("Post")`).eq(1).click();

    // The feed should now contain a post that includes a randomly generated string for testing
    cy.get("p").contains(postText);

    // Post a comment
    cy.get("textarea[id=chat]").eq(0).click();
    cy.get("textarea[id=chat]").eq(0).type(commentText);

    cy.get("button").contains("Comment").click();

    // A feed comment should be posted with a randomly generated string for testing
    cy.get("p").contains(commentText);

    // Like post
    cy.get("button[id=likeButton]").eq(0).click();

    // Should contain 1 like
    cy.get("button[id=likeButton]").eq(0).contains("1");

    // Like post
    cy.get("button[id=likeButton]").eq(0).click();

    // Should contain 1 like
    cy.get("button[id=likeButton]").eq(0).contains("0");

    // Find save button
    cy.get("button[id=saveButton]").eq(0).click();

    // View saved posts
    cy.get("button").contains("Saved").click();

    // Should be on the saved posts url
    cy.url().should("include", "/app?s=true");

    // A post containing postText random string should be present
    cy.get("p").contains(postText);

    // Find save button
    cy.get("button[id=saveButton]").eq(0).click();

    // Should be on the saved posts url
    cy.url().should("include", "/app");

    // Find delete button
    cy.get("button[id=deleteButton]").eq(0).click();

    // Post should no longer exist
    cy.get("p", { timeout: 10000 }).contains(postText).should("not.exist");
  });
});

export {};
