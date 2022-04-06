import type { SVGProps } from 'react';

export const LoadingBricks = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="xMidYMid"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <rect
        fill="currentColor"
        x="13"
        y="13"
        width="30"
        height="30"
        rx="100"
        ry="100"
      >
        <animate
          attributeName="x"
          dur="2s"
          repeatCount="indefinite"
          keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
          values="13;57;57;57;57;13;13;13;13"
          begin="-1.8333333333333333s"
        ></animate>
        <animate
          attributeName="y"
          dur="2s"
          repeatCount="indefinite"
          keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
          values="13;57;57;57;57;13;13;13;13"
          begin="-1.3333333333333333s"
        ></animate>
      </rect>
      <rect
        fill="currentColor"
        x="13"
        y="13"
        width="30"
        height="30"
        rx="100"
        ry="100"
      >
        <animate
          attributeName="x"
          dur="2s"
          repeatCount="indefinite"
          keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
          values="13;57;57;57;57;13;13;13;13"
          begin="-1.1666666666666667s"
        ></animate>
        <animate
          attributeName="y"
          dur="2s"
          repeatCount="indefinite"
          keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
          values="13;57;57;57;57;13;13;13;13"
          begin="-0.6666666666666666s"
        ></animate>
      </rect>
      <rect
        fill="currentColor"
        x="13"
        y="13"
        width="30"
        height="30"
        rx="100"
        ry="100"
      >
        <animate
          attributeName="x"
          dur="2s"
          repeatCount="indefinite"
          keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
          values="13;57;57;57;57;13;13;13;13"
          begin="-0.5s"
        ></animate>
        <animate
          attributeName="y"
          dur="2s"
          repeatCount="indefinite"
          keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1"
          values="13;57;57;57;57;13;13;13;13"
          begin="0s"
        ></animate>
      </rect>
    </svg>
  );
};