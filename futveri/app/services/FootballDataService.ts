import { Match } from '../models/Match';

const API_KEY = 'API_KEY'; // API-Football anahtarın
const BASE_URL = 'Base_URL'; // API-Football temel URL'si

export class FootballDataService {
  async getMatchById(matchId: string): Promise<any | null> {
    try {
      const response = await fetch(`${BASE_URL}/fixtures?id=${matchId}`, {
        headers: this.headers,
      });

      if (!response.ok) throw this.handleError(response);

      const data = await response.json();
      return data.response?.[0] ?? null;
    } catch (error) {
      console.error(`Maç detayları alınırken hata:`, error);
      return null;
    }
  }
  private static instance: FootballDataService;
  private headers: Headers;

  private constructor() {
    this.headers = new Headers({
      'x-apisports-key': API_KEY,
      'Content-Type': 'application/json',
    });
  }

  public static getInstance(): FootballDataService {
    if (!FootballDataService.instance) {
      FootballDataService.instance = new FootballDataService();
    }
    return FootballDataService.instance;
  }

  /**
   * Canlı maçları getirir
   */
  async getMatches(): Promise<Match[]> {
    try {
      const response = await fetch(`${BASE_URL}/fixtures?live=all`, {
        headers: this.headers,
      });

      if (!response.ok) throw this.handleError(response);

      const data = await response.json();

      if (!data.response || !Array.isArray(data.response)) {
        throw new Error('API beklenen formatta veri döndürmedi.');
      }

      return data.response.map(this.mapMatchFromApi);
    } catch (error) {
      console.error('Maçlar getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * ID'ye göre maç detayını getirir
   */
  async getMatchStatsById(fixtureId: string): Promise<any[] | null> {
    try {
      const response = await fetch(`${BASE_URL}/fixtures/statistics?fixture=${fixtureId}`, {
        headers: this.headers,
      });
  
      if (!response.ok) throw this.handleError(response);
  
      const data = await response.json();
      return data.response ?? null;
    } catch (error) {
      console.error(`İstatistikler alınırken hata:`, error);
      return null;
    }
  }

  /**
   * API'den gelen veriyi `Match` modeline dönüştürür
   */
  private mapMatchFromApi = (match: any): Match => {
    return {
      id: match.fixture.id.toString(),
      homeTeam: match.teams.home.name,
      awayTeam: match.teams.away.name,
      homeScore: match.goals.home ?? 0,
      awayScore: match.goals.away ?? 0,
      date: match.fixture.date,
      status: this.mapMatchStatus(match.fixture.status.short),
      league: match.league.name,
    };
  };

  /**
   * Kısa API maç statülerini app içi statülere dönüştürür
   */
  private mapMatchStatus(apiStatus: string): 'scheduled' | 'live' | 'finished' {
    switch (apiStatus) {
      case 'NS':
        return 'scheduled'; // Not Started
      case '1H':
      case '2H':
      case 'LIVE':
      case 'ET':
      case 'P':
        return 'live';
      case 'FT':
      case 'AET':
      case 'PEN':
        return 'finished';
      default:
        return 'scheduled';
    }
  }

  /**
   * API yanıt hatalarını yorumlar
   */
  private handleError(response: Response): Error {
    if (response.status === 429) {
      return new Error('API rate limit aşıldı. Lütfen biraz bekleyin.');
    }
    if (response.status === 401) {
      return new Error('API anahtarı geçersiz.');
    }
    return new Error(`API hatası: ${response.status}`);
  }
}

export default FootballDataService.getInstance();
