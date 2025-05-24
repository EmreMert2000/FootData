import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { MatchDetailViewModel } from '../viewmodels/MatchDetailViewModel';

const MatchDetailScreen = observer(() => {
  const { matchId } = useLocalSearchParams<{ matchId: string }>();
  const viewModel = new MatchDetailViewModel();

  useEffect(() => {
    if (matchId) {
      viewModel.fetchMatchDetail(matchId);
    }
  }, [matchId]);

  if (viewModel.loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (viewModel.error) {
    return (
      <View style={styles.centered}>
        <Text>{viewModel.error}</Text>
      </View>
    );
  }

  if (!viewModel.match) {
    return null;
  }

  const match = viewModel.match;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{match.homeTeam} vs {match.awayTeam}</Text>
      <Text style={styles.text}>Skor: {match.homeScore} - {match.awayScore}</Text>
      <Text style={styles.text}>Tarih: {new Date(match.date).toLocaleString()}</Text>
      <Text style={styles.text}>Durum: {match.status}</Text>
      <Text style={styles.text}>Lig: {match.league}</Text>

      {viewModel.matchStats && viewModel.matchStats.map((teamStats, idx) => (
        <View key={idx} style={styles.statsContainer}>
          <Text style={styles.subtitle}>{teamStats.team.name} İstatistikleri</Text>
          {teamStats.statistics.map((stat: any, sidx: number) => (
            <Text key={sidx} style={styles.text}>
              {stat.type}: {stat.value ?? 0}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 5 },
  text: { fontSize: 16, marginBottom: 4 },
  statsContainer: { marginTop: 10, marginBottom: 10 },
});

export default MatchDetailScreen;
