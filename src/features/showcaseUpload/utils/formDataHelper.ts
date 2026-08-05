export const fillFormData = (
  formData: FormData,
  data: Record<string, any>
): void => {
  Object.entries(data).forEach(([key, value]) => {
    if ( value === undefined) return;

    if (value === null) {
      formData.append(key, '');
      return;
    }

    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
      return;
    }

    if (typeof value === 'boolean') {
      formData.append(key, String(value));
      return;
    }

    formData.append(key, String(value));
  });
};