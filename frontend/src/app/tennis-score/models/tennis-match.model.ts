import {TennisMatchSettings} from "./tennis-match-settings.model";
import {TennisMatchScore} from "./tennis-match-score.model";

export interface TennisMatch {
  playerName1: string;
  playerName2: string;

  player1Score: TennisMatchScore;
  player2Score: TennisMatchScore;

  settings: TennisMatchSettings;
}
