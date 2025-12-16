import React from "react";
import styled from "styled-components";

const Switch = () => {
  const handleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <StyledWrapper>
      <input
        id="checkbox-input"
        type="checkbox"
        onChange={handleTheme}
      />

      <label className="switch" htmlFor="checkbox-input">
        <span className="icon">
          🌙
        </span>
        <span className="icon light">
          ☀️
        </span>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  #checkbox-input {
    display: none;
  }

  .switch {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 1.5rem;
    transition: all 0.3s ease;
  }

  .switch:hover {
    transform: scale(1.1);
  }

  .icon.light {
    display: none;
  }

  #checkbox-input:checked + .switch .icon {
    display: none;
  }

  #checkbox-input:checked + .switch .icon.light {
    display: inline;
  }
`;

export default Switch;
