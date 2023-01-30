import { formatFollowers } from "./formatters";

describe("formatFollowers()", () => {
  it("does not return a number", () => {
    expect(formatFollowers(1000)).to.not.be.a("number");
  });

  it("does not format small numbers", () => {
    expect(formatFollowers(999)).to.eq("999");
  });

  it("adds a K to numbers over 1,000 and less than 1,000,000", () => {
    expect(formatFollowers(1000)).to.eq("1.0k");
  });

  it("rounds numbers over 1,000 and less than 1,000,000", () => {
    expect(formatFollowers(1001)).to.eq("1.0k");
    expect(formatFollowers(1300)).to.eq("1.3k");
    expect(formatFollowers(1999)).to.eq("2.0k");
  });

  it("adds a M to numbers over 1,000,000 and less than 1,000,000,000", () => {
    expect(formatFollowers(1000000)).to.eq("1.0m");
  });

  it("rounds numbers over 1,000 and less than 1,000,000", () => {
    expect(formatFollowers(1001000)).to.eq("1.0m");
    expect(formatFollowers(1300000)).to.eq("1.3m");
    expect(formatFollowers(1999000)).to.eq("2.0m");
  });

  it("adds a B to numbers over 1,000,000,000", () => {
    expect(formatFollowers(1000000000)).to.eq("1.0b");
  });

  it("rounds numbers over 1,000 and less than 1,000,000", () => {
    expect(formatFollowers(1001000000)).to.eq("1.0b");
    expect(formatFollowers(1300000000)).to.eq("1.3b");
    expect(formatFollowers(1999000000)).to.eq("2.0b");
  });
});
