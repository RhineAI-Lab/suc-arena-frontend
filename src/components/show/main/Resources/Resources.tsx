"use client"

import React, {useEffect, useRef, useState} from "react";
import styles from "./Resources.module.scss";
import {subscribe, useSnapshot} from "valtio";
import Api from "@/app/api/api";
import AiMarkdown from "@/components/AiMarkdown/AiMarkdown";
import DataService from "@/app/service/data-service";
import {clsx} from "clsx";
import Icon from "@/components/Icon/Icon";
import {AppTools} from "@/utils/AppTools";

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

  const [name, setName] = useState('')
  const [owner, setOwner] = useState('C0000')
  const [description, setDescription] = useState('')
  const [influence, setInfluence] = useState('10')
  const [topic, setTopic] = useState('')

  async function create() {
    if (name.trim().length == 0) {
      AppTools.message('请填写社会资源的 Name 信息', 'warning')
      return
    }
    if (description.trim().length == 0) {
      AppTools.message('请填写社会资源的 Description 信息', 'warning')
      return
    }
    if (influence.trim().length == 0) {
      AppTools.message('请填写社会资源的 Influence 信息', 'warning')
      return
    }
    if (owner.trim().length == 0) {
      AppTools.message('请填写社会资源的 Owner 信息', 'warning')
      return
    }
    if (topic.trim().length == 0) {
      AppTools.message('请填写社会资源的 Topic 信息', 'warning')
      return
    }
    try {
      let data = {
        "name": name,
        "description": description,
        "influence": influence,
        "owner": owner,
        "topic": topic,
        "portrait": '',
        "small_portrait": '',
      }
      let result = await Api.addResource(data)
      console.log('Add Resource Result: ' + result)
      if (result == 'New Resource Created') {
        Api.updateSettings()
      } else {
        AppTools.message('社会资源新增失败: ' + result, 'warning')
      }
    } catch (e) {
      console.warn(e)
      AppTools.message('参数不支持，请重新输入。', 'warning')
    }
  }

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
                <span>Belong {item.owner}</span>
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
      <div className={styles.add}>
        <h1>New Resource</h1>
        <div className={styles.copyLine}>
          <md-filled-text-field label="Name" value={name} onInput={(e: any) => setName(e.target.value)} size='large'></md-filled-text-field>
          <md-filled-text-field label="Influence" value={influence} onInput={(e: any) => setInfluence(e.target.value)} type='number' size='large'></md-filled-text-field>
          <md-filled-text-field label="Owener" value={owner} onInput={(e: any) => setOwner(e.target.value)} size='large'></md-filled-text-field>
        </div>
        <md-filled-text-field label="Description" value={description} onInput={(e: any) => setDescription(e.target.value)} type="textarea" rows={4} size='large'></md-filled-text-field>
        <md-filled-text-field label="Topic" value={topic} onInput={(e: any) => setTopic(e.target.value)} type="textarea" rows={2} size='large'></md-filled-text-field>
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
