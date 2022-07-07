import React from 'react'

interface Props {
    quote: string;
    color: string
}

const QuoteText: React.FC<Props> = ({quote, color}) => {
    return <div className="quote-text" style={{ color: color}}>
        <span id="text">{ quote }</span>
        </div>
}

export default QuoteText