import { useState, useEffect } from 'react';
import { Match } from '../models/Match';
import { FilterViewModel } from './FilterViewModel'; // Ensure this path is correct
import { FootballDataService } from '../services/FootballDataService';
import { makeAutoObservable, runInAction, action } from 'mobx';

import React from 'react';

export class HomeViewModel {
  matches: Match[] = [];
  loading: boolean = false;
  error: string | null = null;
  filterViewModel: FilterViewModel;
  searchQuery: string = '';
  private footballDataService: FootballDataService;

  constructor() {
    this.matches = [];
    this.loading = false;
    this.error = null;
    this.filterViewModel = new FilterViewModel();
    this.footballDataService = FootballDataService.getInstance();
    this.searchQuery = '';
    makeAutoObservable(this);
  }

  get filteredMatches(): Match[] {
    return this.matches.filter(match => {
      // Arama filtresi
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const matchText = `${match.homeTeam} ${match.awayTeam} ${match.league}`.toLowerCase();
        if (!matchText.includes(query)) return false;
      }

      // Tarih filtresi
      if (this.filterViewModel.selectedDate) {
        const matchDate = new Date(match.date).toDateString();
        const selectedDate = new Date(this.filterViewModel.selectedDate).toDateString();
        if (matchDate !== selectedDate) return false;
      }

      // Lig filtresi
      if (this.filterViewModel.selectedLeague && match.league !== this.filterViewModel.selectedLeague) {
        return false;
      }

      // Takım filtresi
      if (this.filterViewModel.selectedTeam && 
          match.homeTeam !== this.filterViewModel.selectedTeam && 
          match.awayTeam !== this.filterViewModel.selectedTeam) {
        return false;
      }

      // Durum filtresi
      if (this.filterViewModel.selectedStatus) {
        const matchStatus = this.getMatchStatus(match);
        if (matchStatus !== this.filterViewModel.selectedStatus) {
          return false;
        }
      }

      return true;
    });
  }

  private getMatchStatus(match: Match): 'finished' | 'live' | 'upcoming' {
    const now = new Date();
    const matchDate = new Date(match.date);

    if (match.status === 'finished') return 'finished';
    if (match.status === 'live') return 'live';
    if (matchDate > now) return 'upcoming';
    return 'finished';
  }

  setMatches(matches: Match[]) {
    this.matches = matches;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  setSearchQuery = action((query: string) => {
    this.searchQuery = query;
  });

  async fetchMatches() {
    try {
      this.setLoading(true);
      this.setError(null);
      const fetchedMatches = await this.footballDataService.getMatches();
      runInAction(() => {
        this.setMatches(fetchedMatches);
      });
    } catch (error) {
      runInAction(() => {
        this.setError('Maçlar yüklenirken bir hata oluştu');
        console.error('Maçlar yüklenirken hata:', error);
      });
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  }

  async refreshMatches() {
    await this.fetchMatches();
  }
}

export const useHomeViewModel = () => {
  const [viewModel] = React.useState(() => new HomeViewModel());

  React.useEffect(() => {
    viewModel.fetchMatches();
  }, []);

  const refreshMatches = () => {
    viewModel.fetchMatches();
  };

  return {
    ...viewModel,
    refreshMatches,
    filteredMatches: viewModel.filteredMatches,
    setSearchQuery: viewModel.setSearchQuery
  };
};

export default useHomeViewModel; 