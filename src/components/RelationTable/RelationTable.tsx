"use client"

import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useRef} from "react";
import styles from "./RelationTable.module.scss";

export default function RelationTable (props: RelationTableProps): JSX.Element {

  let keys = props.keys
  let values = props.values
  let data: number[][] = []
  for (let i = 0; i < keys.length; i++) {
    let line = []
    for (let j = 0; j < keys.length; j++) {
      line.push(0)
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
      }}>
        <div className={styles.horizontalKeys} style={{
          top: 0,
          left: keyWidth + 'px',
          width: size * keys.length + 'px',
          height: keyWidth + 'px',
        }}>
          {
            keys.map((key, index) => {
              return <div key={index} className={styles.key} style={{
                height: size + 'px',
                lineHeight: size + 'px',
                bottom: 0,
                left: index * size + 'px',
                width: keyWidth + 'px',
                transformOrigin: size / 2 + 'px ' + size / 2 + 'px',
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
              return <div key={index} className={styles.key} style={{
                right: 0,
                top: index * size + 'px',
                width: keyWidth + 'px',
                height: size + 'px',
                lineHeight: size + 'px',
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
                return <div key={index + '-' + index2} className={styles.item} style={{
                  top: index * size + 'px',
                  left: index2 * size + 'px',
                  width: size + 'px',
                  height: size + 'px',
                  lineHeight: size + 'px',
                  backgroundColor: color(item),
                }}>{item}</div>
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
