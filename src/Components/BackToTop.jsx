import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa"; // npm install react-icons

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  // Show button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300); // Show after 300px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <Button onClick={scrollToTop} aria-label="Back to top">
        <FaArrowUp />
      </Button>
    )
  );
};

const Button = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #333;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 12px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background: #555;
    transform: scale(1.1);
  }
`;

export default BackToTop;
