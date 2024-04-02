
export default class StageConfigChinese {

  constructor(
    public name: string,
    public title: string,
    public description: string,
    public cover: string,
    public shadow: boolean = false,
  ) {
  }

  static Config(): StageConfigChinese {
    return new StageConfigChinese(
      '启动配置',
      'Start A Session',
      '设置回合数和对话轮次，然后单击“Start”创建会话，或者输入“Session ID”继续之前的会话。',
      '/background/5.jpg'
    )
  }

  static Character(): StageConfigChinese {
    return new StageConfigChinese(
      '人物角色',
      'Start A Session',
      '这是当前的游戏角色，除了已有角色，你可以自己定义新的角色。',
      '/background/5.jpg'
    )
  }

  static Resource(): StageConfigChinese {
    return new StageConfigChinese(
      '社会资源',
      'Start A Session',
      '这是当前的社会资源，除了已有社会资源，你可以自己定义新的社会资源。',
      '/background/5.jpg'
    )
  }

  static Overview(): StageConfigChinese {
    return new StageConfigChinese(
      '',
      'Agent Group Chat',
      'Welcome to Agent Group Chat. Here are the overall information of this session. You can see...',
      '/background/4.jpg'
    )
  }

  static Confrontation(): StageConfigChinese {
    return new StageConfigChinese(
      '对抗阶段',
      'Confrontation Stage',
      'In this stage, the main players are talking to their Enemies (a person in other camp). What are they talking about...',
      '/background/2.jpg'
    )
  }

  static Cooperation(): StageConfigChinese {
    return new StageConfigChinese(
      '合作阶段',
      'Cooperation Stage',
      'In this stage, the main players are talking to their teammates (a person his/her camp). What are they talking about...',
      '/background/9.jpg'
    )
  }

  static Announcement(): StageConfigChinese {
    return new StageConfigChinese(
      '宣言阶段',
      'Announcement Stage',
      'In this stage, all of the players are speaking in public to announce their resolve. What are they speaking about...',
      '/background/8.png',
      true
    )
  }

  static Update(): StageConfigChinese {
    return new StageConfigChinese(
      '更新阶段',
      'Update Stage',
      'In this stage, all of the players are changing their believes by the previous stages. What are they thinking about...',
      '/background/11.jpg'
    )
  }

  static Guess(): StageConfigChinese {
    return new StageConfigChinese(
      '预测阶段',
      'Guess Stage',
      'In this stage, all of the players are guessing the final winner. Who do they think will win the game...',
      '/background/1.jpg'
    )
  }

  static Vote(): StageConfigChinese {
    return new StageConfigChinese(
      '投票阶段',
      'Vote Stage',
      'In this stage, all of the players are voting for someone (including his/herself). Who do they vote for...',
      '/background/12.jpg'
    )
  }

  static VoteOthers(): StageConfigChinese {
    return new StageConfigChinese(
      '对外投票阶段',
      'Vote Others Stage',
      'In this stage, all of the players are voting for someone (expect his/herself). Who do they vote for...',
      '/background/10.jpg'
    )
  }

  static Introduction(): StageConfigChinese {
    return new StageConfigChinese(
      '',
      'Introduction Stage',
      'In this stage, all of the players are making their final declarations. What are they speaking about...',
      '/background/7.jpg'
    )
  }

}

