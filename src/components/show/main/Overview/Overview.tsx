"use client"

import React, {useEffect, useRef} from "react";
import styles from "./Overview.module.scss";
import {useSnapshot} from "valtio";
import Api from "@/app/api/api";

export default function Overview () {
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

  const apiData = useSnapshot(Api.data)
  
  return (
    <div className={styles.Overview}>
      <h1>Overview information</h1>
      <span>Sid: {apiData.sid}</span>
      <span>LastId: {apiData.last}</span>
    </div>
  )
}
