"use client"

import React, {useEffect, useRef, useState} from "react";
import styles from "./Characters.module.scss";
import {subscribe, useSnapshot} from "valtio";
import Api from "@/app/api/api";
import AiMarkdown from "@/components/AiMarkdown/AiMarkdown";
import DataService from "@/app/service/data-service";
import {clsx} from "clsx";
import Icon from "@/components/Icon/Icon";

export default function Characters () {
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

  const data = useSnapshot(DataService.settings.characters)

  return (
    <div className={styles.Characters}>
      {
        data.map((item, index) => {
          return <div key={index} className={styles.character}>
            <div className={styles.info}>
              <div className={clsx(styles.item, styles.from)}>
                <img src='/profile/user.png' alt=''/>
              </div>
              <div className={clsx(styles.between)}>
                <span>{item.name}</span>
              </div>
              <span className={styles.space}></span>
              <div className={clsx(styles.tag)}>
                <span>{item.main_character == 'True' ? 'Main ' : ''}Character - {item.id_name}</span>
              </div>
            </div>
            <div className={styles.text}>
              <Icon className={styles.link}>round_all_inclusive</Icon>
              <div className={styles.line}>
                <span className={styles.key}>Background:</span>
                {item.background}
              </div>
              <div className={styles.line}>
                <span className={styles.key}>Objective:</span>
                {item.objective}
              </div>
              <div className={styles.line}>
                <span className={styles.key}>Scratch:</span>
                {item.scratch}
              </div>
            </div>
          </div>
        })
      }
    </div>
  )
}
