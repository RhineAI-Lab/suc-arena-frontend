"use client"

import React, {useEffect, useRef} from "react";
import styles from "./page.module.scss";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {clsx} from "clsx";
import Icon from "@/components/Icon/Icon";

export default function Show() {
  const router = useRouter()

  function onFirstEnter() {
  }
  function onFirstEffect() {
  }

  const firstEnter = useRef<boolean>(true)
  if (firstEnter.current) {
    firstEnter.current = false
    onFirstEnter()
  }
  const firstEffect = useRef<boolean>(true)
  useEffect(() => {
    if (firstEffect.current) {
      firstEffect.current = false
      onFirstEffect()
    }
  }, [])
  
  return (
    <main className={styles.Show}>
      <div className={styles.leftBar}>
        <div className={styles.title}>Suc Arena</div>
        <div className={styles.subtitle}>Process Menu</div>
        <div className={clsx(styles.selectable, styles.item)}>Overview</div>
        <div className={clsx(styles.selectable, styles.item)}>Start</div>
        <div className={clsx(styles.selectable, styles.selectableSelected, styles.item)}>
          <span>Round 1</span>
          <Icon>round_done</Icon>
        </div>
        <div className={clsx(styles.selectable, styles.item)}>Round 2</div>
        <div className={clsx(styles.selectable, styles.item)}>Round 3</div>
        <div className={clsx(styles.selectable, styles.item)}>Round 4</div>
        <div className={clsx(styles.selectable, styles.item)}>Final</div>
        <div className={styles.space}></div>
        <div className={styles.share}></div>
      </div>
      <div className={styles.space}></div>
      <div className={styles.holder}>
        <div className={styles.img}>
          <img src='/background/5.jpg' alt=''/>
          <div className={styles.content}>
            <h1 className={styles.title}>Succession Arena</h1>
            <div className={styles.session}>Example Session For UI Design. Only has one round now. Other descriptions...</div>
          </div>
        </div>
        <div className={styles.topBar}>
          <div className={clsx(styles.selectable, styles.selectableSelected, styles.item)}>对抗阶段</div>
          <div className={clsx(styles.selectable, styles.item)}>合作阶段</div>
          <div className={clsx(styles.selectable, styles.item)}>更新阶段</div>
        </div>
        <div className={styles.main}>

        </div>
        <div className={styles.hover}>

        </div>
        <div className={styles.next}></div>
        <div className={styles.split}></div>
        <div className={styles.message}></div>
        <div className={styles.end}></div>
      </div>
      <div className={styles.space}></div>
    </main>
  )
}
