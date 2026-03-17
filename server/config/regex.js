const REGEX = {
  OBJECT_ID: /^[a-zA-Z0-9]{24}$/,
  USERNAME: /^[a-zA-Z][a-zA-Z0-9_]{4,19}$/gi,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,30}$/,
};

module.exports = REGEX;
