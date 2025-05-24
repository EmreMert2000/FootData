import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '../ThemedText';
import { LeagueFilterProps } from './FilterTypes';

export const LeagueFilter: React.FC<LeagueFilterProps> = ({
  selectedLeague,
  leagues,
  onLeagueChange,
}) => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Lig Seçin</ThemedText>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedLeague ?? ""}
          onValueChange={(itemValue: string) => onLeagueChange(itemValue === "" ? null : itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Tüm Ligler" value="" />
          {leagues.map((league) => (
            <Picker.Item
              key={league.id}
              label={league.name}
              value={league.id}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
}); 