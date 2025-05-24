// viewmodels/TeamSeasonsViewModel.ts
import { makeAutoObservable } from "mobx";
import { fetchTeamSeasons } from "../services/TeamService";

export class TeamSeasonsViewModel {
  seasons: number[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadSeasons(teamId: string) {
    this.loading = true;
    this.error = null;

    try {
      const data = await fetchTeamSeasons(teamId);
      this.seasons = data;
    } catch (e: any) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  }
}