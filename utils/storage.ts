import AsyncStorage from '@react-native-async-storage/async-storage';

import type { StoredEntry } from '../types/form';

const STORAGE_KEY = '@iosapp/entries';

const generateId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

export const saveEntry = async (
  entry: Omit<StoredEntry, 'id' | 'submittedAt'>
): Promise<StoredEntry> => {
  const stored: StoredEntry = {
    ...entry,
    id: generateId(),
    submittedAt: new Date().toISOString(),
  };

  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  const existing: StoredEntry[] = raw ? JSON.parse(raw) : [];
  const next = [...existing, stored];

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return stored;
};

export const getEntries = async (): Promise<StoredEntry[]> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};
