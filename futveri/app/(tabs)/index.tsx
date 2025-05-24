import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';

export default function Index() {
  return (
    <View style={styles.container}> //Mobile App Test Commit 
      <HomeScreen />
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
