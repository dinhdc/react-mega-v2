import React from "react";
import logo from "../images/logo.png";
interface Props {
}

const Navbar: React.FC<Props> = () => {
    return <div>
      <img src={logo} alt="Logo" />
  </div>;
};

export default Navbar;
