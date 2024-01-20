"use client"

import React, {useEffect, useRef, useState} from "react";
import styles from "./Start.module.scss";
import './Start.css'
import '@material/web/textfield/filled-text-field'
import '@material/web/button/text-button'
import '@material/web/button/filled-tonal-button'
import '@material/web/button/outlined-button'
import '@material/web/button/filled-button'
import '@material/web/checkbox/checkbox'
import Api from "@/app/api/api";
import CreateConfig from "@/app/api/class/create-config";
import {AppTools} from "@/utils/AppTools";
import DataService from "@/app/service/data-service";
import {clsx} from "clsx";
import Icon from "@/components/Icon/Icon";

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

  let [gameRound, setGameRound] = useState('3')
  let [battleChatRound, setBattleChatRound] = useState('2')
  let [collaborationChatRound, setCollaborationChatRound] = useState('2')

  let [loadPre, setLoadPre] = useState(false)
  let [preSid, setPreSid] = useState('')
  let [preBeforeId, setPreBeforeId] = useState('10')

  let [existsSid, setExistsSid] = useState('')

  function checkNumberValid(num: number) {
    if (num === undefined) return false;
    if (num === null) return false;
    if (Number.isNaN(num)) return false;
    if (num <= 0) return false;
    return true
  }

  function create() {
    if (Api.data.sid.length > 0) {
      AppTools.message('当前已有进行中的会话。', 'warning')
      return
    }

    let config = new CreateConfig()
    try {
      config.gameRound = parseInt(gameRound)
      config.battleChatRound = parseInt(battleChatRound)
      config.collaborationChatRound = parseInt(collaborationChatRound)
    } catch (e) {
      console.error(e)
      AppTools.message('启动参数错误，请重新设置。', 'warning')
      return
    }

    if (
      !checkNumberValid(config.gameRound)
      || !checkNumberValid(config.battleChatRound)
      || !checkNumberValid(config.collaborationChatRound)
    ) {
      AppTools.message('启动参数不支持，请重新设置。', 'warning')
    }

    Api.create(config).then(res => {
      console.log('Start session. Sid:' + res.sid)
      DataService.startUpdate()
    })
  }

  function simulate() {
    if (Api.data.sid.length > 0) {
      AppTools.message('当前已有进行中的会话。', 'warning')
      return
    }

    DataService.simulate()
  }

  function continueSession(sid = '', simulate = false) {
    if (Api.data.sid.length > 0) {
      AppTools.message('当前已有进行中的会话。', 'warning')
      return
    }

    if (sid.length == 0) {
      if (existsSid.trim().length == 0) {
        AppTools.message('请输入SessionId', 'warning')
        return;
      }
      sid = existsSid
    }

    console.log('Continue session. Sid:' + sid)
    Api.data.sid = sid
    DataService.startUpdate(simulate)
  }

  let simulateList = [
    '2e295fa3cddd47e8bccbc377608cf179',
    'be141b8d5e2c4befb34e2cf358dd705e',
  ]

  return (
    <div className={clsx(styles.Start, 'm3-hook')}>
      <h1>Start Config</h1>
      <md-filled-text-field label="Game Round" value={gameRound} onInput={(e: any) => setGameRound(e.target.value)} type='number' size='large'></md-filled-text-field>
      <div className={styles.fieldLine}>
        <md-filled-text-field label="Battle Chat Round" value={battleChatRound} onInput={(e: any) => setBattleChatRound(e.target.value)} type='number' size='large'></md-filled-text-field>
        <md-filled-text-field label="Collaboration Chat Round" value={collaborationChatRound} onInput={(e: any) => setCollaborationChatRound(e.target.value)} type='number' size='large'></md-filled-text-field>
      </div>
      <div className={clsx(styles.checkboxLine, 'line')}>
        <md-checkbox id="from-mode-checkbox" touch-target="wrapper" onInput={(e: any) => {
          setLoadPre(Boolean(e.target.checked))
        }}></md-checkbox>
        <label htmlFor="from-mode-checkbox">Load Pre-Information from Existing Conversation</label>
      </div>
      <div className={styles.copyLine} style={loadPre ? {} : {
        height: 0,
      }}>
        <md-filled-text-field label="Pre Session ID" value={preSid} onInput={(e: any) => setPreSid(e.target.value)} size='large'></md-filled-text-field>
        <md-filled-text-field label="Before ID" value={preBeforeId} onInput={(e: any) => setPreBeforeId(e.target.value)} type='number' size='large'></md-filled-text-field>
      </div>
      <div className={styles.line} style={{marginTop: '10px'}}>
        <md-text-button trailing-icon>
          Reset
          {/*<svg slot="icon" viewBox="0 0 48 48"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z"/></svg>*/}
        </md-text-button>
        <div className={styles.space}/>
        <md-filled-tonal-button onClick={() => create()}>
          Start
          {/* @ts-ignore */}
          <svg slot="icon" viewBox="0 0 48 48"><path d="M6 40V8l38 16Zm3-4.65L36.2 24 9 12.5v8.4L21.1 24 9 27Zm0 0V12.5 27Z"/></svg>
        </md-filled-tonal-button>
      </div>
      <h1>From Exists Session</h1>
      <md-filled-text-field label="Session ID" value={existsSid} onInput={(e: any) => setExistsSid(e.target.value)} type='text' size='large'></md-filled-text-field>
      <div className={styles.line} style={{marginTop: '10px'}}>
        {/*<md-filled-tonal-button onClick={() => {*/}
        {/*  simulate()*/}
        {/*}}>*/}
        {/*  Quick Simulate*/}
        {/*</md-filled-tonal-button>*/}
        <div className={styles.space}/>
        <md-filled-tonal-button onClick={() => {
          continueSession()
        }}>
          Continue
          {/* @ts-ignore */}
          <svg slot="icon" viewBox="0 0 48 48"><path d="M6 40V8l38 16Zm3-4.65L36.2 24 9 12.5v8.4L21.1 24 9 27Zm0 0V12.5 27Z"/></svg>
        </md-filled-tonal-button>
      </div>
      <h1>Quick Simulate</h1>
      <div className={styles.buttons}>
        {
          simulateList.map((sid, index) => {
            return (
              <div onClick={() => continueSession(sid, true)} key={index}>
                <h1>{sid}</h1>
                <Icon size='32px' color='#555577'>round_east</Icon>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
