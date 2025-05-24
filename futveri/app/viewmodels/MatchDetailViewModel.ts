import { makeAutoObservable, runInAction } from 'mobx';
import type { Match } from '../models/Match';
import footballDataService from '../services/FootballDataService';

export class MatchDetailViewModel {
  match: Match | null = null;
  matchStats: any[] | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMatchDetail(matchId: string) {
    this.loading = true;
    this.error = null;

    try {
      const match = await footballDataService.getMatchById(matchId);
      const stats = await footballDataService.getMatchStatsById(matchId);

      runInAction(() => {
        if (match !== undefined && match !== null) {
          this.match = {
            id: match.fixture.id.toString(),
            homeTeam: match.teams.home.name,
            awayTeam: match.teams.away.name,
            homeScore: match.goals.home,
            awayScore: match.goals.away,
            date: match.fixture.date,
            status: match.fixture.status.short === 'FT' ? 'finished' : match.fixture.status.short === 'NS' ? 'scheduled' : 'live',
            league: match.league.name,
          };
        } else {
          this.error = 'Maç bulunamadı.';
        }

        this.matchStats = stats;
      });
    } catch (e) {
      runInAction(() => {
        this.error = 'Detaylar alınırken bir hata oluştu.';
        console.error(e);
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}
