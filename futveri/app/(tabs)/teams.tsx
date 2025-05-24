import React from 'react';
import { StyleSheet, View } from 'react-native';

import TeamSeasonsScreen from '../screens/TeamSeasonScreen';

export default function Teams() {
  return (
    <View style={styles.container}>
      <TeamSeasonsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 20,
  },
});
