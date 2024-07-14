import React, {useState} from "react";
import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import { ReactComponent as Logo2 } from "../../assets/images/comlogo2.svg";
import { ReactComponent as Logo1 } from "../../assets/images/comlogo1.svg";
import ExpandableButton from "./expandableButton/ExpandableButton";

function Header(){

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return(
        <div className={styles.headerContainer}>
            <div className={styles.logoContainer}>
                <Logo1/>
                <Logo2/>
            </div>
            <div className={styles.navContainer}>
                <div>소개</div>
                <div><Link to={"/community"}>커뮤니티</Link></div>
                <div><Link to={"/"}>채팅</Link></div>
                <ExpandableButton buttonText="마이페이지"/>
            </div>
        </div>
    );
}

export default Header;