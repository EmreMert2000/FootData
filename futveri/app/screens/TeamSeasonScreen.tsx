import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { TeamSeasonsViewModel } from '../viewmodels/TeamSeasonsViewModel';

const TeamSeasonsScreen = observer(() => {
  const [viewModel] = useState(() => new TeamSeasonsViewModel());
  const teamId = "750";

  useEffect(() => {
    viewModel.loadSeasons(teamId);
  }, []);

  if (viewModel.loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" /></View>;
  }

  if (viewModel.error) {
    return <View style={styles.centered}><Text>{viewModel.error}</Text></View>;
  }

  if (viewModel.seasons.length === 0) {
    return <View style={styles.centered}><Text>Sezon bilgisi bulunamadı.</Text></View>;
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={viewModel.seasons}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => (
        <View style={styles.seasonItemContainer}>
          <Text style={styles.seasonItem}>{item} Sezonu</Text>
        </View>
      )}
    />
  );
});

const styles = StyleSheet.create({
  container: { padding: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  seasonItemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  seasonItem: { fontSize: 16, fontWeight: '600' },
});

export default TeamSeasonsScreen;