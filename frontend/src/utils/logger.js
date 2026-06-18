// src/utils/logger.ts

const ENABLE_LOGGING = true; // Toggle logging globally
const ADVANCED_DEBUG = false; // Enable file name & line number tracking

const getCallerInfo = () => {
  if (!ADVANCED_DEBUG) return ""; 

  const stack = new Error().stack?.split("\n");
  if (stack && stack.length > 3) {
    return stack[3].trim();
  }
  return "Unknown location";
};

export const logInfo = (message, ...optionalParams) => {
  if (ENABLE_LOGGING) {
    console.info(`[LOG] ${getCallerInfo()}`, message, ...optionalParams);
  }
};

export const warnLog = (message, ...optionalParams) => {
  if (ENABLE_LOGGING) {
    console.warn(`[WARN] ${getCallerInfo()}`, message, ...optionalParams);
  }
};

export const errorLog = (message, ...optionalParams) => {
  if (ENABLE_LOGGING) {
    console.error(`[ERROR] ${getCallerInfo()}`, message, ...optionalParams);
  }
};
