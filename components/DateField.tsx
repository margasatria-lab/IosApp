import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, MIN_TOUCH_TARGET } from '../constants/theme';
import { FieldLabel } from './FieldLabel';

interface DateFieldProps {
  value: Date;
  onChange: (value: Date) => void;
}

const formatDate = (date: Date): string =>
  date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const daysInMonth = (year: number, month: number): number => new Date(year, month + 1, 0).getDate();

// @react-native-community/datetimepicker has no web implementation, so the
// web build uses three plain dropdowns (backed by @react-native-picker/picker,
// which does work on web) instead of the native spinner.
function WebDateSelector({ value, onChange }: DateFieldProps) {
  const year = value.getFullYear();
  const month = value.getMonth();
  const day = value.getDate();

  const years = Array.from({ length: 11 }, (_, i) => year - 5 + i);
  const days = Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1);

  const setDate = (nextYear: number, nextMonth: number, nextDay: number) => {
    const clampedDay = Math.min(nextDay, daysInMonth(nextYear, nextMonth));
    onChange(new Date(nextYear, nextMonth, clampedDay));
  };

  return (
    <View style={styles.webSelectorRow}>
      <Picker
        style={styles.webSelectorPicker}
        selectedValue={month}
        onValueChange={(nextMonth) => setDate(year, Number(nextMonth), day)}
        accessibilityLabel="Month"
      >
        {MONTH_NAMES.map((name, index) => (
          <Picker.Item key={name} label={name} value={index} />
        ))}
      </Picker>
      <Picker
        style={styles.webSelectorPicker}
        selectedValue={day}
        onValueChange={(nextDay) => setDate(year, month, Number(nextDay))}
        accessibilityLabel="Day"
      >
        {days.map((d) => (
          <Picker.Item key={d} label={String(d)} value={d} />
        ))}
      </Picker>
      <Picker
        style={styles.webSelectorPicker}
        selectedValue={year}
        onValueChange={(nextYear) => setDate(Number(nextYear), month, day)}
        accessibilityLabel="Year"
      >
        {years.map((y) => (
          <Picker.Item key={y} label={String(y)} value={y} />
        ))}
      </Picker>
    </View>
  );
}

export function DateField({ value, onChange }: DateFieldProps) {
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setPickerVisible(false);
    }
    if (event.type === 'set' && selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <FieldLabel>Date of Entry</FieldLabel>
      <Pressable
        style={styles.trigger}
        onPress={() => setPickerVisible(true)}
        accessibilityRole="button"
        accessibilityLabel="Date of Entry"
        accessibilityHint="Opens date picker"
      >
        <Text style={styles.triggerText}>{formatDate(value)}</Text>
      </Pressable>

      {Platform.OS === 'android' && pickerVisible ? (
        <DateTimePicker value={value} mode="date" display="default" onChange={handleChange} />
      ) : null}

      {Platform.OS !== 'android' ? (
        <Modal visible={pickerVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalSheet}>
              <View style={styles.modalHeader}>
                <Pressable
                  onPress={() => setPickerVisible(false)}
                  accessibilityRole="button"
                  accessibilityLabel="Done"
                  hitSlop={8}
                >
                  <Text style={styles.doneText}>Done</Text>
                </Pressable>
              </View>
              {Platform.OS === 'web' ? (
                <WebDateSelector value={value} onChange={onChange} />
              ) : (
                <DateTimePicker
                  value={value}
                  mode="date"
                  display="spinner"
                  onChange={handleChange}
                  style={styles.spinner}
                />
              )}
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  trigger: {
    minHeight: MIN_TOUCH_TARGET,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
  },
  triggerText: {
    fontSize: 16,
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(17, 24, 39, 0.4)',
  },
  modalSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: MIN_TOUCH_TARGET,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  doneText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  spinner: {
    alignSelf: 'center',
  },
  webSelectorRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  webSelectorPicker: {
    flex: 1,
  },
});
