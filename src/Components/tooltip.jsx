// Tooltip.jsx
import React from "react";
import styled from "styled-components";

const Tooltip = ({ children, message }) => {
  return (
    <StyledWrapper className="tooltip-container">
      {children}
      <div className="tooltip">{message}</div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  .tooltip {
    position: absolute;
    top: 100%; /* show tooltip below */
    left: 50%;
    transform: translateX(-50%) translateY(-10px) rotateX(90deg);
    transform-origin: top center;
    opacity: 0;
    pointer-events: none;
    background: #ff914d;
    color: white;
    padding: 0.4em 0.8em;
    border-radius: 0.25rem;
    font-size: 13px;
    white-space: nowrap;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 1000;
  }

  &:hover .tooltip {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0) rotateX(0deg);
  }
`;

export default Tooltip;
