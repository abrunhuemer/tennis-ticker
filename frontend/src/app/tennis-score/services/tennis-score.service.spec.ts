import {TestBed} from '@angular/core/testing';

import {TennisScoreService} from './tennis-score.service';
import {initDefaultTennisMatch} from "../models/mock-tennis-matches";
import {TennisMatch} from "../models/tennis-match.model";
import {expect} from "@angular/flex-layout/_private-utils/testing";
import {TennisGameScoreEnum} from "../models/tennis-game-score-enum";

describe('TennisScoreService', () => {
  let service: TennisScoreService;
  let match: TennisMatch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TennisScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add simple in game point', () => {
    match = initDefaultTennisMatch('playerA', 'playerB');
    service.addPointForPlayer1(match);
    expect(match.player1Score.inGamePoints).toEqual(TennisGameScoreEnum.Fifteen);
    expect(match.player2Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player1Score.sets[0]).toEqual(0);
    expect(match.player2Score.sets[0]).toEqual(0);

    service.addPointForPlayer1(match);
    service.addPointForPlayer2(match);

    expect(match.player1Score.inGamePoints).toEqual(TennisGameScoreEnum.Thirty);
    expect(match.player2Score.inGamePoints).toEqual(TennisGameScoreEnum.Fifteen);
    expect(match.player1Score.sets[0]).toEqual(0);
    expect(match.player2Score.sets[0]).toEqual(0);
  });

  it('should end game in standard way after four points and no deuce', () => {
    match = initDefaultTennisMatch('playerA', 'playerB');
    for (let i = 0; i < 4; i++) {
      service.addPointForPlayer1(match);
    }
    expect(match.player1Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player2Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player1Score.sets[0]).toEqual(1);
    expect(match.player2Score.sets[0]).toEqual(0);

    service.addPointForPlayer1(match);
    service.addPointForPlayer1(match);
    for (let i = 0; i < 4; i++) {
      service.addPointForPlayer2(match);
    }

    expect(match.player1Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player2Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player1Score.sets[0]).toEqual(1);
    expect(match.player2Score.sets[0]).toEqual(1);
  });

  it('should not end game after point at deuce and no no-ad', () => {
    match = initDefaultTennisMatch('playerA', 'playerB');
    for (let i = 0; i < 3; i++) {
      service.addPointForPlayer1(match);
      service.addPointForPlayer2(match);
    }

    service.addPointForPlayer1(match);
    expect(match.player1Score.inGamePoints).toEqual(TennisGameScoreEnum.Advantage);
    expect(match.player2Score.inGamePoints).toEqual(TennisGameScoreEnum.Forty);
    expect(match.player1Score.sets[0]).toEqual(0);
    expect(match.player2Score.sets[0]).toEqual(0);
  });

  it('should end game if point at advantage', () => {
    match = initDefaultTennisMatch('playerA', 'playerB');
    for (let i = 0; i < 3; i++) {
      service.addPointForPlayer1(match);
      service.addPointForPlayer2(match);
    }
    service.addPointForPlayer1(match);
    service.addPointForPlayer1(match);
    expect(match.player1Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player2Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player1Score.sets[0]).toEqual(1);
    expect(match.player2Score.sets[0]).toEqual(0);
  });

  it('should be 40-40 after A-40 if player with 40 makes point', () => {
    match = initDefaultTennisMatch('playerA', 'playerB');
    for (let i = 0; i < 3; i++) {
      service.addPointForPlayer1(match);
      service.addPointForPlayer2(match);
    }
    service.addPointForPlayer1(match);
    service.addPointForPlayer2(match);
    expect(match.player1Score.inGamePoints).toEqual(TennisGameScoreEnum.Forty);
    expect(match.player2Score.inGamePoints).toEqual(TennisGameScoreEnum.Forty);
    expect(match.player1Score.sets[0]).toEqual(0);
    expect(match.player2Score.sets[0]).toEqual(0);
  });

  it('game should end at 40-40 if no-ad is active', () => {
    match = initDefaultTennisMatch('playerA', 'playerB');
    match.settings.isNoAdvantage = true;
    for (let i = 0; i < 3; i++) {
      service.addPointForPlayer1(match);
      service.addPointForPlayer2(match);
    }
    service.addPointForPlayer2(match);
    expect(match.player1Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player2Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player1Score.sets[0]).toEqual(0);
    expect(match.player2Score.sets[0]).toEqual(1);
  });

  it('end set after gamesPerSet is reached', () => {
    match = initDefaultTennisMatch('playerA', 'playerB');
    for (let i = 0; i < 28; i++) {
      service.addPointForPlayer1(match);
    }

    expect(match.player1Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player2Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player1Score.sets[0]).toEqual(6);
    expect(match.player2Score.sets[0]).toEqual(0);
    expect(match.player1Score.sets[1]).toEqual(1);
    expect(match.player2Score.sets[1]).toEqual(0);
  });

  it('should throw error if point is added on finished match', () => {
    match = initDefaultTennisMatch('playerA', 'playerB');
    match.settings.bestOfSets = 1;
    for (let i = 0; i < 24; i++) {
      service.addPointForPlayer1(match);
    }
    expect(() => service.addPointForPlayer1(match)).toThrowError('match is already finished');
  });

  it('isMatchFinished should return true if match is finished', () => {
    match = initDefaultTennisMatch('playerA', 'playerB');
    match.settings.bestOfSets = 1;
    for (let i = 0; i < 24; i++) {
      service.addPointForPlayer1(match);
    }
    expect(service.isMatchFinished(match)).toBeTrue();
  });

  it('isMatchFinished should return false if match is not finished', () => {
    match = initDefaultTennisMatch('playerA', 'playerB');
    expect(service.isMatchFinished(match)).toBeFalse();
  });

  it('set should not end at 6-5', () => {
    match = initDefaultTennisMatch('playerA', 'playerB');
    for (let i = 0; i < 20; i++) {
      service.addPointForPlayer1(match);
    }
    for (let i = 0; i < 20; i++) {
      service.addPointForPlayer2(match);
    }
    for (let i = 0; i < 4; i++) {
      service.addPointForPlayer1(match);
    }
    for (let i = 0; i < 4; i++) {
      service.addPointForPlayer2(match);
    }
    expect(match.player1Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player2Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player1Score.sets[0]).toEqual(6);
    expect(match.player2Score.sets[0]).toEqual(6);
    expect(match.player1Score.sets[1]).toEqual(0);
    expect(match.player2Score.sets[1]).toEqual(0);
  });

  it('tie break should not stop after 4 points', () => {
    match = initDefaultTennisMatch('playerA', 'playerB');
    match.player1Score.sets[0] = 6;
    match.player2Score.sets[0] = 6;

    for (let i = 0; i < 6; i++) {
      service.addPointForPlayer1(match);
    }
    expect(match.player1Score.inGamePoints).toEqual(6);
    expect(match.player2Score.inGamePoints).toEqual(0);
    expect(match.player1Score.sets[0]).toEqual(6);
    expect(match.player2Score.sets[0]).toEqual(6);
    expect(match.player1Score.sets[1]).toEqual(0);
    expect(match.player2Score.sets[1]).toEqual(0);
  });

  it('standard tie break should end after 7 points', () => {
    match = initDefaultTennisMatch('playerA', 'playerB');
    match.player1Score.sets[0] = 6;
    match.player2Score.sets[0] = 6;
    match.player1Score.inGamePoints = 6;
    service.addPointForPlayer1(match);
    expect(match.player1Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player2Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player1Score.sets[0]).toEqual(7);
    expect(match.player2Score.sets[0]).toEqual(6);
    expect(match.player1Score.sets[1]).toEqual(0);
    expect(match.player2Score.sets[1]).toEqual(0);
  });


  it('standard tie break should not end if point difference <= 2', () => {
    match = initDefaultTennisMatch('playerA', 'playerB');
    match.player1Score.sets[0] = 6;
    match.player2Score.sets[0] = 6;
    match.player1Score.inGamePoints = 6;
    match.player2Score.inGamePoints = 6;
    service.addPointForPlayer1(match);
    expect(match.player1Score.inGamePoints).toEqual(7);
    expect(match.player2Score.inGamePoints).toEqual(6);
    expect(match.player1Score.sets[0]).toEqual(6);
    expect(match.player2Score.sets[0]).toEqual(6);
    expect(match.player1Score.sets[1]).toEqual(0);
    expect(match.player2Score.sets[1]).toEqual(0);
  });

  it('standard tie break should end if point difference = 2 and enough points', () => {
    match = initDefaultTennisMatch('playerA', 'playerB');
    match.player1Score.sets[0] = 6;
    match.player2Score.sets[0] = 6;
    match.player1Score.inGamePoints = 6;
    match.player2Score.inGamePoints = 6;
    service.addPointForPlayer1(match);
    service.addPointForPlayer1(match);
    expect(match.player1Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player2Score.inGamePoints).toEqual(TennisGameScoreEnum.Love);
    expect(match.player1Score.sets[0]).toEqual(7);
    expect(match.player2Score.sets[0]).toEqual(6);
    expect(match.player1Score.sets[1]).toEqual(0);
    expect(match.player2Score.sets[1]).toEqual(0);
  })

  it('if match tie break is set, then final set should be a tie break', () => {
    expect(false).toBeTrue();
  })

  it('isMatchFinished should be true, after match tie break is over', () => {
    expect(false).toBeTrue();
  })
});

