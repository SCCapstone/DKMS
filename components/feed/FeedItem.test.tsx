import { Timestamp } from "firebase/firestore";

import FeedItem from "./FeedItem";

describe("<FeedItem />", () => {
  it("does not render delete button when logged in user does not equal user that posted", () => {
    cy.mount(
      <FeedItem
        data={{
          id: "1",
          username: "sophie-saffron",
          comments: [],
          userId: "sophie",
          likedIds: [],
          timestamp: Timestamp.fromMillis(10000),
          content: "Post",
        }}
        currentUser={{
          id: "2",
          username: "cravend",
          name: "Dalton",
          visibility: "public",
          product: "premium",
        }}
        showLink
      />
    );
    cy.get('[id="deleteButton"]').should("not.exist");
  });

  it("renders delete button when logged in user equals posting user", () => {
    cy.mount(
      <FeedItem
        data={{
          id: "1",
          username: "sophie-saffron",
          comments: [],
          userId: "sophie",
          likedIds: [],
          timestamp: Timestamp.fromMillis(10000),
          content: "Post",
        }}
        currentUser={{
          id: "1",
          username: "sophie-saffron",
          name: "Sophie",
          visibility: "public",
          product: "premium",
        }}
        showLink
      />
    );
    cy.get('[id="deleteButton"]').should("exist");
  });
});
