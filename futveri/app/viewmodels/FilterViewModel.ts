import { makeAutoObservable } from 'mobx';

export class FilterViewModel {
  selectedDate: Date | null = null;
  selectedLeague: string | null = null;
  selectedTeam: string | null = null;
  selectedStatus: 'finished' | 'live' | 'upcoming' | null = null;
  isFilterMenuVisible = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedDate(date: Date | null) {
    this.selectedDate = date;
  }

  setSelectedLeague(leagueId: string | null) {
    this.selectedLeague = leagueId;
  }

  setSelectedTeam(teamId: string | null) {
    this.selectedTeam = teamId;
  }

  setSelectedStatus(status: 'finished' | 'live' | 'upcoming' | null) {
    this.selectedStatus = status;
  }

  setFilterMenuVisible(visible: boolean) {
    this.isFilterMenuVisible = visible;
  }

  clearFilters() {
    this.selectedDate = null;
    this.selectedLeague = null;
    this.selectedTeam = null;
    this.selectedStatus = null;
  }

  get hasActiveFilters(): boolean {
    return (
      this.selectedDate !== null ||
      this.selectedLeague !== null ||
      this.selectedTeam !== null ||
      this.selectedStatus !== null
    );
  }
} 
export default new FilterViewModel();