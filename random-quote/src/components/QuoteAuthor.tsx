import React from "react";

interface Props {
  author: string;
  color: string;
}

const QuoteAuthor: React.FC<Props> = ({ author, color }) => {
  return (
    <div className="quote-author" style={{ color: color }}>
      <span id="author">{author}</span>
    </div>
  );
};

export default QuoteAuthor;
