import styles from './page.module.scss'
import {simulateData} from "@/app/service/simulate-data";

export default function Game() {
  let lines = simulateData
  let jumps = 0
  let hadUpdate = false

  return (
    <main className={styles.Game}>
      <div className={styles.holder}>
        {
          lines.map((line: any, index: number) => {
            if (jumps > 0) {
              jumps--
              return
            }
            if (line['log_type'] == '行动阶段') {
              let content = line['log_content']
              if (content == '更新阶段') {
                // if (hadUpdate) {
                //   return
                // }
                hadUpdate = true
              }
              return <div key={index} className={styles.stage}>
                <span>---------- {line['log_content']} ----------</span>
              </div>
            } else if (line['log_type'] == '环境总结') {
              let content = line['log_content']
              if (content.indexOf('总结：') == 0) {
                content = content.substring(3)
              }
              return <div key={index} className={styles.summary}>
                <div>{line['source_character']} 环境总结</div>
                <div>{content}</div>
              </div>
            } else if (line['log_type'] == '选择对话人物') {
              let content = ''
              for(let i = index; i<lines.length; i++) {
                if (lines[i]['log_type'] == '对话内容') {
                  content = lines[i]['log_content'] as string
                  break
                }
              }
              content = content.substring(27)
              return <div key={index} className={styles.dialog}>
                <div>{line['source_character']} --&gt; {line['target_character']} 说</div>
                <div>{content}</div>
              </div>
            } else if (line['log_type'] == '信念更新') {
              let xns: string[] = []
              for (let i = index;; i++) {
                let tl: any = lines[i]
                if (tl['log_type'] != '信念更新' || tl['source_character'] != line['source_character']) {
                  break
                }
                xns.push(tl['target_character'] + ': ' + tl['log_content'])
                jumps++
              }
              jumps--
              return <div key={index} className={styles.beliefUpdate}>
                <div>{line['source_character']} 信念更新</div>
                {
                  xns.map((xn: string, i: number) => {
                    return <div key={i}>{xn}</div>
                  })
                }
              </div>
            } else if (line['log_type'] == '关系现状') {
              let xns: any = line['relation']
              return <div key={index} className={styles.beliefUpdate}>
                <div>{line['source_character']} 关系更新</div>
                {
                  Object.entries(xns).map(([key, value]: any, i: number) => {
                    return <div key={i}>{key}: {value}</div>
                  })
                }
              </div>
            } else if (line['log_type'] == '环境判断') {
              return <div key={index} className={styles.judge}>
                <div>{line['source_character']} 环境判断</div>
              </div>
            } else if (line['log_type'] == '反思结果') {
              let content = line['log_content']
              return <div key={index} className={styles.reflect}>
                <div>{line['source_character']} 反思结果</div>
                <span>{content}</span>
              </div>
            } else {
              return <div key={index}/>
            }
          })
        }
      </div>
    </main>
  )
}
