"use client"

import React, {useEffect, useRef, useState} from "react";
import styles from "./page.module.scss";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {clsx} from "clsx";
import Icon from "@/components/Icon/Icon";
import Api from "@/app/api/api";
import CreateConfig from "@/app/api/class/create-config";
import Start from "@/components/show/main/Start/Start";
import Overview from "@/components/show/main/Overview/Overview";
import DataService from "@/app/service/data-service";
import {useSnapshot} from "valtio";
import {LogType} from "@/app/service/class/log-enum";
import RelationTable from "@/components/RelationTable/RelationTable";

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

  const [current, setCurrent] = useState(1)
  const [stage, setStage] = useState(0)

  const data = useSnapshot(DataService.data)

  let rounds: any[] = [
    {
      name: 'Overview',
      icon: 'round_crop_original',
      iconSize: 22,
    },
    {
      name: 'Start',
      icon: 'round_sports_score',
      iconSize: 23,
    },
    // {
    //   name: 'Final',
    //   icon: 'outlined_event_available',
    //   iconSize: 21,
    // },
  ]

  for (let i = 0; i < data.rounds.length; i++) {
    if (i < data.rounds.length - 1) {
      rounds.push({
        name: 'Round ' + (i + 1),
        icon: 'outlined_people',
        iconSize: 21,
        progressIcon: 'outlined_check_circle',
        progressIconSize: 21,
      })
    } else {
      rounds.push({
        name: 'Round ' + (i + 1),
        icon: 'outlined_people',
        iconSize: 21,
        progress: data.rounds[i].length + '/3',
      })
    }
  }

  let stages = [
    '合作阶段',
    '对抗阶段',
    '更新阶段',
  ]

  let currentData = []
  if (current >= 2 && data.rounds.length > current - 2 && data.rounds[current - 2].length > stage) {
    currentData = data.rounds[current - 2][stage]
  }

  return (
    <main className={styles.Show}>
      <div className={clsx(styles.scroll, styles.leftBar)}>
        <div className={styles.title}>
          <Icon size='40px'>insights</Icon>
          <h2>Suc Arena</h2>
        </div>
        <div className={styles.subtitle}>Process Menu</div>
        {
          rounds.map((item, index) => {
            return <div
              className={clsx(styles.selectable, index == current ? styles.selectableSelected : '', styles.item)}
              key={index}
              onClick={e => {
                setCurrent(index)
                setStage(0)
              }}
            >
              <Icon size={item.iconSize + 'px'}>{item.icon}</Icon>
              <span>{item.name}</span>
              <div className={styles.space}></div>
              {
                item.progress && <span style={{fontWeight: 600, fontSize: '14px'}}>{item.progress}</span>
              }
              {
                item.progressIcon && <Icon size={item.progressIconSize + 'px'}>{item.progressIcon}</Icon>
              }
            </div>
          })
        }
        <div className={styles.space}></div>
        <div className={styles.button}>
          <Icon size='30px'>round_add</Icon>
          <span style={{marginLeft: '12px'}}>New Session</span>
        </div>
      </div>
      <div className={styles.space}></div>
      <div className={clsx(styles.scroll, styles.holder)}>
        <div className={styles.article}>
          <div className={styles.img}>
            <img src='/background/5.jpg' alt=''/>
            <div className={styles.content}>
              <h1 className={styles.title}>Succession Arena</h1>
              <div className={styles.session}>Example Session For UI Design. Only has one round now. Other descriptions...</div>
            </div>
          </div>
          <div className={styles.topBar} style={{
            display: current >= 2 ? 'flex' : 'none'
          }}>
            {
              stages.map((item, index) => {
                return <div
                  className={clsx(styles.selectable, index == stage ? styles.selectableSelected : '', styles.item)}
                  key={index}
                  onClick={e => {
                    setStage(index)
                  }}
                >
                  {item}
                </div>
              })
            }
          </div>
          <div className={styles.main}>
            {current == 0 && <Overview/>}
            {current == 1 && <Start/>}
            {
              currentData.map((item: any, index: number) => {
                if (item.type == LogType.DialogueContent) {
                  return <div className={styles.message} key={index}>
                    <div className={styles.info}>
                      <div className={clsx(styles.item, styles.from)}>
                        <img src='/profile/user.png' alt=''/>
                      </div>
                      <div className={clsx(styles.between)}>
                        <span>{item.source}</span>
                        <Icon size='20px' color='#00345b'>east</Icon>
                        <span>{item.target}</span>
                      </div>
                      <div className={clsx(styles.item, styles.to)}>
                        <img src='/profile/user.png' alt=''/>
                      </div>
                    </div>
                    <div className={styles.text}>
                      <Icon className={styles.link}>round_all_inclusive</Icon>
                      {item.content}
                    </div>
                  </div>
                } else if (item.type == LogType.ConclusionOfEnvironment) {
                  return <div className={styles.message} key={index}>
                    <div className={styles.info}>
                      <div className={clsx(styles.item, styles.from)}>
                        <img src='/profile/user.png' alt=''/>
                      </div>
                      <div className={clsx(styles.between)}>
                        <span>{item.source}</span>
                      </div>
                      {/*<span className={styles.space}></span>*/}
                      <div className={clsx(styles.between)}>
                        <span>Conclusion Of Environment</span>
                      </div>
                    </div>
                    <div className={styles.text}>
                      <Icon className={styles.link}>round_all_inclusive</Icon>
                      {item.content}
                    </div>
                  </div>
                } else if (item.type == LogType.ReflectionResult) {
                  return <div className={styles.message} key={index}>
                    <div className={styles.info}>
                      <div className={clsx(styles.item, styles.from)}>
                        <img src='/profile/user.png' alt=''/>
                      </div>
                      <div className={clsx(styles.between)}>
                        <span>{item.source}</span>
                      </div>
                      {/*<span className={styles.space}></span>*/}
                      <div className={clsx(styles.between)}>
                        <span>Reflection Result</span>
                      </div>
                    </div>
                    <div className={styles.text}>
                      <Icon className={styles.link}>round_all_inclusive</Icon>
                      {item.content}
                    </div>
                  </div>
                } else if (item.type == LogType.BeliefUpdate) {
                  return <div className={styles.message} key={index}>
                    <div className={styles.info}>
                      <div className={clsx(styles.item, styles.from)}>
                        <img src='/profile/user.png' alt=''/>
                      </div>
                      <div className={clsx(styles.between)}>
                        <span>{item.source}</span>
                      </div>
                      {/*<span className={styles.space}></span>*/}
                      <div className={clsx(styles.between)}>
                        <span>Belief Status</span>
                      </div>
                    </div>
                    <div className={styles.text}>
                      <Icon className={styles.link}>round_all_inclusive</Icon>
                      <div className={styles.table}>
                        {
                          item.content.map((line: any, index: number) => {
                            return <div className={styles.line} key={index}>
                              <span className={styles.key}>{line.target}</span>
                              <span className={styles.split}></span>
                              <span className={styles.block} style={{
                                width: line.score * 3.5 + 'px'
                              }}></span>
                              <span className={styles.number}>{line.score}</span>
                            </div>
                          })
                        }
                      </div>
                    </div>
                  </div>
                } else if (item.type == LogType.RelationUpdate) {
                  return <div className={styles.message} key={index}>
                    <div className={styles.info}>
                      <div className={clsx(styles.between)} style={{marginLeft: 0}}>
                        <span>Relation Status</span>
                      </div>
                    </div>
                    <div className={styles.text}>
                      <Icon className={styles.link}>round_all_inclusive</Icon>
                      <RelationTable keys={item.characters} values={item.content}/>
                    </div>
                  </div>
                }
              })
            }
            {
              current >= 2 && <div className={styles.hover}>

              </div>
            }
          </div>
          <div className={styles.control} style={{
            display: current != 1 ? 'flex' : 'none'
          }}>
            <div onClick={e => {
            }} style={{
              cursor: 'pointer'
            }}>
              <h1>
                <Icon size='22px' color='#444746'>round_west</Icon>
                <span>Previous</span>
              </h1>
              <p>{'No more information'}</p>
            </div>
            <div onClick={e => {
            }} style={{
              cursor: 'pointer'
            }}>
              <h1>
                <span>Next</span>
                <Icon size='22px' color='#444746'>round_east</Icon>
              </h1>
              <p>{'No more information'}</p>
            </div>
          </div>
        </div>
        <div className={styles.split}>
          <svg aria-hidden="true" width="200%" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <pattern id="a" width="91" height="8" patternUnits="userSpaceOnUse">
              <g>
                <path d="M114 4c-5.067 4.667-10.133 4.667-15.2 0S88.667-.667 83.6 4 73.467 8.667 68.4 4 58.267-.667 53.2 4 43.067 8.667 38 4 27.867-.667 22.8 4 12.667 8.667 7.6 4-2.533-.667-7.6 4s-10.133 4.667-15.2 0S-32.933-.667-38 4s-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0" stroke="#E1E3E1" ></path>
              </g>
            </pattern>
            <rect width="100%" height="100%" fill="url(#a)"></rect>
          </svg>
        </div>
        <div className={styles.footer}>
          <div className={styles.author} onClick={e => {
            window.open('https://github.com/Rhine-AI-Lab')
          }}>
            <img alt='' src="/easy.png"/>
            <span>SA.RHINEAI.COM</span>
            <p></p>
            <span>Developed by the RHINEAI</span>
          </div>
        </div>
      </div>
      <div className={styles.space}></div>
    </main>
  )
}
