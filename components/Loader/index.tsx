"use client";

import { PulseLoader } from "react-spinners";

export function Loader() {
  return (
    <PulseLoader
      loading
      size={15}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
