"use client"

import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useRef} from "react";
import styles from "./MoreInformation.module.scss";
import Icon from "@/components/Icon/Icon";
import AiMarkdown from "@/components/AiMarkdown/AiMarkdown";

export default function MoreInformation (props: MoreInformationProps) {
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

  let {item, activeId, onMore} = props
  let detail = activeId == item.id
  
  return (
    <div className={styles.MoreInformation}>
      <span className={styles.button}>
        <Icon>round_keyboard_double_arrow_down</Icon>
        <span>Detail Information</span>
      </span>
      <span className={styles.space}></span>
      <span className={styles.time} style={{
        marginRight: '26px'
      }}>ID: {item.id}</span>
      <span className={styles.time} style={{
        marginRight: '26px'
      }}>Date: {item.time.split(' ')[0]}</span>
      <span className={styles.time}>Time: {item.time.split(' ')[1]}</span>
      <AiMarkdown>
        {'```javascript\n' + item.code + '\n```'}
      </AiMarkdown>
    </div>
  )
}

export interface MoreInformationProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: any
  activeId: number
  onMore: (id: number) => void
}
