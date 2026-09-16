export const DEPARTMENTS = [
  'Engineering',
  'Sales',
  'Support',
  'Marketing',
  'Operations',
] as const;

export type Department = (typeof DEPARTMENTS)[number];

export interface EntryFormData {
  fullName: string;
  department: Department;
  entryDate: string;
  urgent: boolean;
}

export interface StoredEntry extends EntryFormData {
  id: string;
  submittedAt: string;
}

export interface FormErrors {
  fullName?: string;
}

export const createInitialFormData = (): EntryFormData => ({
  fullName: '',
  department: DEPARTMENTS[0],
  entryDate: new Date().toISOString(),
  urgent: false,
});
