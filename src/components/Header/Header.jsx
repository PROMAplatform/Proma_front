import React from "react";
import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import { ReactComponent as Logo2 } from "../../assets/images/comlogo2.svg";
import { ReactComponent as Logo1 } from "../../assets/images/comlogo1.svg";

function Header(){
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
                <div><Link to={"/mypage"}>로그인/마이페이지</Link></div>
            </div>
        </div>
    )
}

export default Header;