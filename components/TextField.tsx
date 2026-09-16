import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { colors, MIN_TOUCH_TARGET } from '../constants/theme';
import { ErrorText } from './ErrorText';
import { FieldLabel } from './FieldLabel';

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export function TextField({ label, error, style, ...inputProps }: TextFieldProps) {
  return (
    <View style={styles.container}>
      <FieldLabel>{label}</FieldLabel>
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={colors.placeholder}
        accessibilityLabel={label}
        aria-invalid={!!error}
        {...inputProps}
      />
      <ErrorText>{error}</ErrorText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    minHeight: MIN_TOUCH_TARGET,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  inputError: {
    borderColor: colors.error,
  },
});
