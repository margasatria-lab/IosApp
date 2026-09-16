import { StyleSheet, Text } from 'react-native';

import { colors } from '../constants/theme';

interface ErrorTextProps {
  children?: string;
}

export function ErrorText({ children }: ErrorTextProps) {
  if (!children) {
    return null;
  }

  return (
    <Text style={styles.error} accessibilityRole="alert">
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.error,
    fontSize: 13,
    marginTop: 6,
  },
});
