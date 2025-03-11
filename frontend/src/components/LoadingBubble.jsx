import React from "react";

/**
 * LoadingBubble displays three animated dots to indicate that the assistant is "thinking".
 *
 * @returns {JSX.Element} A container with animated dots.
 */
const LoadingBubble = () => {
  return (
    <div className="loading-bubble">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default LoadingBubble;
