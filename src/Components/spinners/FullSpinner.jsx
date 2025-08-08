import React from "react";
import { FadeLoader } from "react-spinners";

export default function FullSpinner() {
  return (
    <div>
      <FadeLoader
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
