describe("Share Music to Feed", () => {
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

  it("should search and share an album to feed", () => {
    // Start from the search page
    cy.visit("/app/search");
    // Search for an artist
    cy.get("input").type("Nirvana");

    cy.get("button").contains("Search").click();

    // The search results should contain a link with "Nirvana"
    cy.get("a").contains("Nirvana");
    cy.url().should("include", "/search?q=Nirvana");

    // Share the album to feed
    cy.get(`button[title="Share to feed"]`).eq(0).click();
    // Add text to the post
    cy.get("textarea[id=comment]").click();
    cy.get("textarea[id=comment]").type("Sharing an album to feed! TEST");

    cy.get("button").contains("Share").click();

    // Visit feed page to view post
    cy.visit("/app");
    cy.reload();

    // A feed item with the text "Sharing an album to feed! TEST" should be present
    cy.get("p").contains("Sharing an album to feed! TEST");

    // A feed item with a card with the album information should be present
    cy.get('div[class*="card"]').find("img").eq(0).click();
    // The url should be on the album's page
    cy.url().should("include", "/album");

    // Visit the feed page
    cy.visit("/app");
    // Delete the feed item that was just posted
    cy.get(`button[title="Delete feed item"]`).eq(0).click();
    // A feed item with "Sharing an album to feed! TEST" should be deleted
    cy.contains("Sharing an album to feed! TEST").should("not.exist");
  });

  it("should search and share an artist to feed", () => {
    // Start from the search page
    cy.visit("/app/search");
    // Search for an artist
    cy.get("input").type("Nirvana");

    cy.get("button").contains("Search").click();

    // The search results should contain a link with "Nirvana"
    cy.get("a").contains("Nirvana");
    cy.url().should("include", "/search?q=Nirvana");

    // Share the artist to feed
    cy.get(`button[title="Share to feed"]`).eq(4).click();
    // Add text to the post
    cy.get("textarea[id=comment]").click();
    cy.get("textarea[id=comment]").type("Sharing an artist to feed! TEST");

    cy.get("button").contains("Share").click();

    // Visit feed page to view post
    cy.visit("/app");
    cy.reload();

    // A feed item with the text "Sharing an artist to feed! TEST" should be present
    cy.get("p").contains("Sharing an artist to feed! TEST");

    // A feed item with a card with the artist information should be present
    cy.get('div[class*="card"]').find("img").eq(0).click();
    // The url should be on the artist's page
    cy.url().should("include", "/artist");

    // Visit the feed page
    cy.visit("/app");
    // Delete the feed item that was just posted
    cy.get(`button[title="Delete feed item"]`).eq(0).click();
    // A feed item with "Sharing an artist to feed! TEST" should be deleted
    cy.contains("Sharing an artist to feed! TEST").should("not.exist");
  });

  it("should search and share a track to feed", () => {
    // Start from the search page
    cy.visit("/app/search");
    // Search for an artist
    cy.get("input").type("Nirvana");

    cy.get("button").contains("Search").click();

    // The search results should contain a link with "Nirvana"
    cy.get("a").contains("Nirvana");
    cy.url().should("include", "/search?q=Nirvana");

    // Share the track to feed
    cy.get(`button[title="Share to feed"]`).eq(8).click();
    // Add text to the post
    cy.get("textarea[id=comment]").click();
    cy.get("textarea[id=comment]").type("Sharing a track to feed! TEST");

    cy.get("button").contains("Share").click();

    // Visit feed page to view post
    cy.visit("/app");
    cy.reload();

    // A feed item with the text "Sharing a track to feed! TEST" should be present
    cy.get("p").contains("Sharing a track to feed! TEST");

    // A feed item with a card with the track information should be present
    cy.get('div[class*="card"]').find("img").eq(0).click();
    // The url should be on the track's page
    cy.url().should("include", "/track");

    // Visit the feed page
    cy.visit("/app");
    // Delete the feed item that was just posted
    cy.get(`button[title="Delete feed item"]`).eq(0).click();
    // A feed item with "Sharing a track to feed! TEST" should be deleted
    cy.contains("Sharing a track to feed! TEST").should("not.exist");
  });

  it("should search and share a playlist to feed", () => {
    // Start from the search page
    cy.visit("/app/search");
    // Search for an artist
    cy.get("input").type("Nirvana");

    cy.get("button").contains("Search").click();

    // The search results should contain a link with "Nirvana"
    cy.get("a").contains("Nirvana");
    cy.url().should("include", "/search?q=Nirvana");

    // Share the playlist to feed
    cy.get(`button[title="Share to feed"]`).eq(12).click();
    // Add text to the post
    cy.get("textarea[id=comment]").click();
    cy.get("textarea[id=comment]").type("Sharing a playlist to feed! TEST");

    cy.get("button").contains("Share").click();

    // Visit feed page to view post
    cy.visit("/app");
    cy.reload();

    // A feed item with the text "Sharing a playlist to feed! TEST" should be present
    cy.get("p").contains("Sharing a playlist to feed! TEST");

    // A feed item with a card with the playlist information should be present
    cy.get('div[class*="card"]').find("img").eq(0).click();
    // The url should be on the playlist's page
    cy.url().should("include", "/playlist");

    // Visit the feed page
    cy.visit("/app");
    // Delete the feed item that was just posted
    cy.get(`button[title="Delete feed item"]`).eq(0).click();
    // A feed item with "Sharing a playlist to feed! TEST" should be deleted
    cy.contains("Sharing a playlist to feed! TEST").should("not.exist");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
