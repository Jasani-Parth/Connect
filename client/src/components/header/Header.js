import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";

import companyLogo from "../../images/logo.png";
import companyLogoText from "../../images/logo_Text.png";


const Header = () => {
  return (
    <div className="company_header">
        
            <div className="header_branding" onClick={()=>window.scrollTo({top:0})}>
              <div className="company_logo">
              <Link to={`/`}>
                <img src={companyLogo} alt="Logo"></img>
                </Link>
              </div>
              <div className="company_logo_text">
              <Link to={`/`}>
                <img src={companyLogoText} alt="Logo"></img>
              </Link>
              </div>
            </div>
        
        <div className="header_search">
          <Search />
          <Menu />
        </div>
    </div>
  );
};

export default Header;
