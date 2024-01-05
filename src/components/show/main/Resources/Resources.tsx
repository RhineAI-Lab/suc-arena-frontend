"use client"

import React, {useEffect, useRef, useState} from "react";
import styles from "./Resources.module.scss";
import {subscribe, useSnapshot} from "valtio";
import Api from "@/app/api/api";
import AiMarkdown from "@/components/AiMarkdown/AiMarkdown";
import DataService from "@/app/service/data-service";
import {clsx} from "clsx";
import Icon from "@/components/Icon/Icon";

export default function Resources () {
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

  const data = useSnapshot(DataService.settings.resources)

  return (
    <div className={styles.Resources}>
      {
        data.map((item, index) => {
          return <div key={index} className={styles.resource}>
            <div className={styles.info}>
              <div className={clsx(styles.item, styles.from)}>
                <img src='/profile/user.png' alt=''/>
              </div>
              <div className={clsx(styles.between)}>
                <span>{item.name}</span>
              </div>
              <span className={styles.space}></span>
              <div className={clsx(styles.tag)}>
                <span>Resource - {item.id_number}</span>
              </div>
              <div className={clsx(styles.tag)}>
                <span>Owner - {item.owner}</span>
              </div>
            </div>
            <div className={styles.text}>
              <Icon className={styles.link}>round_all_inclusive</Icon>
              <div className={styles.line}>
                <span className={styles.key}>Description:</span>
                {item.description}
              </div>
              <div className={styles.line}>
                <span className={styles.key}>Influence:</span>
                {item.influence}
              </div>
              <div className={styles.line}>
                <span className={styles.key}>Topic:</span>
                {item.topic}
              </div>
            </div>
          </div>
        })
      }
    </div>
  )
}
