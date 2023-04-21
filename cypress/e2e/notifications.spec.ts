describe("Notifications", () => {
  beforeEach(() => {
    cy.auth();
  });

  it("should start with the notifications bar pulled out", () => {
    // Click the notifications button to open the notifications menu
    cy.get('[id="notificationsButton"]').click();
    // The notifications menu should now be open
    cy.get("h2").contains("Notifications");
  });

  it("should give a notification when someone comments on user's post", () => {
    // User posts
    cy.get("input").type("Post");
    // User should comment on user's post
    cy.get("input").type("Comment");
    // Click the notifications button to open the notifications menu
    cy.get('[id="notificationsButton"]').click();
    // Should be a notification that user commented on post
    cy.get("p").contains("commented on your post");
  });

  it("should give notification when someone likes user's post", () => {
    // User posts
    cy.get("input").type("Like post test");
    // User likes post
    cy.get('[title="Like feed item"]').click();
    // Click the notifications button to open the notifications menu
    cy.get('[id="notificationsButton"]').click();
    // Should be a notification that user liked post
    cy.get("p").contains("liked your post");
  });
});

export {};
