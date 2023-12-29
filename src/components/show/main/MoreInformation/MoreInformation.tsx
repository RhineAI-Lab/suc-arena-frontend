"use client"

import React, {useEffect, useRef} from "react";
import styles from "./MoreInformation.module.scss";

export default function MoreInformation () {
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
    <div className={styles.MoreInformation}>

    </div>
  )
}
