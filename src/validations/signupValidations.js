// Email validation for signup
export const emailValidation = {
  required: "Email is required!",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address!",
  },
};

// Password validation for signup with additional security requirements
export const passwordValidation = {
  required: "Password is required!",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters long.",
  },
  pattern: {
    value: /^(?=.*[A-Z])(?=.*\d)/,
    message: "Password must include at least one uppercase letter and one number.",
  },
  includesSpecialChar: (value) =>
    /[!@#$%^&*]/.test(value) || "Password must include a special character.",
};

// Name validation for signup
export const nameValidation = {
  required: "Name is required!",
  minLength: {
    value: 2,
    message: "Name must be at least 2 characters long.",
  },
};

// Store-related validations for signup
export const storeValidations = {
  storeName: {
    required: "Store Name is required!",
    minLength: {
      value: 3,
      message: "Store Name must be at least 3 characters long.",
    },
  },
  storePhone: {
    required: "Store Phone is required!",
    pattern: {
      value: /^\+90\d{10}$/,
      message: "Invalid Türkiye phone number format!",
    },
  },
  storeTaxID: {
    required: "Store Tax ID is required!",
    pattern: {
      value: /^T\d{4}V\d{6}$/,
      message: "Invalid Tax ID format!",
    },
  },
  storeBankAccount: {
    required: "Store Bank Account is required!",
    pattern: {
      value: /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/,
      message: "Invalid IBAN format!",
    },
  },
};
