import React from "react";

import UsernameLink from "./UsernameLink";

describe("<UsernameLink />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UsernameLink username="test" />);
  });
});
