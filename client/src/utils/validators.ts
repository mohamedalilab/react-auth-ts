export const required = (message = "This field is required") => {
  return (value: string) => {
    return value.trim() ? null : message;
  };
};

export const minLength = (
  length: number,
  message: string = `This Feild mest be at least ${length} characters`
) => {
  return (value: string) => {
    return value.length >= length ? null : message;
  };
};

export const emailFormat = (message: string = "Invalid email!") => {
  return (value: string) => {
    return /\S+@\S+\.\S+/.test(value) ? null : message;
  };
};

export const matchField = (field: string, message = "Fields do not match") => {
  return (value: string, values?: Record<string, string>) => {
    return value === values?.[field] ? null : message;
  };
};
