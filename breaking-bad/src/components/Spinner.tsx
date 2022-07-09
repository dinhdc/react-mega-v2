import React from "react";
import spinner from "../images/spinner.gif";
interface Props {}

const Spinner: React.FC<Props> = () => {
    return <img src={spinner} alt="" style={{
        width: "200px",
        margin: "auto",
        display: "block"
  }} />;
};

export default Spinner;
