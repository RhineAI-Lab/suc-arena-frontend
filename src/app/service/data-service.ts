import { proxy, useSnapshot } from 'valtio'
import {SessionState} from "@/app/service/class/session-state";
import {StageType} from "@/app/service/class/stage-type";
import Api from "@/app/api/api";
import {simulateData} from "@/app/service/simulate-data";

export default class DataService {

  static data = proxy({
    state: SessionState.INITIAL,
    rounds: [
      [
        {
          type: StageType.CONFRONTATION,
          stageName: '对抗阶段',

          source: 'C0000',
          target: 'C0005',
          sourceSummary: '总结：作为一家全球性的媒体和娱乐巨头的掌控者，我目前的首要考虑是如何处理我手中的公司。我并不重视亲情，所以并不打算直接将公司交给我的子女。我需要找到一个能够为公司带来长久利益的人或机构。目前，我已经考虑到出售公司。在我可接触的社会资源中，有几家具有影响力的机构，包括R0001新闻和媒体集团、R0002数字媒体和技术公司、R0003媒体公司以及R0004金融机构。这些机构可能是我考虑的潜在买家。\n\n行动方针：首先，我需要了解这些机构的详细情况，包括他们的财务状况、业务发展、管理团队等，以评估他们是否有能力和意愿接手我的公司。其次，我需要找到一个合适的机会，与这些机构的掌控者进行接触，探讨可能的合作或交易。在这个过程中，我需要保持对公司的控制，避免任何可能对公司产生负面影响的行为。同时，我也需要考虑如何在出售公司的过程中，保持公司的稳定，保证其持续的盈利能力。',
          targetSummary: '总结：\n作为角色C0005，我是一位精明的投资者，目标是通过投资策略和人脉关系，扩大自己的财富和影响力，成为商业界的关键人物。我目前拥有一家影响力为10的媒体公司R0003，以其文化和政治报道闻名。我擅长利用他人的弱点，但目前并未支持任何人。\n\n在我接触到的社会资源中，除了我自己拥有的机构外，还有其他四家机构，分别是媒体和娱乐巨头R0000，新闻和媒体集团R0001，数字媒体和技术公司R0002，以及金融机构R0004。这些机构的影响力分别为30，20，10，和10，且各自拥有者不同。\n\n游戏刚刚开始，尚未发生任何事件。\n\n行动方针：\n考虑到我的目标是扩大财富和影响力，我首先需要提升我自己机构的影响力。我可以通过提高我们的新闻报道质量，或者寻找独特的报道角度，来吸引更多的用户。\n\n同时，我也可以利用我的人脉关系，与其他机构进行合作，或者投资他们，以获得更多的收益。尤其是像R0000这样的全球性媒体和娱乐巨头，如果能够与他们建立良好的关系，将对我扩大影响力有极大的帮助。\n\n此外，我也需要关注其他机构的动态，尤其是他们可能存在的弱点。例如，R0001和R0000是竞争关系，我可以利用这一点，与他们其中的一个建立联盟，共同对抗另一个。\n\n总的来说，我的行动方针是：提升自身机构的影响力，利用人脉关系与其他机构合作或投资，以及利用他人的弱点，扩大自己的财富和影响力。',
          content: 'C0000 say to C0005: C0000: C0005，我听说你在投资领域有着独到的见解。我正在考虑出售我手上的公司，我想听听你的意见。你认为R0001新闻和媒体集团、R0002数字媒体和技术公司、R0003媒体公司以及R0004金融机构中，哪一个更适合接手我的公司？'
        }
      ]
    ],
  })

  static sourceData: any[] = [

  ]
  static useId = -1

  static updating = false
  static updateInterval: any

  static startUpdate() {
    this.updating = true
    this.updateInterval = setInterval(() => {
      this.update()
    }, 1000)
  }

  static stopUpdate() {
    this.updating = false
    clearInterval(this.updateInterval)
  }

  static update() {
    Api.get().then((res: any[]) => {
      for (let item of res) {
        this.checkAndAddToSourceData(item)
      }
      console.log('SOURCE DATA', this.sourceData)
    })
  }

  static checkAndAddToSourceData(item: any) {
    let id = item['id']
    for (const dataItem of this.sourceData) {
      if (dataItem['id'] === id) {
        return
      }
    }
    this.sourceData.push(item)
  }

  static simulate() {
    Api.data.sid = 'da2569d0ca9d4b2aa2c24a8a82494041'
    let i = 0
    let interval = setInterval(() => {
      let num = Math.floor(Math.random() * 5) + 1
      for (let j = 0; j < num; j++) {
        if (i >= simulateData.length) {
          clearInterval(interval)
          return
        }
        this.checkAndAddToSourceData(simulateData[i])
        Api.data.last = simulateData[i]['id']
        i++
      }
    }, 500)
  }

  static getRoundsNumber() {
    return DataService.data.rounds.length
  }

  static getStagesNumber(roundId: number) {
    return DataService.data.rounds[roundId].length
  }

}
