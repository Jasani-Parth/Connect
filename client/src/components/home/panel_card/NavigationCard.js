import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavigationCard = () => {
    const navLinks = [
        { label: "Home", icon: "home",   path: "/" },
        { label: "Message", icon: "near_me", path: "/message" },
        { label: "Discover", icon: "explore", path: "/discover" },
        { label: "Notify", icon: "favorite",  path: "/notify" },
        { label: "Settings", icon: "settings",  path: "/settings" }
      ];

      const { pathname } = useLocation();

      const isActive = (pn) => {
        if (pn === pathname) return "active";
      };

      const isActiveBool = (pn) => {
        if (pn === pathname) return true;
      };

  return (
    <div className='navigation_card'>
    
    {navLinks.map((link, index) => (
        <>
        <Link className="nav-link" to={link.path} style={isActiveBool(link.path)?{pointerEvents:"none"}:{}}>
            <div className={`navigation_item ${isActive(link.path)}`} key={index} >
              <div className="material-icons">{link.icon}</div>
              <div id="text">{link.label}</div>
          </div>
            </Link>
        
        {navLinks.length === (index+1)? <></>:
        <hr/>}
        
        
        </>
        ))}



    
    </div>
  )
}

export default NavigationCard