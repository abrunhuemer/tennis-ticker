export interface TennisMatchSettings {
  bestOfSets: number;
  gamesPerSet: number;
  tieBreakDecider: boolean;
  tieBreakDeciderPoints?: number;
  isNoAdvantage: boolean;
}

export const DEFAULT_MATCH_SETTINGS: TennisMatchSettings = {
  bestOfSets: 3,
  gamesPerSet: 6,
  tieBreakDecider: false,
  tieBreakDeciderPoints: undefined,
  isNoAdvantage: false
}
