export interface TennisMatchSettings {
  bestOfSets: number;
  gamesPerSet: number;
  tieBreakDecider: boolean;
  tieBreakDeciderPoints?: number;
  tieBreakStandardPoints: number;
  isNoAdvantage: boolean;
}

export const DEFAULT_MATCH_SETTINGS: TennisMatchSettings = {
  bestOfSets: 3,
  gamesPerSet: 6,
  tieBreakDecider: false,
  tieBreakDeciderPoints: undefined,
  tieBreakStandardPoints: 7,
  isNoAdvantage: false
}
