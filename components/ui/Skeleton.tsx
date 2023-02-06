"use client";

// We have to do this because the react-loading-skeleton package
// doesn't have a client directive.
// https://beta.nextjs.org/docs/rendering/server-and-client-components#third-party-packages
import Skeleton from "react-loading-skeleton";

export default Skeleton;
