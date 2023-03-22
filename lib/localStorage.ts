import "client-only";

/**
 * Reads a value from local storage.
 *
 * @param key The key to read from
 * @param parse Whether to parse the value as JSON
 * @returns They value of the key, or null if not defined
 */
function getLocalStorage(key: string, skipParsing: true): string | null;
function getLocalStorage<T>(key: string, skipParsing?: false): T | null;
function getLocalStorage<T>(key: string, skipParsing?: boolean) {
  const item = localStorage.getItem(key);
  if (!item) return null;
  return skipParsing ? item : (JSON.parse(item) as T);
}

/**
 * Writes a value to local storage.
 *
 * @param key The key to write to
 * @param value The value to write
 */
const setLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Removes a value from local storage.
 *
 * @param key The key to remove
 */
const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export { setLocalStorage, getLocalStorage, removeLocalStorage };
