import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DateFilter, FilterMenu, LeagueFilter, MatchStatusFilter, TeamFilter } from '../../components/filters';
import { Match } from '../models/Match';
import { styles } from '../styles/home-screen.styles';
import { useHomeViewModel } from '../viewmodels/HomeViewModel';

interface MatchCardProps {
  match: Match;
};

const MatchCard: React.FC<MatchCardProps> = observer(({ match }) => {
  const router = useRouter();

  return (
    <View 
      style={styles.matchCard}
      onTouchEnd={() => router.push(`/match/${match.id}`)}
    >
      <Text style={styles.league}>{match.league}</Text>
      <View style={styles.teamsContainer}>
        <Text style={styles.teamName}>{match.homeTeam}</Text>
        <Text style={styles.score}>
          {match.status === 'scheduled' ? 'vs' : `${match.homeScore} - ${match.awayScore}`}
        </Text>
        <Text style={styles.teamName}>{match.awayTeam}</Text>
      </View>
      <Text style={styles.date}>{new Date(match.date).toLocaleDateString('tr-TR')}</Text>
    </View>
  );
});

const EmptyList = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>Henüz maç bulunmuyor</Text>
  </View>
);

const SearchBox = observer(({ viewModel }: { viewModel: ReturnType<typeof useHomeViewModel> }) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Takım veya lig ara..."
        value={viewModel.searchQuery}
        onChangeText={(text) => viewModel.setSearchQuery(text)}
        placeholderTextColor="#999"
      />
      {viewModel.searchQuery ? (
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={() => viewModel.setSearchQuery('')}
        >
          <Ionicons name="close-circle" size={20} color="#666" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
});

const HomeScreen: React.FC = observer(() => {
  const viewModel = useHomeViewModel();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await viewModel.refreshMatches();
    setRefreshing(false);
  }, [viewModel]);

  if (viewModel.loading && !refreshing && viewModel.matches.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Maçlar yükleniyor...</Text>
      </View>
    );
  }

  if (viewModel.error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{viewModel.error}</Text>
        <Text style={styles.retryText} onPress={viewModel.refreshMatches}>Tekrar Dene</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Maçlar</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => viewModel.filterViewModel.setFilterMenuVisible(true)}
        >
          <Ionicons 
            name="filter" 
            size={24} 
            color={viewModel.filterViewModel.hasActiveFilters ? '#007AFF' : '#666'} 
          />
        </TouchableOpacity>
      </View>

      <SearchBox viewModel={viewModel} />

      <FilterMenu
        isVisible={viewModel.filterViewModel.isFilterMenuVisible}
        onClose={() => viewModel.filterViewModel.setFilterMenuVisible(false)}
        onApplyFilters={() => viewModel.filterViewModel.setFilterMenuVisible(false)}
      >
        <DateFilter
          selectedDate={viewModel.filterViewModel.selectedDate}
          onDateChange={viewModel.filterViewModel.setSelectedDate}
        />
        <LeagueFilter
          selectedLeague={viewModel.filterViewModel.selectedLeague}
          leagues={Array.from(new Set(viewModel.matches.map(m => m.league))).map(league => ({
            id: league,
            name: league
          }))}
          onLeagueChange={viewModel.filterViewModel.setSelectedLeague}
        />
        <TeamFilter
          selectedTeam={viewModel.filterViewModel.selectedTeam}
          teams={Array.from(new Set(
            viewModel.matches.flatMap(m => [m.homeTeam, m.awayTeam])
          )).map(team => ({
            id: team,
            name: team
          }))}
          onTeamChange={viewModel.filterViewModel.setSelectedTeam}
        />
        <MatchStatusFilter
          selectedStatus={viewModel.filterViewModel.selectedStatus}
          onStatusChange={viewModel.filterViewModel.setSelectedStatus}
        />
      </FilterMenu>

      <FlatList
        data={viewModel.filteredMatches}
        renderItem={({ item }) => <MatchCard match={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
          />
        }
        ListEmptyComponent={!viewModel.loading ? EmptyList : null}
      />
    </View>
  );
});



export default HomeScreen; 