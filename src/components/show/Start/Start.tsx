"use client"

import React, {useEffect, useRef} from "react";
import styles from "./Start.module.scss";

export default function Start () {
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
    <div className={styles.Start}>

    </div>
  )
}
