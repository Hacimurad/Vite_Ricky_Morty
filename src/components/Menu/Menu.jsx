import React,{useState} from "react";
import { Link } from "react-router-dom";

import menuIcon from "../../assets/menu.png";
import backIcon from "../../assets/back.png";
import "./menu.css";




function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div className="menu-container">
      <button  className="menu-toggle" onClick={toggleMenu}>
        <img src={menuIcon} alt="menu" />
      </button>

        <div className={`menu ${isOpen ? "open" : ""}`}>

                <button className="close-menu" onClick={toggleMenu}>
                     <img src={backIcon} alt="close" />
                </button>

                <div className="menu-items">
                    <ul className="menu-list">
                        <li><Link to="/">Characters</Link></li>
                        <li><Link to="/locations">Locations</Link></li>
                    </ul>
                 </div>
        </div>

    </div>
  );
}

export default React.memo(Menu);