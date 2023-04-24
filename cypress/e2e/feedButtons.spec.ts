const postText = `Testing: ${Math.random().toString(36).substring(2, 8)}`;
const commentText = `Testing: ${Math.random().toString(36).substring(2, 8)}`;
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

  it("should be able to post text to the feed", () => {
    // Start from feed page
    cy.visit("/app");

    // Post a feed item
    cy.get("textarea[id=comment]").click();
    cy.get("textarea[id=comment]").type(postText);

    cy.get(`button:contains("Post")`).eq(1).click();

    // The feed should now contain a post that includes a randomly generated string for testing
    cy.get("p").contains(postText);
  });

  it("should be able to comment on a post", () => {
    // Start from feed page
    cy.visit("/app");

    // Post a comment
    cy.get("textarea[id=chat]").eq(0).click();
    cy.get("textarea[id=chat]").eq(0).type(commentText);

    cy.get("button").contains("Comment").click();

    // A feed comment should be posted with a randomly generated string for testing
    cy.get("p").contains(commentText);
  });

  it("should be able to like a post", () => {
    // Start from feed page
    cy.visit("/app");

    // Like post
    cy.get("button[id=likeButton]").eq(0).click();

    // Should contain 1 like
    cy.get("button[id=likeButton]").eq(0).contains("1");
  });

  it("should be able to unlike a post", () => {
    // Start from feed page
    cy.visit("/app");

    // Like post
    cy.get("button[id=likeButton]").eq(0).click();

    // Should contain 1 like
    cy.get("button[id=likeButton]").eq(0).contains("0");
  });

  it("should be able to save a post", () => {
    // Start from feed page
    cy.visit("/app");

    // Find save button
    cy.get("button[id=saveButton]").eq(0).click();

    // View saved posts
    cy.get("button").contains("Saved").click();

    // Should be on the saved posts url
    cy.url().should("include", "/app?s=true");

    // A post containing postText random string should be present
    cy.get("p").contains(postText);
  });

  it("should be able to delete a post", () => {
    // Start from feed page
    cy.visit("/app");

    // Find delete button
    cy.get("button[id=deleteButton]").eq(0).click();

    // Post should no longer exist
    cy.get("p").contains(postText).should("not.exist");
  });
});

export {};
