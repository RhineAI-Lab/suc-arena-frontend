"use client"

import React, {useEffect, useRef, useState} from "react";
import styles from "./Characters.module.scss";
import {subscribe, useSnapshot} from "valtio";
import Api from "@/app/api/api";
import AiMarkdown from "@/components/AiMarkdown/AiMarkdown";
import DataService from "@/app/service/data-service";
import {clsx} from "clsx";
import Icon from "@/components/Icon/Icon";
import {AppTools} from "@/utils/AppTools";

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

  const [name, setName] = useState('')
  const [main, setMain] = useState(false)
  const [support, setSupport] = useState('')
  const [objective, setObjective] = useState('')
  const [scratch, setScratch] = useState('')
  const [background, setBackground] = useState('')

  async function create() {
    if (name.trim().length == 0) {
      AppTools.message('请填写角色的 Name 信息', 'warning')
      return
    }
    if (support.trim().length == 0) {
      AppTools.message('请填写角色的 Support 信息', 'warning')
      return
    }
    if (objective.trim().length == 0) {
      AppTools.message('请填写角色的 Objective 信息', 'warning')
      return
    }
    if (scratch.trim().length == 0) {
      AppTools.message('请填写角色的 Scratch 信息', 'warning')
      return
    }
    if (background.trim().length == 0) {
      AppTools.message('请填写角色的 Background 信息', 'warning')
      return
    }
    try {
      let data = {
        "name": name,
        "support_character": support,
        "objective": objective,
        "scratch": scratch,
        "background": background,
        "main_character": main,
        "belief": [],
        "relation": [],
        "portrait": '',
        "small_portrait": '',
      }
      let result = await Api.addCharacter(data)
      console.log('Add Character Result: ' + result)
      if (result == 'New Character Created') {
        Api.updateSettings()
      } else {
        AppTools.message('创建角色失败: ' + result, 'warning')
      }
    } catch (e) {
      console.warn(e)
      AppTools.message('参数不支持，请重新输入。', 'warning')
    }
  }

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
      <div className={styles.add}>
        <h1>New Character</h1>
        <div className={styles.copyLine}>
          <md-filled-text-field label="Name" value={name} onInput={(e: any) => setName(e.target.value)} size='large'></md-filled-text-field>
          <md-filled-text-field label="Support Who" value={support} onInput={(e: any) => setSupport(e.target.value)} size='large'></md-filled-text-field>
        </div>
        <md-filled-text-field label="Objective" value={objective} onInput={(e: any) => setObjective(e.target.value)} type="textarea" rows={2} size='large'></md-filled-text-field>
        <div className={clsx(styles.checkboxLine, 'line')}>
          <md-checkbox id="from-main-checkbox" touch-target="wrapper" onInput={(e: any) => {
            setMain(Boolean(e.target.checked))
          }}></md-checkbox>
          <label htmlFor="from-main-checkbox">Is a Main Character</label>
        </div>
        <md-filled-text-field label="Background" value={background} onInput={(e: any) => setBackground(e.target.value)} type="textarea" rows={2} size='large'></md-filled-text-field>
        <md-filled-text-field label="Scratch" value={scratch} onInput={(e: any) => setScratch(e.target.value)} type="textarea" rows={4} size='large'></md-filled-text-field>
        <div className={styles.line}>
          <md-text-button trailing-icon>
            Reset
            {/*<svg slot="icon" viewBox="0 0 48 48"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z"/></svg>*/}
          </md-text-button>
          <div className={styles.space}/>
          <md-filled-tonal-button onClick={() => create()}>
            Create
            {/* @ts-ignore */}
            <svg slot="icon" viewBox="0 0 48 48"><path d="M6 40V8l38 16Zm3-4.65L36.2 24 9 12.5v8.4L21.1 24 9 27Zm0 0V12.5 27Z"/></svg>
          </md-filled-tonal-button>
        </div>
      </div>
    </div>
  )
}
