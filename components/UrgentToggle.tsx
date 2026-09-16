import { StyleSheet, Switch, Text, View } from 'react-native';

import { colors, MIN_TOUCH_TARGET } from '../constants/theme';

interface UrgentToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function UrgentToggle({ value, onChange }: UrgentToggleProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Urgent</Text>
        <Text style={styles.helper}>Flag this entry for immediate attention</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.border, true: colors.accent }}
        thumbColor={colors.surface}
        accessibilityLabel="Urgent"
        accessibilityRole="switch"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: MIN_TOUCH_TARGET,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  helper: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
    maxWidth: 240,
  },
});
