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
    cy.get("h2").contains("Notifications");
  });

  it("should give a notification when the user receives a comment on their post", () => {
    // Start from the feed page
    cy.visit("/app");

    // Post a feed item
    cy.get("textarea[id=comment]").click();
    cy.get("textarea[id=comment]").type("This is a test post!");
    cy.get(`button:contains("Post")`).eq(1).click();
    // A feed item should be posted with "This is a test post!"
    cy.get("p").contains("This is a test post!");
    // Post a comment
    cy.get("textarea[id=chat]").eq(0).click();
    cy.get("textarea[id=chat]").eq(0).type("Test Comment");
    cy.get("button").contains("Comment").click();
    // A feed comment should be posted with "Test Comment"
    cy.get("p").contains("Test Comment");

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
    cy.contains("This is a test post!").should("not.exist");
  });

  it("should give notification when the user receives a like on their post", () => {
    // Start from the feed page
    cy.visit("/app");

    // Post a feed item
    cy.get("textarea[id=comment]").click();
    cy.get("textarea[id=comment]").type("This is a test post!");
    cy.get(`button:contains("Post")`).eq(1).click();
    // A feed item should be posted with "This is a test post!"
    cy.get("p").contains("This is a test post!");
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
    // A feed item with "This is a test post!" should be deleted
    cy.contains("This is a test post!").should("not.exist");
  });
});

export {};
