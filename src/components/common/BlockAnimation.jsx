import React from "react";
import styles from "./BlockAnimation.module.css";
import { ReactComponent as Block } from "../../assets/images/block.svg";
import { ReactComponent as Shadow } from "../../assets/images/blockShadow.svg";

function BlockAnimation() {
  return (
    <div className={styles.container}> 
      <Block className={styles.block1}/>
      <Block className={styles.block2}/>
      <Block className={styles.block3}/>
      <Block className={styles.block4}/>
      <Block className={styles.block5}/>
      <Block className={styles.block6}/>
      <Block className={styles.block7}/>
      <Shadow className={styles.shadow}/>
    </div>
  );
}

export default BlockAnimation;