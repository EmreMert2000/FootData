import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { FilterMenuProps } from './FilterTypes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const FilterMenu: React.FC<FilterMenuProps> = ({
  isVisible,
  onClose,
  onApplyFilters,
  children,
}) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['50%', '75%'], []);

  React.useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={onClose}
        backgroundStyle={styles.background}
      >
        <BottomSheetView style={styles.container}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>Filtreler</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <ThemedText>Kapat</ThemedText>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            {children}
          </View>
          <TouchableOpacity style={styles.applyButton} onPress={onApplyFilters}>
            <ThemedText style={styles.applyButtonText}>Uygula</ThemedText>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  applyButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 