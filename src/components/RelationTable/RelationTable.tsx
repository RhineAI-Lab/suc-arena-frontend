"use client"

import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useRef} from "react";
import styles from "./RelationTable.module.scss";
import {clsx} from "clsx";
import Icon from "@/components/Icon/Icon";

export default function RelationTable (props: RelationTableProps): JSX.Element {

  let keys = props.keys
  let values = props.values
  let data: number[][] = []
  for (let i = 0; i < keys.length; i++) {
    let line = []
    for (let j = 0; j < keys.length; j++) {
      line.push(-1)
    }
    data.push(line)
  }
  for (let i = 0; i < values.length; i++) {
    let v = values[i]
    let si = keys.indexOf(v.source)
    let ti = keys.indexOf(v.target)
    if (si >= 0 && ti >= 0) {
      data[si][ti] = v.score
    }
  }

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

  let size = 50
  let keyWidth = 130

  let [hoverX, setHoverX] = React.useState<number>(-1)
  let [hoverY, setHoverY] = React.useState<number>(-1)

  function color(value: number): string {
    value = 100 - value
    return `rgb(${value * 2.4}, ${value * 2.1 + 30}, ${value * 1.35 + 120})`
  }
  
  return (
    <div className={styles.RelationTable} style={{
      height: size * keys.length + keyWidth + 'px',
    }}>
      <div className={styles.holder} style={{
        width: size * keys.length + keyWidth + 'px',
        height: size * keys.length + keyWidth + 'px',
        transform: `translateX(-${keyWidth / 2}px)`,
      }} onMouseLeave={e => {
        setHoverX(-1)
        setHoverY(-1)
      }}>
        <div className={styles.block} style={{
          top: 0,
          left: 0,
          right: keyWidth + 'px',
          bottom: keyWidth + 'px',
        }} onMouseEnter={e => {
          setHoverX(-1)
          setHoverY(-1)
        }}>
        </div>
        <div className={styles.horizontalKeys} style={{
          top: 0,
          left: keyWidth + 'px',
          width: size * keys.length + 'px',
          height: keyWidth + 'px',
        }}>
          {
            keys.map((key, index) => {
              return <div key={index} className={clsx(styles.key, hoverX == index ? styles.hoverKey : '')} style={{
                height: size + 'px',
                lineHeight: size + 'px',
                bottom: 0,
                left: index * size + 'px',
                width: keyWidth + 'px',
                transformOrigin: size / 2 + 'px ' + size / 2 + 'px',
              }} onMouseEnter={e => {
                setHoverX(index)
                setHoverY(-1)
              }}>{key}</div>
            })
          }
        </div>
        <div className={styles.verticalKeys} style={{
          top: keyWidth + 'px',
          left: 0,
          width: keyWidth + 'px',
          height: size + 'px',
        }}>
          {
            keys.map((key, index) => {
              return <div key={index} className={clsx(styles.key, hoverY == index ? styles.hoverKey : '')} style={{
                right: 0,
                top: index * size + 'px',
                width: keyWidth + 'px',
                height: size + 'px',
                lineHeight: size + 'px',
              }} onMouseEnter={e => {
                setHoverX(-1)
                setHoverY(index)
              }}>{key}</div>
            })
          }
        </div>
        <div className={styles.table} style={{
          top: keyWidth + 'px',
          left: keyWidth + 'px',
          width: size * keys.length + 'px',
          height: size * keys.length + 'px',
        }}>
          {
            data.map((line, index) => {
              return line.map((item, index2) => {
                let useful = item != -1 && index != index2
                if (index == index2) item = 5
                return <div key={index + '-' + index2} className={clsx(styles.item, useful ? styles.useful : '')} style={{
                  top: index * size + 'px',
                  left: index2 * size + 'px',
                  width: size + 'px',
                  height: size + 'px',
                  lineHeight: size + 'px',
                  backgroundColor: color(item),
                  color: !useful ? '#999999' : '#000000',
                }} onMouseEnter={e => {
                  setHoverX(index2)
                  setHoverY(index)
                }}>{index == index2 ? 'NaN' : (item == -1 ? 'None' : item)}</div>
              })
            })
          }
        </div>
      </div>
    </div>
  )
}

export interface RelationTableProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  keys: string[]
  values: {source: string, target: string, score: number}[]
}
