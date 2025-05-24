import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { MatchStatusFilterProps } from './FilterTypes';

type Status = 'finished' | 'live' | 'upcoming';

export const MatchStatusFilter: React.FC<MatchStatusFilterProps> = ({
  selectedStatus,
  onStatusChange,
}) => {
  const statuses: Array<{ id: Status; label: string }> = [
    { id: 'finished', label: 'Biten' },
    { id: 'live', label: 'Devam Eden' },
    { id: 'upcoming', label: 'Yaklaşan' },
  ];

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Maç Durumu</ThemedText>
      <View style={styles.buttonContainer}>
        {statuses.map((status) => (
          <TouchableOpacity
            key={status.id}
            style={[
              styles.statusButton,
              selectedStatus === status.id && styles.selectedButton,
            ]}
            onPress={() => onStatusChange(status.id)}
          >
            <ThemedText
              style={[
                styles.statusButtonText,
                selectedStatus === status.id && styles.selectedButtonText,
              ]}
            >
              {status.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  statusButtonText: {
    fontSize: 14,
  },
  selectedButtonText: {
    color: '#FFFFFF',
  },
}); 