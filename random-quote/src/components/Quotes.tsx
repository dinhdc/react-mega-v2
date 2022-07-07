import React, { useEffect, useState } from "react";
import QuoteText from "./QuoteText";
import QuoteAuthor from "./QuoteAuthor";
import Button from "./Button";
import axios from "axios";
import "./Quotes.css";
interface Props {}

const Quotes: React.FC<Props> = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [quotes, setQuotes] = useState<
    Array<{ quote: string; author: string }>
  >([]);
  const [color, setColor] = useState("rgb(243, 156, 18)");

  useEffect(() => {
    if (quotes.length > 0) {
      return;
    } else {
      fetchQuote();
    }
  }, []);

  const fetchQuote = () => {
    axios
      .get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      )
      .then((res) => {
        const quotesResponse = [...res.data.quotes];
        const color = randomColor();
        document.body.style.color = color;
        document.body.style.backgroundColor = color;
        setQuotes(quotesResponse);
        setColor(color);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = () => {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    let randomQuote = quotes[randomIndex];
    const color = randomColor();
    document.body.style.color = color;
    document.body.style.backgroundColor = color;
    setAuthor(randomQuote.author);
    setQuote(randomQuote.quote);
    setColor(color);
  };

  const randomColor = () => {
    let colorPatterns = "1234567890abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color =
        color + colorPatterns[Math.floor(Math.random() * colorPatterns.length)];
    }
    return color;
  };

  return (
    <div id="quote-box">
      <QuoteText quote={quote} color={color} />
      <QuoteAuthor author={author} color={color} />
      <Button handleClick={handleClick} color={color} quote={quote} author={author} />
    </div>
  );
};

export default Quotes;
