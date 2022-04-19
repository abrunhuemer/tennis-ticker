import {TennisMatch} from "./tennis-match.model";
import {DEFAULT_MATCH_SETTINGS} from "./tennis-match-settings.model";
import {TennisGameScoreEnum} from "./tennis-game-score-enum";

export const MATCHES: TennisMatch[] = [
  initDefaultTennisMatch('Bernhard', 'Alexander'),
  initDefaultTennisMatch('Julia', 'Lisa')
]

export function initDefaultTennisMatch(playerName1: string, playerName2: string): TennisMatch {
  return {
    playerName1: playerName1,
    playerName2: playerName2,
    player1Score: {
      sets: [0, 0, 0],
      inGamePoints: TennisGameScoreEnum.Love
    },
    player2Score: {
      sets: [0, 0, 0],
      inGamePoints: TennisGameScoreEnum.Love
    },
    settings: Object.create(DEFAULT_MATCH_SETTINGS)
  };
}
