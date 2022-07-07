import React from "react";

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <div id="footer">
      <span>by</span>
      <a href="https://github.com/dinhdc" rel="noopener noreferrer">
        GitHub
      </a>
    </div>
  );
};

export default Footer;
