import ArtistLinks from "./ArtistLinks";

describe("<ArtistLinks />", () => {
  it("renders null when no artists are provided", () => {
    cy.mount(<ArtistLinks artists={undefined} />);

    cy.get("a").should("not.exist");
  });

  it("renders null when an empty array is provided", () => {
    cy.mount(<ArtistLinks artists={[]} />);

    cy.get("a").should("not.exist");
  });

  it("renders a single artist when one artist is available", () => {
    cy.mount(
      <ArtistLinks
        artists={[
          {
            id: "5KKpBU5eC2tJDzf0wmlRp2",
            name: "RAYE",
          },
        ]}
      />
    );

    cy.get("a").should("have.length", 1);
    cy.get("a").should("have.text", "RAYE");
    cy.get("a").should("have.attr", "href", "/artist/5KKpBU5eC2tJDzf0wmlRp2");
  });

  it("renders two artists when two artists are available", () => {
    cy.mount(
      <ArtistLinks
        artists={[
          {
            id: "5KKpBU5eC2tJDzf0wmlRp2",
            name: "RAYE",
          },
          {
            id: "12Zk1DFhCbHY6v3xep2ZjI",
            name: "070 Shake",
          },
        ]}
      />
    );

    cy.get("a").should("have.length", 2);
    cy.get("a").eq(0).should("have.text", "RAYE");
    cy.get("a")
      .eq(0)
      .should("have.attr", "href", "/artist/5KKpBU5eC2tJDzf0wmlRp2");
    cy.get("a").eq(1).should("have.text", "070 Shake");
    cy.get("a")
      .eq(1)
      .should("have.attr", "href", "/artist/12Zk1DFhCbHY6v3xep2ZjI");
  });

  it("renders three artists when three artists are available", () => {
    cy.mount(
      <ArtistLinks
        artists={[
          {
            id: "5KKpBU5eC2tJDzf0wmlRp2",
            name: "RAYE",
          },
          {
            id: "12Zk1DFhCbHY6v3xep2ZjI",
            name: "070 Shake",
          },
          {
            id: "1vaQ6v3pOFxAIrFoPrAcom",
            name: "Ari Lennox",
          },
        ]}
      />
    );

    cy.get("a").should("have.length", 3);
    cy.get("a").eq(0).should("have.text", "RAYE");
    cy.get("a")
      .eq(0)
      .should("have.attr", "href", "/artist/5KKpBU5eC2tJDzf0wmlRp2");
    cy.get("a").eq(1).should("have.text", "070 Shake");
    cy.get("a")
      .eq(1)
      .should("have.attr", "href", "/artist/12Zk1DFhCbHY6v3xep2ZjI");
    cy.get("a").eq(2).should("have.text", "Ari Lennox");
    cy.get("a")
      .eq(2)
      .should("have.attr", "href", "/artist/1vaQ6v3pOFxAIrFoPrAcom");
  });

  it("renders an artist and an additional artist count when more than three artists are available", () => {
    cy.mount(
      <ArtistLinks
        artists={[
          {
            id: "5KKpBU5eC2tJDzf0wmlRp2",
            name: "RAYE",
          },
          {
            id: "12Zk1DFhCbHY6v3xep2ZjI",
            name: "070 Shake",
          },
          {
            id: "1vaQ6v3pOFxAIrFoPrAcom",
            name: "Ari Lennox",
          },
          {
            id: "1CoZyIx7UvdxT5c8UkMzHd",
            name: "Jorja Smith",
          },
        ]}
      />
    );

    cy.get("a").should("have.length", 4);
    cy.get("a").eq(0).should("have.text", "RAYE");
    cy.get("a")
      .eq(0)
      .should("have.attr", "href", "/artist/5KKpBU5eC2tJDzf0wmlRp2");

    cy.get("button").should("have.text", "3 more");
  });

  it("removes duplicate artists", () => {
    cy.mount(
      <ArtistLinks
        artists={[
          {
            id: "5KKpBU5eC2tJDzf0wmlRp2",
            name: "RAYE",
          },
          {
            id: "5KKpBU5eC2tJDzf0wmlRp2",
            name: "RAYE",
          },
        ]}
      />
    );

    cy.get("a").should("have.length", 1);
    cy.get("a").should("have.text", "RAYE");
    cy.get("a").should("have.attr", "href", "/artist/5KKpBU5eC2tJDzf0wmlRp2");
  });
});
