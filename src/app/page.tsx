"use client"

import styles from './page.module.scss'
import {useRouter} from "next/navigation";
import {useEffect, useRef} from "react";

export default function Home() {
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
    router.push('/show')
    if (firstEffect.current) {
      firstEffect.current = false
      onFirstEffect()
    }
  }, [])

  return (
    <main className={styles.Home}>

    </main>
  )
}
