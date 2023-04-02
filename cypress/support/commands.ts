/// <reference types="cypress" />

import { encode } from "next-auth/jwt";

import type { User } from "next-auth";

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

Cypress.Commands.add("auth", () => {
  cy.session("user.json", () => {
    const session = Cypress.env("session") as
      | {
          refreshToken: string | undefined;
          accessToken: string | undefined;
          secret: string | undefined;
        }
      | undefined;

    if (!session) {
      assert.fail("session env is not set");
    }
    const { refreshToken, accessToken, secret } = session;
    if (!accessToken) {
      assert.fail("session.accessToken is not set");
    }
    if (!refreshToken) {
      assert.fail("session.refreshToken is not set");
    }
    if (!secret) {
      assert.fail("session.secret is not set");
    }

    const accessTokenExpires = new Date().getTime() + 1000 * 60 * 60;
    cy.fixture("user.json")
      .then((user: User) =>
        encode({
          token: { user, accessToken, accessTokenExpires, refreshToken },
          secret,
        })
      )
      .then((encryptedToken) =>
        cy.setCookie("next-auth.session-token", encryptedToken)
      );
  });
  // cy.intercept("/api/auth/session", { fixture: "session.json" }).as("session");

  // // Set the cookie for cypress.
  // // It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
  // // This step can probably/hopefully be improved.
  // // We are currently unsure about this part.
  // // We need to refresh this cookie once in a while.
  // // We are unsure if this is true and if true, when it needs to be refreshed.

  // cy.setCookie(
  //   "next-auth.session-token",
  //   "BQBUmkei5cHEJoAsQn-xOGPL81MY-fiRzDrXut0wPf4sn_Jec5t8UuHqiOA6GInaAZDSu_ivGJHm4mSJPRdP_hIgtgiLc6vKLG02fzKZlz0uZBIoVCksANw0Uneq671j0m326L1MFJMfFaFhwuGWmWCpNisTU6BEuubVVJ29KeRSFugYKUFPBfF_5jVuL5aP8tjEl0tb817H5iFlIhoorHrJQu5gjzeox8lOUKn85LOoihY9L7M6CbeRJlm27IPaY_Nr8w",
  //   {
  //     domain: "localhost",
  //     path: "/",
  //     httpOnly: true,
  //     sameSite: "lax",
  //     expiry: 3000000000,
  //   }
  // );
});

Cypress.Commands.add("envLogin", () => {
  const credentials = Cypress.env("credentials") as
    | {
        email: string | undefined;
        password: string | undefined;
      }
    | undefined;
  if (!credentials) {
    assert.fail("credentials env is not set");
  }
  const { email, password } = credentials;
  if (!email) {
    assert.fail("credentials.email is not set");
  }
  if (!password) {
    assert.fail("credentials.password is not set");
  }

  cy.login(email, password);
});

Cypress.Commands.add("login", (email, pw) => {
  cy.session([email, pw], () => {
    cy.visit("/api/auth/signin/spotify");

    cy.get("button").click();

    const args = { username: email, password: pw };
    cy.origin("accounts.spotify.com", { args }, ({ username, password }) => {
      cy.get("input#login-username").click();
      cy.get("input#login-username").type(username);
      cy.get("input#login-password").click();
      cy.get("input#login-password").type(password);
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
       * Create a next-auth session cookie.
       *
       * This is recommended for all tests that require a logged in user.
       */
      auth(): Chainable<JQuery>;

      /**
       * Log in to Spotify using the provided credentials
       * and store the session data.
       *
       * NOTE: This command is not recommended for CI use, because
       * Spotify will block the account if it is used too many times.
       *
       * @param email Spotify email
       * @param password Spotify password
       * @example cy.login('email', 'password');
       */
      login(email: string, password: string): Chainable<JQuery>;

      /**
       * Log in to Spotify using environment variables.
       *
       * NOTE: This command is not recommended for CI use, because
       * Spotify will block the account if it is used too many times.
       *
       * This command requires the following environment variables to be set:
       * - `credentials.username`
       * - `credentials.password`
       *
       * @example cy.envLogin();
       *
       */
      envLogin(): Chainable<JQuery>;

      /**
       * Log out of Spotify and clear the session data.
       * @example cy.logout();
       */
      logout(): Chainable<JQuery>;

      /**
       * Navigate to a page by clicking on the menu bar.
       * @param page Text to click on
       * @example cy.navbarClick('Profile');
       */
      navbarClick(page: string): Chainable<JQuery>;
    }
  }
}
