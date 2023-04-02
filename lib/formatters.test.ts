import {
  formatNumber,
  formatDuration,
  capitalize,
  formatDate,
} from "./formatters";

describe("formatNumber()", () => {
  it("does not return a number", () => {
    expect(formatNumber(1000)).to.not.be.a("number");
  });

  it("does not format small numbers", () => {
    expect(formatNumber(999)).to.eq("999");
  });

  it("adds a K to numbers over 1,000 and less than 1,000,000", () => {
    expect(formatNumber(1000)).to.eq("1.0k");
  });

  it("rounds numbers over 1,000 and less than 1,000,000", () => {
    expect(formatNumber(1001)).to.eq("1.0k");
    expect(formatNumber(1300)).to.eq("1.3k");
    expect(formatNumber(1999)).to.eq("2.0k");
  });

  it("adds a M to numbers over 1,000,000 and less than 1,000,000,000", () => {
    expect(formatNumber(1000000)).to.eq("1.0m");
  });

  it("rounds numbers over 1,000 and less than 1,000,000", () => {
    expect(formatNumber(1001000)).to.eq("1.0m");
    expect(formatNumber(1300000)).to.eq("1.3m");
    expect(formatNumber(1999000)).to.eq("2.0m");
  });

  it("adds a B to numbers over 1,000,000,000", () => {
    expect(formatNumber(1000000000)).to.eq("1.0b");
  });

  it("rounds numbers over 1,000 and less than 1,000,000", () => {
    expect(formatNumber(1001000000)).to.eq("1.0b");
    expect(formatNumber(1300000000)).to.eq("1.3b");
    expect(formatNumber(1999000000)).to.eq("2.0b");
  });
});

describe("formatDuration()", () => {
  it("does not return a number", () => {
    expect(formatDuration(1000)).to.not.be.a("number");
  });

  it("returns a string", () => {
    expect(formatDuration(1000)).to.be.a("string");
  });

  it("returns a duration in minutes:seconds", () => {
    expect(formatDuration(1000)).to.eq("0:01");
    expect(formatDuration(60000)).to.eq("1:00");
    expect(formatDuration(61000)).to.eq("1:01");
  });

  it("returns a duration over 1 hour in hours:minutes:seconds", () => {
    expect(formatDuration(3600000)).to.eq("1:00:00");
    expect(formatDuration(3660000)).to.eq("1:01:00");
    expect(formatDuration(3661000)).to.eq("1:01:01");
    expect(formatDuration(36610000)).to.eq("10:10:10");
  });
});

describe("capitalize()", () => {
  it("returns a string", () => {
    expect(capitalize("hello")).to.be.a("string");
  });

  it("capitalizes the first letter of a string", () => {
    expect(capitalize("hello")).to.eq("Hello");
  });

  it("does not change the first letter of a string if it is already capitalized", () => {
    expect(capitalize("Hello")).to.eq("Hello");
  });

  it("does not change the rest of the string", () => {
    expect(capitalize("hello world")).to.eq("Hello world");
  });
});

describe("formatDate()", () => {
  it("does not return a number", () => {
    expect(formatDate("2021-04-25T17:19:15Z")).to.not.be.a("number");
  });

  it("returns a string", () => {
    expect(formatDate("2021-04-25T17:19:15Z")).to.be.a("string");
  });

  it("returns a date in month/day/year", () => {
    expect(formatDate("2021-04-25T17:19:15Z")).to.eq("04/25/2021");
    expect(formatDate("2016-03-17T07:22:32Z")).to.eq("03/17/2016");
    expect(formatDate("2007-12-18T01:43:11Z")).to.eq("12/18/2007");
  });
});
