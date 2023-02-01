/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("envLogin", () => {
  const username: unknown = Cypress.env("CYPRESS_SPOTIFY_USER");
  const password: unknown = Cypress.env("CYPRESS_SPOTIFY_PW");

  if (typeof username !== "string") {
    assert.fail("CYPRESS_SPOTIFY_USER is not set");
  }

  if (typeof password !== "string") {
    assert.fail("CYPRESS_SPOTIFY_PW is not set");
  }

  cy.login(username, password);
});

Cypress.Commands.add("login", (user, pw) => {
  cy.session([user, pw], () => {
    cy.visit("/api/auth/signin/spotify");

    cy.get("button").click();

    const args = { username: user, password: pw };
    cy.origin("accounts.spotify.com", { args }, ({ username, password }) => {
      cy.get("input#login-username").click().type(username);
      cy.get("input#login-password").click().type(password);
      cy.get("#login-button").click();
    });
    cy.getCookie("next-auth.session-token").should("exist");
  });
});

Cypress.Commands.add("logout", () => {
  cy.visit("/api/auth/signout");
  cy.get("button").contains("Sign out").click();
});

Cypress.Commands.add("navbarClick", (page) => {
  cy.get("nav").children().contains(page).click();
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Chainable {
      /**
       * Custom command to log in to Spotify and store the session data.
       * @param username Spotify username
       * @param password Spotify password
       * @example cy.login('username', 'password');
       */
      login(username: string, password: string): Chainable<JQuery>;

      /**
       * Custom command to log in to Spotify using environment variables.
       * @example cy.envLogin();
       */
      envLogin(): Chainable<JQuery>;

      /**
       * Custom command to log out of Spotify and clear the session data.
       * @example cy.logout();
       */
      logout(): Chainable<JQuery>;

      /**
       * Custom command to navigate to a page by clicking on the menu bar.
       * @param page Text to click on
       * @example cy.navbarClick('Profile');
       */
      navbarClick(page: string): Chainable<JQuery>;
    }
  }
}

// Prevent TypeScript from reading file as legacy script
export {};
