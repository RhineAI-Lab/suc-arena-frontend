"use client"

import React, {useEffect, useRef, useState} from "react";
import styles from "./page.module.scss";
import {useRouter} from "next/navigation";
import {clsx} from "clsx";
import Icon from "@/components/Icon/Icon";
import Start from "@/components/show/main/Start/Start";
import Overview from "@/components/show/main/Overview/Overview";
import DataService from "@/app/service/data-service";
import {useSnapshot} from "valtio";
import {isDialogType, isSpeechType, LogType} from "@/app/service/class/log-enum";
import RelationTable from "@/components/RelationTable/RelationTable";
import '@material/web/progress/linear-progress'
import TimeUtils from "@/utils/TimeUtils";
import Round, {RoundType} from "@/app/service/class/round";
import StageConfig from "@/app/service/class/stage-config";

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


  // 页面主要状态管理
  const [roundIndex, setRoundIndex] = useState(1)
  const [stageIndex, setStageIndex] = useState(0)

  // 数据映射
  const data = useSnapshot(DataService.data)
  const round = data.rounds[roundIndex]
  const stage = round.stages[stageIndex]

  // 封面信息
  const config = round.stageConfigs[stageIndex]

  // 抽屉信息
  let drawer: any[] = []
  data.rounds.map((item: any, index: number) => {
    let round = item as Round
    if (round.type == RoundType.Overview) {
      drawer.push({
        name: round.name,
        icon: 'round_crop_original',
        iconSize: 22,
      })
    } else if (round.type == RoundType.Start) {
      drawer.push({
        name: round.name,
        icon: 'round_sports_score',
        iconSize: 23,
      })
    } else if (round.type == RoundType.Normal || round.type == RoundType.Settlement) {
      let de: any = {
        name: round.name,
      }
      if (round.type == RoundType.Normal) {
        de.icon = 'outlined_people'
        de.iconSize = 21
        de.name = 'Round ' + de.name.split(' ')[1]
      } else {
        de.icon = 'outlined_event_available'
        de.iconSize = 21
        de.name = 'Settlement'
      }
      if (round.finished) {
        de.progressIcon = 'outlined_check_circle'
        de.progressIconSize = 21
      } else {
        de.progress = round.stages.length + '/' + round.stageConfigs.length
      }
      drawer.push(de)
    }
  })

  // 装饰组件显示控制
  const needEmpty = round.isRoundOrSettlement() && stageIndex > round.stages.length - 1
  const needProgress = round.isRoundOrSettlement()
    && !round.finished
    && roundIndex == data.rounds.length - 1
    && stageIndex == round.stages.length - 1


  // 翻页效果及提示文本
  function getLastText(): string {
    if (stageIndex == 0) {
      if (roundIndex == 0) {
        return 'No more information'
      } else {
        let lastRound = data.rounds[roundIndex - 1]
        return lastRound.getPageName(lastRound.stages.length - 1)
      }
    } else {
      return round.getPageName(stageIndex - 1)
    }
  }

  function getNextText(): string {
    if (stageIndex == round.stageConfigs.length - 1) {
      if (roundIndex == data.rounds.length - 1) {
        return 'No more information'
      } else {
        let nextRound = data.rounds[roundIndex + 1]
        return nextRound.getPageName(0)
      }
    }
    return round.getPageName(stageIndex + 1)
  }

  function lastPage() {
    if (stageIndex == 0) {
      if (roundIndex == 0) {
        return
      } else {
        setRoundIndex(roundIndex - 1)
        setStageIndex(data.rounds[roundIndex - 1].stages.length - 1)
      }
    } else {
      setStageIndex(stageIndex - 1)
    }
  }

  function nextPage() {
    if (stageIndex == round.stageConfigs.length - 1) {
      if (roundIndex == data.rounds.length - 1) {
        return
      } else {
        setRoundIndex(roundIndex + 1)
        setStageIndex(0)
      }
    } else {
      setStageIndex(stageIndex + 1)
    }
  }

  // 进度条组件持续效果
  let [progressTime, setProgressTime] = useState('')
  let [generatingText, setGeneratingText] = useState('Generating.')

  useEffect(() => {
    let interval = setInterval(() => {
      let lastTime = ''
      if (DataService.filterData.length > 0) {
        let lastData = DataService.filterData[DataService.filterData.length - 1]
        lastTime = lastData.time
        setProgressTime(TimeUtils.timeDifference(lastTime) + ' / unknown')
      } else {
        setProgressTime('')
      }
    }, 50)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    let interval = setInterval(() => {
      if (generatingText.length > 13) {
        setGeneratingText('Generating.')
      } else {
        setGeneratingText(generatingText + '.')
      }
    }, 200)
    return () => {
      clearInterval(interval)
    }
  }, [generatingText])


  return (
    <main className={styles.Show}>
      <div className={clsx(styles.scroll, styles.leftBar)}>
        <div className={styles.title}>
          <Icon size='36px'>insights</Icon>
          <h2>Suc Arena</h2>
        </div>
        <div className={styles.subtitle}>Process Menu</div>
        {
          drawer.map((item, index) => {
            return <div
              className={clsx(styles.selectable, index == roundIndex ? styles.selectableSelected : '', styles.item)}
              key={index}
              onClick={e => {
                setRoundIndex(index)
                setStageIndex(0)
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
            <img src={config.cover} alt=''/>
            <div className={styles.content}>
              <h1 className={clsx(styles.title, config.shadow ? styles.textShadow : '')}>{config.title}</h1>
              <div className={styles.session}>{config.description}</div>
            </div>
          </div>
          <div className={styles.topBar} style={{
            display: (round.stageConfigs.length > 1) ? 'flex' : 'none'
          }}>
            {
              round.stageConfigs.map((item: StageConfig, index: number) => {
                return <div
                  className={clsx(styles.selectable, index == stageIndex ? styles.selectableSelected : '', styles.item)}
                  key={index}
                  onClick={e => {
                    setStageIndex(index)
                  }}
                >
                  {item.name}
                </div>
              })
            }
          </div>
          {
            needEmpty && <div className={styles.empty}>
                <span className={styles.title}>
                  <Icon>outlined_takeout_dining</Icon>
                  <span>No Data</span>
                </span>
                  <span className={styles.text}>The game has not progressed to this stage yet.</span>
              </div>
          }
          {
            !needEmpty && <div className={styles.main}>
              {roundIndex == 0 && <Overview/>}
              {roundIndex == 1 && <Start/>}
              {
                stage.messages.map((item: any, index: number) => {
                  if (isDialogType(item.type)) {
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
                          <span>{item.type}</span>
                        </div>
                      </div>
                      <div className={styles.text}>
                        <Icon className={styles.link}>round_all_inclusive</Icon>
                        {item.content}
                      </div>
                    </div>
                  } else if (isSpeechType(item.type)) {
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
                          <span>{item.type}</span>
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
                          <span>{item.type}</span>
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
                  } else if (item.type == LogType.WinnerAnnouncement) {
                    return <div className={styles.message} key={index}>
                      <div className={styles.info}>
                        <div className={clsx(styles.between)} style={{marginLeft: 0}}>
                          <span className={styles.betweenText}>
                            <Icon size='22px'>round_emoji_events</Icon>
                            <span>Winner Announcement</span>
                          </span>
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
                roundIndex >= 2 && <div className={styles.hover}>

                </div>
              }
            </div>
          }
          {
            needProgress && <div className={styles.progressing}>
              <md-linear-progress indeterminate={true} style={{
                width: '100%',
              }}/>
              <div className={styles.info}>
                <span>{generatingText}</span>
                <span className={styles.space}></span>
                <span>{progressTime}</span>
              </div>
            </div>
          }
          <div className={styles.control} style={{
            // display: roundIndex != 1 ? 'flex' : 'none'
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
