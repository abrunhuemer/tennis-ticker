import {TennisGameEnum} from "./tennis-game-enum";

export class TennisMatch {
  playerName1: string;
  playerName2: string;
  setsPlayer1: number[];
  setsPlayer2: number[];
  inGamePointsPlayer1: number;
  inGamePointsPlayer2: number;

  bestOfSets: number;
  gamesPerSet: number;
  tieBreakDecider: boolean;
  tieBreakDeciderPoints: number;
  isNoAdvantage: boolean;

  constructor(playerName1: string, playerName2: string, bestOfSets: number = 3, gamesPerSet: number = 6,
              tieBreakDecider: boolean = false, tieBreakDeciderPoints: number = 10, isNoAdvantage: boolean = false) {
    this.playerName1 = playerName1;
    this.playerName2 = playerName2;
    this.bestOfSets = bestOfSets;
    this.gamesPerSet = gamesPerSet;
    this.tieBreakDecider = tieBreakDecider;
    this.tieBreakDeciderPoints = tieBreakDeciderPoints;
    this.isNoAdvantage = isNoAdvantage;

    this.initSets(bestOfSets);
  }

  private initSets(bestOfSets: number): void {
    this.setsPlayer1 = [];
    this.setsPlayer2 = [];
    for (let i = 0; i < bestOfSets; i++) {
      this.setsPlayer1.push(0);
      this.setsPlayer2.push(0);
    }
    this.resetInGame();
  }

  public addPoint(isPointByPlayer1: boolean): void {
    let inGameOfPlayerWithPoint: number = isPointByPlayer1 ? this.inGamePointsPlayer1 : this.inGamePointsPlayer2;
    let inGameOfOpponent: number = isPointByPlayer1 ? this.inGamePointsPlayer2 : this.inGamePointsPlayer1;
    let gameWon: boolean = this.isGameWon(inGameOfPlayerWithPoint, inGameOfOpponent);

    if (gameWon) {
      this.resetInGame();
      this.addGameForPlayer(isPointByPlayer1);
    } else {
      this.addPointForPlayer(isPointByPlayer1);
    }
  }

  private isGameWon(inGameOfPlayerWithPoint: number, inGameOfOpponent: number): boolean {
    if (inGameOfPlayerWithPoint === TennisGameEnum.Advantage) {
      return true;
    }
    if (this.isNoAdvantage && inGameOfPlayerWithPoint === TennisGameEnum.Forty) {
      return true;
    }
    return inGameOfPlayerWithPoint === TennisGameEnum.Forty && inGameOfOpponent !== TennisGameEnum.Forty;

  }

  private resetInGame(): void {
    this.inGamePointsPlayer1 = TennisGameEnum.Love;
    this.inGamePointsPlayer2 = TennisGameEnum.Love;
  }

  private addPointForPlayer(isPointByPlayer1: boolean): void {
    if (isPointByPlayer1) {
      this.inGamePointsPlayer1++;
    } else {
      this.inGamePointsPlayer2++;
    }
  }

  private addGameForPlayer(isPointByPlayer1: boolean): void {
    let currentSetIndex: number = this.getIndexForCurrentSet();
    if (isPointByPlayer1) {
      this.setsPlayer1[currentSetIndex]++;
    } else {
      this.setsPlayer2[currentSetIndex]++;
    }
  }

  /**
   * returns the index of the currently played set or -1 if match ended
   * @private
   */
  private getIndexForCurrentSet(): number {
    for (let i = 0; i < this.bestOfSets; i++) {
      if (this.isSetFinished(i)) {
        return i;
      }
    }
    return -1;
  }

  private isSetFinished(setIndex: number): boolean {
    if (this.setsPlayer1[setIndex] === this.gamesPerSet + 1 ||
      this.setsPlayer2[setIndex] === this.gamesPerSet + 1) {
      return true;
    }
    const gameDifference = Math.abs(this.setsPlayer1[setIndex] - this.setsPlayer2[setIndex]);
    return gameDifference >= 2 && (this.setsPlayer1[setIndex] === this.gamesPerSet || this.setsPlayer2[setIndex] === 6);
  }
}
