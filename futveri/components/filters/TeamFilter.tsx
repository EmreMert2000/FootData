import React, { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList, TouchableOpacity, ListRenderItem } from 'react-native';
import { ThemedText } from '../ThemedText';
import { TeamFilterProps } from './FilterTypes';

export const TeamFilter: React.FC<TeamFilterProps> = ({
  selectedTeam,
  teams,
  onTeamChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTeamName = teams.find((team) => team.id === selectedTeam)?.name;

  const renderItem: ListRenderItem<{ id: string; name: string }> = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        onTeamChange(item.id);
        setSearchQuery(item.name);
        setIsDropdownVisible(false);
      }}
    >
      <ThemedText>{item.name}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Takım Seçin</ThemedText>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setIsDropdownVisible(true);
          }}
          placeholder="Takım ara..."
          onFocus={() => setIsDropdownVisible(true)}
        />
        {isDropdownVisible && filteredTeams.length > 0 && (
          <View style={styles.dropdown}>
            <FlatList
              data={filteredTeams}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          </View>
        )}
      </View>
      {selectedTeam && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            onTeamChange(null);
            setSearchQuery('');
          }}
        >
          <ThemedText style={styles.clearButtonText}>Takımı Temizle</ThemedText>
        </TouchableOpacity>
      )}
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
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  clearButton: {
    marginTop: 8,
    padding: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FF3B30',
  },
}); 