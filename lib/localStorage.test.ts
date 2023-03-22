/* eslint-disable no-unused-expressions */
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "./localStorage";

describe("setLocalStorage()", () => {
  it("sets the value", () => {
    setLocalStorage("foo", "bar");
    expect(localStorage.getItem("foo")).to.eq('"bar"');
  });

  it("sets an object", () => {
    setLocalStorage("foo", { bar: "baz" });
    expect(localStorage.getItem("foo")).to.eq('{"bar":"baz"}');
  });
});

describe("getLocalStorage()", () => {
  it("returns null when the key is not set", () => {
    expect(getLocalStorage("foo")).to.be.null;
  });

  it("returns the value when the key is set", () => {
    setLocalStorage("foo", "bar");
    expect(getLocalStorage("foo")).to.eq("bar");
  });

  it("returns an object when the key is set", () => {
    setLocalStorage("foo", { bar: "baz" });
    expect(getLocalStorage("foo")).to.deep.eq({ bar: "baz" });
  });

  it("skips parsing when skipParsing is true", () => {
    setLocalStorage("foo", { bar: "baz" });
    expect(getLocalStorage("foo", true)).to.eq('{"bar":"baz"}');
  });
});

describe("removeLocalStorage()", () => {
  it("removes the item", () => {
    setLocalStorage("foo", "bar");
    removeLocalStorage("foo");
    expect(localStorage.getItem("foo")).to.be.null;
  });
});
