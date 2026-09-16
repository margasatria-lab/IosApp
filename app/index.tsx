import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import { DateField } from '../components/DateField';
import { DepartmentField } from '../components/DepartmentField';
import { TextField } from '../components/TextField';
import { Toast } from '../components/Toast';
import { UrgentToggle } from '../components/UrgentToggle';
import { colors, MIN_TOUCH_TARGET } from '../constants/theme';
import { createInitialFormData, Department, EntryFormData, FormErrors } from '../types/form';
import { saveEntry } from '../utils/storage';

export default function EntryFormScreen() {
  const [formData, setFormData] = useState<EntryFormData>(createInitialFormData());
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const validate = (data: EntryFormData): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!data.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.';
    }
    return nextErrors;
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await saveEntry({
        fullName: formData.fullName.trim(),
        department: formData.department,
        entryDate: formData.entryDate,
        urgent: formData.urgent,
      });
      setFormData(createInitialFormData());
      setErrors({});
      setToastVisible(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        accessibilityLabel="Data capture form"
      >
        <Text style={styles.title}>New Entry</Text>
        <Text style={styles.subtitle}>Fill in the details below and submit.</Text>

        <TextField
          label="Full Name"
          placeholder="e.g. Jordan Rivera"
          value={formData.fullName}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, fullName: text }))}
          error={errors.fullName}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="done"
        />

        <DepartmentField
          value={formData.department}
          onChange={(department: Department) =>
            setFormData((prev) => ({ ...prev, department }))
          }
        />

        <DateField
          value={new Date(formData.entryDate)}
          onChange={(date) =>
            setFormData((prev) => ({ ...prev, entryDate: date.toISOString() }))
          }
        />

        <UrgentToggle
          value={formData.urgent}
          onChange={(urgent) => setFormData((prev) => ({ ...prev, urgent }))}
        />

        <Pressable
          style={({ pressed }) => [styles.submitButton, pressed && styles.submitButtonPressed]}
          onPress={handleSubmit}
          disabled={submitting}
          accessibilityRole="button"
          accessibilityLabel="Submit entry"
          accessibilityState={{ disabled: submitting }}
        >
          <Text style={styles.submitButtonText}>{submitting ? 'Saving…' : 'Submit'}</Text>
        </Pressable>
      </ScrollView>

      <Toast
        message="Entry saved"
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    marginBottom: 24,
  },
  submitButton: {
    minHeight: MIN_TOUCH_TARGET,
    backgroundColor: colors.accent,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonPressed: {
    opacity: 0.85,
  },
  submitButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '700',
  },
});
