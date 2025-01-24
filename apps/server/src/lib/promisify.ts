type Callback<ReturnType> = (error: Error, returnType?: ReturnType) => void;

export function promisify<T>(func: (callback: Callback<T>) => void) {
  return new Promise<T | undefined>((resolve, reject) => {
    func((error, returnType) => {
      if (error) {
        reject(error);
      } else {
        resolve(returnType);
      }
    });
  });
}
