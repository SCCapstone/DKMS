import joinArtists from "lib/joinArtists";

describe("joinArtists()", () => {
  it("returns an empty string when no artists are available", () => {
    expect(joinArtists([])).to.eq("");
  });

  it("returns the name of the artist when one artist is available", () => {
    expect(joinArtists([{ name: "RAYE" }])).to.eq("RAYE");
  });

  it("adds an ampersand when two artists are available", () => {
    expect(joinArtists([{ name: "RAYE" }, { name: "070 Shake" }])).to.eq(
      "RAYE & 070 Shake"
    );
  });

  it("adds an ampersand and the number of additional artists when more than two artists are available", () => {
    expect(
      joinArtists([
        { name: "RAYE" },
        { name: "070 Shake" },
        { name: "Ari Lennox" },
      ])
    ).to.eq("RAYE & 2 more");

    expect(
      joinArtists([
        { name: "RAYE" },
        { name: "070 Shake" },
        { name: "Ari Lennox" },
        { name: "Jorja Smith" },
      ])
    ).to.eq("RAYE & 3 more");
  });
});
