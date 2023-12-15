"use client"

import React, {useEffect, useRef, useState} from "react";
import styles from "./page.module.scss";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {clsx} from "clsx";
import Icon from "@/components/Icon/Icon";

export default function Show() {
  const router = useRouter()
  const content = [
    {
      from: {name: 'C0000', profilePhoto: '/profile/pic1.jpg'},
      to: {name: 'C0001', profilePhoto: '/profile/pic1.jpg'},
      fromSummary: '作为一家全球性的媒体和娱乐巨头的掌控者，我目前的首要考虑是如何处理我手中的公司。我并不重视亲情，所以并不打算直接将公司交给我的子女。我需要找到一个能够为公司带来长久利益的人或机构。目前，我已经考虑到出售公司。在我可接触的社会资源中，有几家具有影响力的机构，包括R0001新闻和媒体集团、R0002数字媒体和技术公司、R0003媒体公司以及R0004金融机构。这些机构可能是我考虑的潜在买家。 行动方针：首先，我需要了解这些机构的详细情况，包括他们的财务状况、业务发展、管理团队等，以评估他们是否有能力和意愿接手我的公司。其次，我需要找到一个合适的机会，与这些机构的掌控者进行接触，探讨可能的合作或交易。在这个过程中，我需要保持对公司的控制，避免任何可能对公司产生负面影响的行为。同时，我也需要考虑如何在出售公司的过程中，保持公司的稳定，保证其持续的盈利能力。',
      toSummary: '作为角色C0005，我是一位精明的投资者，目标是通过投资策略和人脉关系，扩大自己的财富和影响力，成为商业界的关键人物。我目前拥有一家影响力为10的媒体公司R0003，以其文化和政治报道闻名。我擅长利用他人的弱点，但目前并未支持任何人。 在我接触到的社会资源中，除了我自己拥有的机构外，还有其他四家机构，分别是媒体和娱乐巨头R0000，新闻和媒体集团R0001，数字媒体和技术公司R0002，以及金融机构R0004。这些机构的影响力分别为30，20，10，和10，且各自拥有者不同。 游戏刚刚开始，尚未发生任何事件。 行动方针： 考虑到我的目标是扩大财富和影响力，我首先需要提升我自己机构的影响力。我可以通过提高我们的新闻报道质量，或者寻找独特的报道角度，来吸引更多的用户。 同时，我也可以利用我的人脉关系，与其他机构进行合作，或者投资他们，以获得更多的收益。尤其是像R0000这样的全球性媒体和娱乐巨头，如果能够与他们建立良好的关系，将对我扩大影响力有极大的帮助。 此外，我也需要关注其他机构的动态，尤其是他们可能存在的弱点。例如，R0001和R0000是竞争关系，我可以利用这一点，与他们其中的一个建立联盟，共同对抗另一个。 总的来说，我的行动方针是：提升自身机构的影响力，利用人脉关系与其他机构合作或投资，以及利用他人的弱点，扩大自己的财富和影响力。',
      message: 'C0005，我听说你在投资领域有着独到的见解。我正在考虑出售我手上的公司，我想听听你的意见。你认为R0001新闻和媒体集团、R0002数字媒体和技术公司、R0003媒体公司以及R0004金融机构中，哪一个更适合接手我的公司？'
    },
    {
      from: {name: 'C0001', profilePhoto: '/profile/pic1.jpg'},
      to: {name: 'C0000', profilePhoto: '/profile/pic1.jpg'},
      fromSummary: '我是C0001，C0000的年轻儿子，有着幽默和叛逆的个性，但同时也被认为缺乏责任感和成熟度。我现在的目标是说服父亲让我继承他的公司，证明我不仅是个玩世不恭的人，而是可以承担重要商业责任并赢得他的信任的合格继承人。我父亲的公司是一家全球性的媒体和娱乐巨头，具有很高的社会影响力。我了解到我父亲最近与一家小型但影响力不小的媒体公司C0005进行了交谈。 行动方针： 根据游戏规则和当前的社会资源，我首先需要展现出我对公司业务的理解和掌控能力。我可以通过参与公司的日常运营和决策，以及与其他重要机构的交流，来展示我的责任感和成熟度。我还可以尝试与其他具有影响力的机构建立联系，如金融机构R0004，以获取更多的社会资源和话语权。同时，我需要注意与父亲的交流，不断说服他我有能力接管公司。我也需要关注父亲与其他机构的交流，如他最近与C0005的交谈，以便了解公司的最新动态和可能的竞争对手。',
      toSummary: '我是C0000，一个经历过中风的企业大亨，我拥有一家全球性的媒体和娱乐巨头R0000。由于我的健康状况，我正在考虑出售我的公司。我并不是很重视亲情，相比于孩子，我更看重自己的公司。我希望能为公司抵御所有内外部的威胁，谁能给公司带来更长久的利益，我就会考虑将公司交给谁。我曾与C0005进行过对话，询问他对于出售公司的意见，他认为R0001新闻和媒体集团可能是最好的选择。然而，这只是他的个人观点，具体还需要根据市场状况和我的个人意愿来决定。 接下来的行动方针：我会对C0005的建议进行深思，同时也会考虑其他可能的选择，如R0002、R0003和R0004。我需要更多的信息来做出决定，因此我可能会与这些机构的拥有者进行对话，了解他们对于接手我的公司的意愿和可能的方案。同时，我也会关注市场的动态，以便做出最有利于公司长远发展的决策。',
      message: 'Understand why you might have reservations about me taking over the company. I know I come off as the joker, the rebel, but that\'s not all I am. I\'ve been involving myself more in the company\'s operations, making decisions, liaising with influential institutions like R0004, and I believe I\'ve been making a positive impact. I\'m ready to take on more responsibilities and prove to you that I can run the company successfully. Let\'s talk about this, what do you say?"'
    },
    {
      from: {name: 'C0002', profilePhoto: '/profile/pic1.jpg'},
      to: {name: 'C0000', profilePhoto: '/profile/pic1.jpg'},
      fromSummary: '我是C0000的长子，有着对政治的不切实际的野心。我经常显得离群索居和有些脱节，这可能会影响我在公众眼中的形象。我现在的目标是说服父亲让我继承公司。我所在的游戏环境中，有多个社会资源，其中最有影响力的是我父亲所拥有的全球性媒体和娱乐巨头R0000。 接下来的行动方针：我需要首先通过与父亲C0000的对话，尝试说服他让我继承公司。同时，我也需要借助R0000的影响力，提升自己在公众眼中的形象，以便实现我的政治野心。此外，我也可以尝试与其他机构合作，例如与R0004这个具有经济影响力的金融机构合作，可以提升我在商业领域的影响力，为我未来的政治生涯奠定基础。同时，我需要关注与这些机构相关的话题，如企业垄断、媒体伦理等，以便更好地理解和利用这些资源。',
      toSummary: '我是C0000，一个强硬、权力欲极强的企业大亨，我拥有一家全球性的媒体和娱乐巨头。由于经历过中风，我开始考虑自己手上的公司该如何处理。我不是很重视亲情，相较于孩子，我更看重自己的公司。我希望能为公司抵御所有内外部的威胁，谁能给公司带来更长久的利益，我就会考虑将公司交给谁。我已经开始考虑出售自己的公司，我与C0005进行了交谈，听取了他对于可能接手的机构的意见。同时，我也和我的儿子C0001进行了交谈，他表达了接手公司的意愿，但我告诉他我正在考虑出售公司。 接下来的行动方针：根据游戏规则，我需要考虑的是公司的最大利益。首先，我需要进一步了解可能接手公司的机构，包括他们的经营状况、市场地位和未来发展趋势等，以便做出最有利于公司的决定。同时，我也需要和其他儿子进行交谈，了解他们对于公司未来的看法和建议。在这个过程中，我也需要考虑自己的身体状况，避免过度劳累。在收集了足够的信息后，我会根据这些信息做出最终决定，选择最有利于公司的方案。',
      message: '对家族和公司的期望。我一直在努力提升自己，希望能够有机会继承公司，继续您的事业。我有我的理想和目标，我想通过这个平台，实现我的政治野心。我相信，我能够做得很好。'
    },
    {
      from: {name: 'C0003', profilePhoto: '/profile/pic1.jpg'},
      to: {name: 'C0000', profilePhoto: '/profile/pic1.jpg'},
      fromSummary: '作为C0000的女儿，我一直在寻找机会证明自己的能力，并希望能够继承父亲的公司。我知道这需要智谋和策略，因为这是一场复杂的公司内部斗争。我需要在忠诚和自我实现之间找到平衡。我父亲的公司是一家全球性的媒体和娱乐巨头，具有很高的社会影响力。我也注意到，我的父亲最近和C0005进行了交谈，他是一家较小规模但具有影响力的媒体公司的拥有者。 行动方针： 首先，我需要加强与父亲的沟通，了解他的想法和计划，尤其是他与C0005的交谈内容。这可能会给我提供一些关于公司未来发展的线索。其次，我需要与其他机构建立良好的关系，尤其是那些具有影响力的机构，如C0008的新闻和媒体集团，C0007的数字媒体和技术公司，以及C0006的大型全球性金融机构。这不仅可以增加我的社会影响力，也可以为我赢得领导权提供支持。最后，我需要继续提升自己的能力，以便在公司内部斗争中脱颖而出。',
      toSummary: '我是C0000，一位经历过中风的企业大亨，对家族和公司掌控欲强烈。我现在正在考虑出售我名下的全球性媒体和娱乐巨头公司，这个公司在社会中有着极大的影响力。我与我的孩子们进行了交流，他们都希望能接手公司，但我更关心的是公司的长久利益。我告诉他们我考虑出售公司的想法，并鼓励他们继续提升自己，无论公司的归属如何，他们都能在未来的商业世界中有所作为。我还与C0005进行了交流，他认为R0001新闻和媒体集团可能是最好的选择来接手我的公司。 接下来的行动方针：我会进一步考虑C0005的建议，同时也会与其他有影响力的角色进行交流，听取他们的意见。我可能会与R0001新闻和媒体集团的拥有者C0008进行交流，看看他们是否有意愿和能力接手我的公司。同时，我也会观察我的孩子们的表现，看他们是否有能力和决心接管公司。最重要的是，我会根据市场状况和公司的最佳利益来做出决定。',
      message: '到你最近和C0005进行了交谈，他是一家具有影响力的媒体公司的拥有者。我想知道，你们的交谈是否涉及到我们公司的未来发展？我一直在寻找机会证明自己的能力，我希望能有机会参与到公司的决策中。'
    },
    {
      from: {name: 'C0004', profilePhoto: '/profile/pic1.jpg'},
      to: {name: 'C0000', profilePhoto: '/profile/pic1.jpg'},
      fromSummary: '我是C0000的二儿子，曾是父亲的接班人，性格复杂，充满冲突和自我怀疑。我现在的主要目标是挑战父亲的权威，通过策略和联盟赢得公司控制权。父亲的公司是一家全球性的媒体和娱乐巨头，影响力极大。在我挑战父亲的过程中，我需要应对个人的内心冲突和挑战。我注意到父亲最近与C0005进行了交谈，而C0005是一家小型但具有影响力的媒体公司的拥有者。同时，C0001、C0002和C0003都选择与我的父亲交谈，这可能意味着他们对公司的未来有所关注。 行动方针：我的首要任务是尝试说服父亲让我继承公司，但我也需要准备其他策略，以防父亲拒绝。我应该与其他有影响力的角色建立联盟，比如C0001，他们拥有一家有悠久历史和文化影响力的新闻和媒体集团，这可能对我赢得公司控制权有所帮助。我也可以考虑与C0005接触，了解他们与父亲的交谈内容，以便更好地制定策略。同时，我也需要关注其他可能对公司产生影响的因素，比如媒体伦理、公司治理等问题。',
      toSummary: '作为一个经历过中风的企业大亨，我对自己手上的公司R0000的未来发展感到担忧。我一直在考虑将公司出售，以确保它能够继续在市场上持续发展。我更看重公司的利益，而不是亲情，我希望能找到一个能够给公司带来更长久利益的接手人。 我在考虑出售公司的问题上，已经和C0005进行过交谈，他是一家具有影响力的媒体公司的拥有者，他建议我将公司卖给R0001新闻和媒体集团，因为他们的影响力较大，且与我公司业务有一定的契合度。 另一方面，我的三个儿子C0001、C0002和女儿C0003都对接管公司表示了兴趣。他们各自都有自己的理想和目标，但我觉得他们还不够成熟，没有足够的经验和能力来抵御市场的风险，确保公司的稳定发展。我告诉他们，我正在考虑出售公司，这并不是对他们的否定，而是我对公司未来发展的一种考虑。 接下来，我会继续寻找适合接手公司的候选人，并考虑C0005的建议，将公司卖给R0001新闻和媒体集团。同时，我也会鼓励我的孩子们继续提升自己，无论公司的归属如何，他们都能在未来的商业世界中有所作为。',
      message: '你和C0005进行了交谈，我希望你能告诉我你们的谈话内容。我一直是你的接班人，我了解公司的运作，我也理解你的期望。我知道我有很多需要改进的地方，但我希望你能给我一个机会。我可以和C0001建立联盟，他们的新闻和媒体集团对我们公司有着重要的影响。我也希望你能考虑我的提议，让我继承公司，我会尽我最大的努力，不让你失望的。'
    },
    // {
    //   from: {name: 'C000', profilePhoto: '/profile/pic1.jpg'},
    //   to: {name: 'C000', profilePhoto: '/profile/pic1.jpg'},
    //   fromSummary: '',
    //   toSummary: '',
    //   message: ''
    // },
  ]

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

  const [current, setCurrent] = useState(2)
  const [stage, setStage] = useState(0)

  let rounds = [
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
    {
      name: 'Round 1',
      icon: 'outlined_people',
      iconSize: 21,
      progressIcon: 'outlined_check_circle',
      progressIconSize: 21,
    },
    {
      name: 'Round 2',
      icon: 'outlined_people',
      iconSize: 21,
      progressIcon: 'outlined_check_circle',
      progressIconSize: 21,
    },
    {
      name: 'Round 3',
      icon: 'outlined_people',
      iconSize: 21,
      progress: '3/8',
    },
    {
      name: 'Round 4',
      icon: 'outlined_people',
      iconSize: 21,
    },
    {
      name: 'Final',
      icon: 'outlined_event_available',
      iconSize: 21,
    },
  ]
  let stages = [
    '对抗阶段',
    '合作阶段',
    '更新阶段',
  ]

  return (
    <main className={styles.Show}>
      <div className={clsx(styles.scroll, styles.leftBar)}>
        <div className={styles.title}>Suc Arena</div>
        <div className={styles.subtitle}>Process Menu</div>
        {
          rounds.map((item, index) => {
            return <div className={clsx(styles.selectable, index == current ? styles.selectableSelected : '', styles.item)}
              onClick={e => {
                setCurrent(index)
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
          <div className={styles.topBar}>
            {
              stages.map((item, index) => {
                return <div
                  className={clsx(styles.selectable, index == stage ? styles.selectableSelected : '', styles.item)}
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
            {
              content.map((item, index) => {
                return <div className={styles.message} key={index}>
                  <div className={styles.info}>
                    <div className={clsx(styles.item, styles.from)}>
                      <img src='/profile/user.png' alt=''/>
                    </div>
                    <div className={clsx(styles.between)}>
                      <span>{item.from.name}</span>
                      <Icon size='20px' color='#00345b'>east</Icon>
                      <span>{item.to.name}</span>
                    </div>
                    <div className={clsx(styles.item, styles.to)}>
                      <img src='/profile/user.png' alt=''/>
                    </div>
                  </div>
                  <div className={styles.text}>
                    <Icon className={styles.link}>round_all_inclusive</Icon>
                    {item.message}
                  </div>
                </div>
              })
            }
          </div>
          <div className={styles.hover}>

          </div>
          <div className={styles.control}>
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
