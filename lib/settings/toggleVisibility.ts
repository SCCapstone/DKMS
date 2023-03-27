import type { User } from "next-auth";

const toggleVisibility = (previousVisibility: User["visibility"]) =>
  previousVisibility === "public" ? "private" : "public";

export default toggleVisibility;
