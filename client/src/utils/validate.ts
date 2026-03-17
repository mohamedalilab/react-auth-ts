type Values = Record<string, string>;

type ValidationErrors = Record<string, string>;

type Validator = (value: string, values?: Values) => string | null;

type ValidationSchema = Record<string, Validator[]>;

export function validate(
  values: Values,
  schema: ValidationSchema,
  fieldName?: string
) {
  const errors: ValidationErrors = {};

  const fieldsToValidate = fieldName ? [fieldName] : Object.keys(schema);

  for (const field of fieldsToValidate) {
    const validators = schema[field];
    if (!validators) continue;

    for (const validateField of validators) {
      const error = validateField(values[field], values);
      if (error) {
        errors[field] = error;
        break; // stop at first error per field
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
