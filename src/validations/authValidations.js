export const emailValidation = {
  required: "Email is required!",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address!",
  },
};

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

export const nameValidation = {
  required: "Name is required!",
  minLength: {
    value: 2,
    message: "Name must be at least 2 characters long.",
  },
};

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
  storeAddress: {
    required: "Store Address is required!",
    minLength: {
      value: 10,
      message: "Address must be at least 10 characters long.",
    },
  },
};
