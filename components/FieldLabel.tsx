import { StyleSheet, Text } from 'react-native';

import { colors } from '../constants/theme';

interface FieldLabelProps {
  children: string;
}

export function FieldLabel({ children }: FieldLabelProps) {
  return (
    <Text style={styles.label} accessibilityRole="text">
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
});
