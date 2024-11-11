
export default class StageConfig {

  constructor(
    public name: string,
    public title: string,
    public description: string,
    public cover: string,
    public shadow: boolean = false,
  ) {
  }

  static Config(): StageConfig {
    return new StageConfig(
      'Configuration',
      'Start A Session',
      'Set the number of rounds and dialogue turns, then click \'Start\' to create a session, or enter \'Session ID\' to continue a previous session.',
      '/background/5.jpg'
    )
  }

  static Character(): StageConfig {
    return new StageConfig(
      'Characters',
      'Start A Session',
      'This is the current game character. In addition to the existing characters, you can define new ones yourself.',
      '/background/5.jpg'
    )
  }

  static Resource(): StageConfig {
    return new StageConfig(
      'Resources',
      'Start A Session',
      'These are the current social resources. In addition to the existing social resources, you can define new ones yourself.',
      '/background/5.jpg'
    )
  }

  static Overview(): StageConfig {
    return new StageConfig(
      '',
      'Succession Arena',
      'Welcome to Succession Arena. Here are the overall information of this session. You can see...',
      '/background/4.jpg'
    )
  }

  static Confrontation(): StageConfig {
    return new StageConfig(
      'Confrontation Stage',
      'Confrontation Stage',
      'In this stage, the main players are talking to their Enemies (a person in other camp). What are they talking about...',
      '/background/2.jpg'
    )
  }

  static Cooperation(): StageConfig {
    return new StageConfig(
      'Cooperation Stage',
      'Cooperation Stage',
      'In this stage, the main players are talking to their teammates (a person his/her camp). What are they talking about...',
      '/background/9.jpg'
    )
  }

  static Announcement(): StageConfig {
    return new StageConfig(
      'Announcement Stage',
      'Announcement Stage',
      'In this stage, all of the players are speaking in public to announce their resolve. What are they speaking about...',
      '/background/8.png',
      true
    )
  }

  static Update(): StageConfig {
    return new StageConfig(
      'Update Stage',
      'Update Stage',
      'In this stage, all of the players are changing their believes by the previous stages. What are they thinking about...',
      '/background/11.jpg'
    )
  }

  static Guess(): StageConfig {
    return new StageConfig(
      'Guess Stage',
      'Guess Stage',
      'In this stage, all of the players are guessing the final winner. Who do they think will win the game...',
      '/background/1.jpg'
    )
  }

  static Vote(): StageConfig {
    return new StageConfig(
      'Vote Stage',
      'Vote Stage',
      'In this stage, all of the players are voting for someone (including his/herself). Who do they vote for...',
      '/background/12.jpg'
    )
  }

  static VoteOthers(): StageConfig {
    return new StageConfig(
      'Vote Others Stage',
      'Vote Others Stage',
      'In this stage, all of the players are voting for someone (expect his/herself). Who do they vote for...',
      '/background/10.jpg'
    )
  }

  static Introduction(): StageConfig {
    return new StageConfig(
      '',
      'Introduction Stage',
      'In this stage, all of the players are making their final declarations. What are they speaking about...',
      '/background/7.jpg'
    )
  }

}

