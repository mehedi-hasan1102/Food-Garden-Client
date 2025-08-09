
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa"; 

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Watch for dark mode changes
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme(); // check on mount
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <Button
        onClick={scrollToTop}
        aria-label="Back to top"
        $dark={isDark}
      >
        <FaArrowUp />
      </Button>
    )
  );
};

const Button = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: ${({ $dark }) => ($dark ? "#222" : "#f5f5f5")};
  color: ${({ $dark }) => ($dark ? "#fff" : "#000")};
  border: none;
  border-radius: 50%;
  padding: 12px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background: ${({ $dark }) => ($dark ? "#444" : "#ddd")};
    transform: scale(1.1);
  }
`;

export default BackToTop;
