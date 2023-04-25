import type { User } from "next-auth";

/**
 * Changes visibility setting for user
 *
 * @param previousVisibility previous privacy setting for user
 */
const toggleVisibility = (previousVisibility: User["visibility"]) =>
  previousVisibility === "public" ? "private" : "public";

export default toggleVisibility;
