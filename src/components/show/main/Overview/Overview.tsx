"use client"

import React, {useEffect, useRef} from "react";
import styles from "./Overview.module.scss";
import {useSnapshot} from "valtio";
import Api from "@/app/api/api";
import AiMarkdown from "@/components/AiMarkdown/AiMarkdown";
import DataService from "@/app/service/data-service";

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
  const sourceData = useSnapshot(DataService.sourceData)
  
  return (
    <div className={styles.Overview}>
      <h1>Overview information</h1>
      <span className={styles.info}>Sid: {apiData.sid}</span>
      <span className={styles.info}>LastId: {apiData.last}</span>
      <h1>All Log</h1>
      <AiMarkdown>
        {'```javascript\n' + JSON.stringify(sourceData, null, 4) + '\n```'}
      </AiMarkdown>
    </div>
  )
}
