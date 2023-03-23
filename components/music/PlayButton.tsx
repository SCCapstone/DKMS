"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PlayButton = ({ filled = false }: { filled?: boolean }) => {
  const [state, setState] = useState(filled);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("play change");
  }, [state]);

  const onClick = () => {
    if (!state) {
      setState(true);
    } else {
      setState(false);
    }
  };

  if (state) {
    return (
      <svg
        onClick={onClick}
        fill="black"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 5.49686C3 3.17662 5.52116 1.73465 7.52106 2.91106L18.5764 9.41423C20.5484 10.5742 20.5484 13.4259 18.5764 14.5858L7.52106 21.089C5.52116 22.2654 3 20.8234 3 18.5032V5.49686Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      onClick={onClick}
      fill="#1ED760"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 5.49686C3 3.17662 5.52116 1.73465 7.52106 2.91106L18.5764 9.41423C20.5484 10.5742 20.5484 13.4259 18.5764 14.5858L7.52106 21.089C5.52116 22.2654 3 20.8234 3 18.5032V5.49686Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlayButton;
