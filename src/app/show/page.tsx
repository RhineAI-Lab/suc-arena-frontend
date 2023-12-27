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

  let covers = [
    {
      background: '/background/4.jpg',
      title: 'Succession Arena',
      description: 'Example Session For UI Design. Only has one round now. Other descriptions...'
    },
    {
      background: '/background/5.jpg',
      title: 'Start A Session',
      description: 'Set the number of rounds and dialogue turns, then click \'Start\' to create a session, or enter \'Session Id\' to continue a previous session.'
    },
    {
      background: '/background/2.jpg',
      title: 'Confrontation Stage',
      description: 'Example Session For UI Design. Only has one round now. Other descriptions...'
    },
    {
      background: '/background/8.png',
      title: 'Cooperation Stage',
      description: 'Example Session For UI Design. Only has one round now. Other descriptions...'
    },
    {
      background: '/background/1.jpg',
      title: 'Announcement Stage',
      description: 'Example Session For UI Design. Only has one round now. Other descriptions...'
    },
    {
      background: '/background/9.jpg',
      title: 'Update Stage',
      description: 'Example Session For UI Design. Only has one round now. Other descriptions...'
    },
  ]
  let cover = current <= 1 ? covers[current] : covers[stage+2]

  let stages = [
    '对抗阶段',
    '合作阶段',
    '宣言阶段',
    '更新阶段',
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
        progress: data.rounds[i].length + '/' + stages.length,
      })
    }
  }

  let currentData = []
  if (current >= 2 && data.rounds.length > current - 2 && data.rounds[current - 2].length > stage) {
    currentData = data.rounds[current - 2][stage]
  }

  function getLastText(): string {
    if (current == 0) return 'No more information'
    if (current == 1) return 'Overview'
    if (current == 2 && stage == 0) return 'Start'
    if (stage == 0) return 'Round ' + (current - 2) + ' - ' + stages[2]
    if (stage == 1) return 'Round ' + (current - 1) + ' - ' + stages[0]
    if (stage == 2) return 'Round ' + (current - 1) + ' - ' + stages[1]
    return 'No more information'
  }

  function getNextText(): string {
    if (current == 0) return 'Start'
    if (current == 1) {
      if (data.rounds.length > 0) {
        return 'Round ' + '1' + ' - ' + stages[0]
      } else {
        return 'No more information'
      }
    }
    if (stage == 0) return 'Round ' + (current - 1) + ' - ' + stages[1]
    if (stage == 1) return 'Round ' + (current - 1) + ' - ' + stages[2]
    if (stage == 2 && data.rounds.length >= current) return 'Round ' + (current) + ' - ' + stages[0]
    return 'No more information'
  }

  function lastPage() {
    if (current == 1) {
      setCurrent(0)
      setStage(0)
    } else if (current == 2 && stage == 0) {
      setCurrent(1)
      setStage(0)
    } else if (stage == 0) {
      setCurrent(current - 1)
      setStage(2)
    } else if (stage == 1) {
      setCurrent(current)
      setStage(0)
    } else if (stage == 2) {
      setCurrent(current)
      setStage(1)
    }
  }

  function nextPage() {
    if (current == 0) {
      setCurrent(1)
      setStage(0)
    } else if (current == 1 && data.rounds.length > 0) {
      setCurrent(2)
      setStage(0)
    } else if (stage == 0) {
      setCurrent(current)
      setStage(1)
    } else if (stage == 1) {
      setCurrent(current)
      setStage(2)
    } else if (stage == 2 && data.rounds.length >= current) {
      setCurrent(current + 1)
      setStage(0)
    }
  }

  return (
    <main className={styles.Show}>
      <div className={clsx(styles.scroll, styles.leftBar)}>
        <div className={styles.title}>
          <Icon size='36px'>insights</Icon>
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
        <div className={styles.button} onClick={e => {
          window.open(window.location.href, '_blank');
        }}>
          <Icon size='30px'>round_add</Icon>
          <span style={{marginLeft: '12px'}}>New Session</span>
        </div>
      </div>
      <div className={styles.space}></div>
      <div className={clsx(styles.scroll, styles.holder)}>
        <div className={styles.article}>
          <div className={styles.img}>
            <img src={cover.background} alt=''/>
            <div className={styles.content}>
              <h1 className={clsx(styles.title, stage == 1 && current > 1 ? styles.textShadow : '')}>{cover.title}</h1>
              <div className={styles.session}>{cover.description}</div>
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
                      <span className={styles.space}></span>
                      <div className={clsx(styles.tag)}>
                        <span>Dialogue Content</span>
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
                      <span className={styles.space}></span>
                      <div className={clsx(styles.tag)}>
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
                      <span className={styles.space}></span>
                      <div className={clsx(styles.tag)}>
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
                      <span className={styles.space}></span>
                      <div className={clsx(styles.tag)}>
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
                        <span className={styles.betweenText}>
                          <Icon>round_groups</Icon>
                          <span>Relation Status</span>
                        </span>
                      </div>
                    </div>
                    <div className={styles.text}>
                      <Icon className={styles.link}>round_all_inclusive</Icon>
                      <RelationTable keys={item.characters} values={item.content}/>
                    </div>
                  </div>
                } else if (item.type == LogType.OpenSpeechInRound) {
                  return <div className={styles.message} key={index}>
                    <div className={styles.info}>
                      <div className={clsx(styles.item, styles.from)}>
                        <img src='/profile/user.png' alt=''/>
                      </div>
                      <div className={clsx(styles.between)}>
                        <span>{item.source}</span>
                      </div>
                      <span className={styles.space}></span>
                      <div className={clsx(styles.tag)}>
                        <span>Open Speech In Round</span>
                      </div>
                    </div>
                    <div className={styles.text}>
                      <Icon className={styles.link}>round_all_inclusive</Icon>
                      {item.content}
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
            // display: current != 1 ? 'flex' : 'none'
          }}>
            <div onClick={e => {
              lastPage()
            }} style={{
              cursor: 'pointer'
            }}>
              <h1>
                <Icon size='22px' color='#444746'>round_west</Icon>
                <span>Previous</span>
              </h1>
              <p>{getLastText()}</p>
            </div>
            <div onClick={e => {
              nextPage()
            }} style={{
              cursor: 'pointer'
            }}>
              <h1>
                <span>Next</span>
                <Icon size='22px' color='#444746'>round_east</Icon>
              </h1>
              <p>{getNextText()}</p>
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
          <div className={styles.footerMiddle}>
            <div className={styles.left}>
              <div className={styles.line} onClick={e => {
                window.open('https://github.com/MikeGu721/SuccessionArena')
              }}>
                <span className={styles.icon}>
                  <svg height="22" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="22" data-view-component="true" fill='#444444'>
                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                  </svg>
                </span>
                <span>MikeGu721/SuccessionArena</span>
              </div>
              <div className={styles.line} onClick={e => {
                window.open('https://github.com/MikeGu721/SuccessionArena')
              }}>
                <span className={styles.icon}>
                  <svg aria-hidden="true" height="22" viewBox="0 0 16 16" version="1.1" width="22" data-view-component="true" fill='#444444'>
                    <path d="M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 0 0-.124-.033H8.75V13h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5V3.5h-.984a.245.245 0 0 0-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L2.178 4.5H1.75a.75.75 0 0 1 0-1.5h2.234a.249.249 0 0 0 .125-.033l1.288-.737c.265-.15.564-.23.869-.23h.984V.75a.75.75 0 0 1 1.5 0Zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327Zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327Z"></path>
                  </svg>
                </span>
                <span>Apache-2.0 License</span>
              </div>
              <div className={styles.space}></div>
              <div className={styles.line} onClick={e => {
                window.open('https://sa.rhineai.com/')
              }}>
                <img className={styles.icon} alt='' src="/easy.png"/>
                <span style={{color: '#000000'}}>SA.RHINEAI.COM</span>
              </div>
            </div>
            <div className={styles.space}></div>
            <div className={styles.right}>
              <div className={styles.author}>
                <span>Developed By</span>
                <span>Artificial Intelligence Evaluation Group</span>
                <span>@ Knowledge Works Research Laboratory</span>
                <span>@ Fudan University</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.space}></div>
    </main>
  )
}
