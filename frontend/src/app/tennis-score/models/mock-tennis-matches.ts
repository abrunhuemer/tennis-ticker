import {TennisMatch} from "./tennis-match.model";
import {DEFAULT_MATCH_SETTINGS} from "./tennis-match-settings.model";
import {TennisGameScoreEnum} from "./tennis-game-score-enum";

export const MATCHES: TennisMatch[] = [
  {
    playerName1: 'Bernhard',
    playerName2: 'Alexander',
    player1Score: {
      sets: [0,0,0],
      inGamePoints: TennisGameScoreEnum.Love
    },
    player2Score: {
      sets: [0,0,0],
      inGamePoints: TennisGameScoreEnum.Love
    },
    settings: Object.create(DEFAULT_MATCH_SETTINGS)
  },
  {
    playerName1: 'Julia',
    playerName2: 'Lisa',
    player1Score: {
      sets: [0,0,0],
      inGamePoints: TennisGameScoreEnum.Love
    },
    player2Score: {
      sets: [0,0,0],
      inGamePoints: TennisGameScoreEnum.Love
    },
    settings: Object.create(DEFAULT_MATCH_SETTINGS)
  }
]
