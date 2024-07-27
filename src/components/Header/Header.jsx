import React from "react";
import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import { ReactComponent as Logo2 } from "../../assets/images/comlogo2.svg";
import { ReactComponent as Logo1 } from "../../assets/images/comlogo1.svg";
import ExpandableButton from "./expandableButton/ExpandableButton";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {myPageState} from "../../recoil/community/myPageRecoilState";

function Header(){
    const useResetMyPageState = () => {
        const setMyPageState = useSetRecoilState(myPageState);
        setMyPageState(""); // 초기값으로 설정
    }

    const isMyPageState = useRecoilValue(myPageState);
    console.log(isMyPageState);

    return(
        <div className={styles.headerContainer}>
            <div className={styles.logoContainer}>
                <Logo1/>
                <Logo2/>
            </div>
            <div className={styles.navContainer}>
                <div>소개</div>
                <div><Link to={"/community"} onClick={useResetMyPageState}>커뮤니티</Link></div>
                <div><Link to={"/"}>채팅</Link></div>
                <ExpandableButton buttonText="마이페이지"/>
            </div>
        </div>
    );
}

export default Header;