describe("Notifications", () => {
  beforeEach(() => {
    // Log in before each test
    cy.auth();
  });

  it("should open the notifications sidebar", () => {
    // Start from the feed page
    cy.visit("/app");

    // Click the notifications button to open the notifications menu
    cy.get("button[id=notificationsButton]").eq(0).click({ force: true });

    // The notifications menu should now be open
    cy.get("h2", { timeout: 10000 }).contains("Notifications");
  });

  it("should give a notification when the user receives a comment on their post", () => {
    const postText = `Testing: ${Math.random().toString(36).substring(2, 8)}`;
    const commentText = `Testing: ${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    // Start from the feed page
    cy.visit("/app");

    // Post a feed item
    cy.get("textarea[id=comment]").click();
    cy.get("textarea[id=comment]").type(postText);
    cy.get(`button:contains("Post")`).eq(1).click();
    // A feed item should be posted with a random string for testing
    cy.get("p").contains(postText);
    // Post a comment
    cy.get("textarea[id=chat]").eq(0).click();
    cy.get("textarea[id=chat]").eq(0).type(commentText);
    cy.get("button").contains("Comment").click();
    // A feed comment should be posted with a random string for testing
    cy.get("p").contains(commentText);

    // Click the notifications button to open the notifications menu
    cy.get("button[id=notificationsButton]").eq(0).click({ force: true });

    // The notifications menu should now be open with a notification that a user commented on the post
    cy.get("h2")
      .contains("Notifications")
      .nextAll()
      .find("p")
      .eq(0)
      .contains("commented on your post");

    // Delete the feed item that was just posted
    cy.get(`button[title="Delete feed item"]`).eq(0).click();
    // A feed item with "This is a test post!" should be deleted
    cy.get("p", { timeout: 10000 }).contains(postText).should("not.exist");
  });

  it("should give notification when the user receives a like on their post", () => {
    const postText = `Testing: ${Math.random().toString(36).substring(2, 8)}`;

    // Start from the feed page
    cy.visit("/app");

    // Post a feed item
    cy.get("textarea[id=comment]").click();
    cy.get("textarea[id=comment]").type(postText);
    cy.get(`button:contains("Post")`).eq(1).click();
    // A feed item should be posted with a random string for testing
    cy.get("p").contains(postText);
    // Like post
    cy.get("button[id=likeButton]").eq(0).click();
    // Should contain 1 like
    cy.get("button[id=likeButton]").eq(0).contains("1");

    // Click the notifications button to open the notifications menu
    cy.get("button[id=notificationsButton]").eq(0).click({ force: true });

    // The notifications menu should now be open with a notification that a user liked the post
    cy.get("h2")
      .contains("Notifications")
      .nextAll()
      .find("p")
      .eq(0)
      .contains("liked your post");

    // Delete the feed item that was just posted
    cy.get(`button[title="Delete feed item"]`).eq(0).click();
    // A feed item with the random string for testing should be deleted
    cy.get("p", { timeout: 10000 }).contains(postText).should("not.exist");
  });
});

export {};
