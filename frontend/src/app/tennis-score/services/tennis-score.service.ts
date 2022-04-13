import {Injectable} from '@angular/core';
import {TennisGameScoreEnum} from "../models/tennis-game-score-enum";
import {TennisMatch} from "../models/tennis-match.model";
import {TennisMatchSettings} from "../models/tennis-match-settings.model";
import {TennisMatchScore} from "../models/tennis-match-score.model";

@Injectable({
  providedIn: 'root'
})
export class TennisScoreService {

  constructor() {
  }

  public initMatch(match: TennisMatch): void {
    match.player1Score = {
      sets: [],
      inGamePoints: TennisGameScoreEnum.Love
    };
    match.player2Score = {
      sets: [],
      inGamePoints: TennisGameScoreEnum.Love
    };

    for (let i = 0; i < match.settings.bestOfSets; i++) {
      match.player1Score.sets.push(0);
      match.player2Score.sets.push(0);
    }
  }

  /**
   * @throws {Error}, if match is finished
   */
  public addPointForPlayer1(match: TennisMatch): void {
    if (this.isMatchFinished(match)) {
      throw new Error('match is already finished');
    }
    this.addPoint(match.player1Score, match.player2Score, match.settings);
  }

  /**
   * @throws {Error}, if match is finished
   */
  public addPointForPlayer2(match: TennisMatch): void {
    if (this.isMatchFinished(match)) {
      throw new Error('match is already finished');
    }
    this.addPoint(match.player2Score, match.player1Score, match.settings);
  }

  private addPoint(playerScoreWithPoint: TennisMatchScore, otherPlayerScore: TennisMatchScore, settings: TennisMatchSettings): void {
    //TODO: handle deciding match tie break
    let gameWon: boolean = this.isGameWon(settings, playerScoreWithPoint, otherPlayerScore);

    if (gameWon) {
      this.resetInGame(playerScoreWithPoint, otherPlayerScore);
      this.addGameForPlayer(playerScoreWithPoint, otherPlayerScore, settings);
    } else {
      playerScoreWithPoint.inGamePoints++;
    }
  }

  private resetInGame(player1Score: TennisMatchScore, player2Score: TennisMatchScore): void {
    player1Score.inGamePoints = TennisGameScoreEnum.Love;
    player2Score.inGamePoints = TennisGameScoreEnum.Love;
  }

  private isGameWon(settings: TennisMatchSettings, playerWithPointScore: TennisMatchScore, opponentScore: TennisMatchScore): boolean {
    if (this.isTieBreak(settings, playerWithPointScore, opponentScore)) {
      return this.isTieBreakWon(settings, playerWithPointScore.inGamePoints, opponentScore.inGamePoints);
    }

    if (playerWithPointScore.inGamePoints === TennisGameScoreEnum.Advantage) {
      return true;
    }
    if (settings.isNoAdvantage && playerWithPointScore.inGamePoints === TennisGameScoreEnum.Forty) {
      return true;
    }
    return playerWithPointScore.inGamePoints === TennisGameScoreEnum.Forty
      && !(opponentScore.inGamePoints in [TennisGameScoreEnum.Forty, TennisGameScoreEnum.Advantage]);
  }

  private isTieBreak(settings: TennisMatchSettings, player1Score: TennisMatchScore, player2Score: TennisMatchScore): boolean {
    //TODO: handle deciding match tie break
    let currentSetIndex: number = this.getIndexOfCurrentSet(player1Score, player2Score, settings);
    return player1Score.sets[currentSetIndex] === player2Score.sets[currentSetIndex]
      && player1Score.sets[currentSetIndex] === settings.gamesPerSet;
  }

  private isTieBreakWon(settings: TennisMatchSettings, pointsOfPlayerWithScore: number, pointsOfOpponent: number): boolean {
    //TODO: handle deciding match tie break
    const tieBreakWinPoints: number = settings.tieBreakStandardPoints;
    return pointsOfPlayerWithScore >= tieBreakWinPoints && (pointsOfPlayerWithScore - pointsOfOpponent) >= 2;
  }

  private addGameForPlayer(playerScoreWithPoints: TennisMatchScore, otherPlayerScore: TennisMatchScore, settings: TennisMatchSettings): void {
    let currentSetIndex: number = this.getIndexOfCurrentSet(playerScoreWithPoints, otherPlayerScore, settings);
    playerScoreWithPoints.sets[currentSetIndex]++;
  }

  /**
   * @throws {Error}, if match is finished
   */
  private getIndexOfCurrentSet(player1Score: TennisMatchScore, player2Score: TennisMatchScore, settings: TennisMatchSettings): number {
    for (let i = 0; i < settings.bestOfSets; i++) {
      if (!this.isSetFinished(player1Score.sets[i], player2Score.sets[i], settings)) {
        return i;
      }
    }
    throw new Error('match is already finished');
  }

  private isSetFinished(gamesPlayer1: number, gamesPlayer2: number, settings: TennisMatchSettings): boolean {
    //TODO: handle match tie break
    if (gamesPlayer1 === settings.gamesPerSet + 1 ||
      gamesPlayer2 === settings.gamesPerSet + 1) {
      return true;
    }
    const gameDifference = Math.abs(gamesPlayer1 - gamesPlayer2);
    return gameDifference >= 2 && (gamesPlayer1 === settings.gamesPerSet || gamesPlayer2 === settings.gamesPerSet);
  }

  private isMatchFinished(match: TennisMatch): boolean {
    try {
      this.getIndexOfCurrentSet(match.player1Score, match.player2Score, match.settings);
    } catch (e) {
      return true;
    }
    return false;
  }
}
