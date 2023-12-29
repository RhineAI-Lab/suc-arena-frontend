
export default class StageConfig {

  constructor(
    public name: string,
    public title: string,
    public description: string,
    public cover: string,
    public shadow: boolean = false,
  ) {
  }

  static Start(): StageConfig {
    return new StageConfig(
      '',
      'Start A Session',
      'Set the number of rounds and dialogue turns, then click \'Start\' to create a session, or enter \'Session Id\' to continue a previous session.',
      '/background/5.jpg'
    )
  }
  static Overview(): StageConfig {
    return new StageConfig(
      '',
      'Succession Arena',
      'Example Session For UI Design. Only has one round now. Other descriptions...',
      '/background/4.jpg'
    )
  }

  static Confrontation(): StageConfig {
    return new StageConfig(
      '对抗阶段',
      'Confrontation Stage',
      'Example Session For UI Design. Only has one round now. Other descriptions...',
      '/background/2.jpg'
    )
  }

  static Cooperation(): StageConfig {
    return new StageConfig(
      '合作阶段',
      'Cooperation Stage',
      'Example Session For UI Design. Only has one round now. Other descriptions...',
      '/background/9.jpg'
    )
  }

  static Announcement(): StageConfig {
    return new StageConfig(
      '宣言阶段',
      'Announcement Stage',
      'Example Session For UI Design. Only has one round now. Other descriptions...',
      '/background/8.png',
      true
    )
  }

  static Update(): StageConfig {
    return new StageConfig(
      '更新阶段',
      'Update Stage',
      'Example Session For UI Design. Only has one round now. Other descriptions...',
      '/background/11.jpg'
    )
  }

  static Guess(): StageConfig {
    return new StageConfig(
      '预测阶段',
      'Guess Stage',
      'Example Session For UI Design. Only has one round now. Other descriptions...',
      '/background/1.jpg'
    )
  }

  static Vote(): StageConfig {
    return new StageConfig(
      '投票阶段',
      'Vote Stage',
      'Example Session For UI Design. Only has one round now. Other descriptions...',
      '/background/12.jpg'
    )
  }

  static VoteOthers(): StageConfig {
    return new StageConfig(
      '对外投票阶段',
      'Vote Others Stage',
      'Example Session For UI Design. Only has one round now. Other descriptions...',
      '/background/10.jpg'
    )
  }

}

