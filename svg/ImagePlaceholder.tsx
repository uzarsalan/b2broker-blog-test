import * as React from "react";
export const ImagePlaceholder = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    viewBox="0 0 120 120"
    {...props}
  >
    <path fill="#EFF1F3" d="M0 0h120v120H0z" />
    <path
      fill="#687787"
      fillRule="evenodd"
      d="M33.25 38.482a2.625 2.625 0 0 1 2.604-2.607h47.292a2.606 2.606 0 0 1 2.604 2.607v42.036a2.625 2.625 0 0 1-2.604 2.607H35.854a2.607 2.607 0 0 1-2.604-2.607V38.482Zm47.25 2.643h-42v36.75l24.392-24.397a2.625 2.625 0 0 1 3.712 0L80.5 67.401V41.125Zm-36.75 10.5a5.25 5.25 0 1 0 10.5 0 5.25 5.25 0 0 0-10.5 0Z"
      clipRule="evenodd"
    />
  </svg>
);
