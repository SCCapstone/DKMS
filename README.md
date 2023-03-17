# DKMS Spotify

[![Powered by Vercel](https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg)](https://vercel.com?utm_source=dkms&utm_campaign=oss)

DKMS is a social media-focused web application for Spotify. This [application](https://github.com/SCCapstone/DKMS/wiki/Project-Description) consists of a centralized feed where users can post, share, and comment with other users. Additionally, a personized profile page will enhance the user interaction experience. This application uses Spotify's Web API to build and pull data, as well as to authenticate users. DKMS is built using Next and React.

## External Requirements

In order to build this project you first have to install:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com)

The recommended way to get started is to use [Volta](https://volta.sh) to install both Node and Yarn.

## Setup

To install all dependencies, clone the repository and run:

```zsh
yarn install
```

This will also configure Husky, used to run pre-commit checks.

### Environment Variables

Two environment variable files are required:

- `.env` — for all public environment variables
  - `SPOTIFY_CLIENT_ID`
  - `NEXTAUTH_URL`
- `.env.local` — for all private env secrets
  - `NEXTAUTH_SECRET`
  - `SPOTIFY_CLIENT_SECRET`
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_CLIENT_EMAIL`
  - `FIREBASE_PRIVATE_KEY`

For more information about environment variable files, see https://nextjs.org/docs/basic-features/environment-variables.

## Running

To run the repo in development mode, do:

```zsh
yarn dev
```

To build and start in production mode, do:

```zsh
yarn build && yarn start
```

# Deployment

The recommended way to deploy this app is by using a cloud deployment platform such as [Vercel](https://vercel.com). Manual deployment instructions can be found on the Next.js website: https://nextjs.org/docs/deployment.

# Testing

## Testing Technology

Cypress is used for E2E behavior specifications, individual component testing, and functional unit testing.

The component and unit tests use the regex `**/*.test.{ts,tsx}`.
The beavior specs are located in `/cypress/e2e` and use the regex `**/*.spec.{ts,tsx}`.

Make sure to run 'yarn install' before testing.

## Running Tests

To start the Cypress test suite main menu, run:

```zsh
yarn test
```

The browser and type of test can be selected visually. For a shortcut to a specific type of test, see below:

### Component & Unit

To start component or unit tests, run:

```zsh
yarn test:component
```

A browser will open with an interactive list of tests to run.

### Behavior (E2E)

To start E2E tests, first start a production instance of the server:

```zsh
yarn build && yarn start
```

In a separate window, run:

```zsh
yarn test:e2e
```

# Authors

- Dalton Craven daltoncraven@proton.me
- Sophie Crane sophieccrane@gmail.com
- Kevin Nguyen kevin.nguyen423@gmail.com
- Mason Joseph masondj1029@gmail.com
- Clay Crews claycrews2002@gmail.com
