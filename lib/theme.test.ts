import { validateTheme } from "./theme";

describe("validateTheme()", () => {
  it("returns a boolean", () => {
    expect(validateTheme("bumblebee")).to.be.a("boolean");
  });

  it("does not validate invalid themes", () => {
    expect(validateTheme("none")).to.eq(false);
  });

  it("validates a valid theme", () => {
    expect(validateTheme("bumblebee")).to.eq(true);
  });
});
