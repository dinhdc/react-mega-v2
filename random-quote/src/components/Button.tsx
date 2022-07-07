import React from "react";

interface Props {
  handleClick: () => void;
  color: string;
  author: string;
  quote: string;
}

const Button: React.FC<Props> = (props) => {
  return (
    <div className="buttons">
      <button
        style={{ color: "white", backgroundColor: props.color }}
              className="button"
              onClick={props.handleClick}
      >
        New Quote
      </button>
    </div>
  );
};

export default Button;
