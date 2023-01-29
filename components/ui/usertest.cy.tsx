import UsernameLink from "./UsernameLink";

describe("UsernameLink component", () => {
  it("renders a link with the correct href and children", () => {
    const username = "johndoe";
    cy.mount(<UsernameLink username={username}>John Doe</UsernameLink>);
    cy.get("a.link")
      .should("have.attr", "href", `/profile/${username}`)
      .and("have.text", "John Doe");
  });

  it("renders a link with the correct href and default text", () => {
    const username = "janedoe";
    cy.mount(<UsernameLink username={username} />);
    cy.get("a.link")
      .should("have.attr", "href", `/profile/${username}`)
      .and("have.text", username);
  });
});
