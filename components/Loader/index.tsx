"use client";

import { PulseLoader } from "react-spinners";

export function Loader({ size = 15 }: { size?: number }) {
  return (
    <PulseLoader
      loading
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
