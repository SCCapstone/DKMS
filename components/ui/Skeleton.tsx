"use client";

/**
 * We have to do this because the react-loading-skeleton package
 * doesn't have a client directive.
 *
 * @see https://beta.nextjs.org/docs/rendering/server-and-client-components#third-party-packages
 * @see https://github.com/dvtng/react-loading-skeleton/pull/162
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import Skeleton from "react-loading-skeleton";

export default Skeleton;
