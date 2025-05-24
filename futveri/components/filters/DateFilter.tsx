import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { ThemedText } from '../ThemedText';
import { DateFilterProps } from './FilterTypes';

export const DateFilter: React.FC<DateFilterProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const markedDates = selectedDate
    ? {
        [selectedDate.toISOString().split('T')[0]]: {
          selected: true,
          selectedColor: '#007AFF',
        },
      }
    : {};

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Tarih Seçin</ThemedText>
      <Calendar
        onDayPress={(day: DateData) => {
          onDateChange(new Date(day.dateString));
        }}
        markedDates={markedDates}
        theme={{
          todayTextColor: '#007AFF',
          selectedDayBackgroundColor: '#007AFF',
          selectedDayTextColor: '#FFFFFF',
        }}
      />
      {selectedDate && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => onDateChange(null)}
        >
          <ThemedText style={styles.clearButtonText}>Tarihi Temizle</ThemedText>
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
  clearButton: {
    marginTop: 8,
    padding: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FF3B30',
  },
}); 