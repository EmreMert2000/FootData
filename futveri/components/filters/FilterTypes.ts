import React from 'react';

export interface DateFilterProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

export interface LeagueFilterProps {
  selectedLeague: string | null;
  leagues: Array<{ id: string; name: string }>;
  onLeagueChange: (leagueId: string | null) => void;
}

export interface TeamFilterProps {
  selectedTeam: string | null;
  teams: Array<{ id: string; name: string }>;
  onTeamChange: (teamId: string | null) => void;
}

export interface MatchStatusFilterProps {
  selectedStatus: 'finished' | 'live' | 'upcoming' | null;
  onStatusChange: (status: 'finished' | 'live' | 'upcoming' | null) => void;
}

export interface FilterMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilters: () => void;
  children: React.ReactNode;
} 