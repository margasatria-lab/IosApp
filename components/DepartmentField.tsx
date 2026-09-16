import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, MIN_TOUCH_TARGET } from '../constants/theme';
import { DEPARTMENTS, Department } from '../types/form';
import { FieldLabel } from './FieldLabel';

interface DepartmentFieldProps {
  value: Department;
  onChange: (value: Department) => void;
}

export function DepartmentField({ value, onChange }: DepartmentFieldProps) {
  const [pickerVisible, setPickerVisible] = useState(false);

  if (Platform.OS === 'android') {
    return (
      <View style={styles.container}>
        <FieldLabel>Department</FieldLabel>
        <View style={styles.androidPickerWrapper}>
          <Picker<Department>
            selectedValue={value}
            onValueChange={onChange}
            accessibilityLabel="Department"
            dropdownIconColor={colors.accent}
          >
            {DEPARTMENTS.map((department) => (
              <Picker.Item key={department} label={department} value={department} />
            ))}
          </Picker>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FieldLabel>Department</FieldLabel>
      <Pressable
        style={styles.trigger}
        onPress={() => setPickerVisible(true)}
        accessibilityRole="button"
        accessibilityLabel="Department"
        accessibilityHint="Opens department picker"
      >
        <Text style={styles.triggerText}>{value}</Text>
      </Pressable>

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
            <Picker<Department> selectedValue={value} onValueChange={onChange}>
              {DEPARTMENTS.map((department) => (
                <Picker.Item key={department} label={department} value={department} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
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
  androidPickerWrapper: {
    minHeight: MIN_TOUCH_TARGET,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.surface,
    overflow: 'hidden',
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
});
