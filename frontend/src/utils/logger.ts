export const logInfo = (message: string): void => {
    console.info(`[INFO]: ${message}`);
  };
  
  export const logError = (message: string): void => {
    console.error(`[ERROR]: ${message}`);
  };
  
  export const logDebug = (message: string): void => {
    if (process.env.NODE_ENV !== "production") {
      console.debug(`[DEBUG]: ${message}`);
    }
  };
  