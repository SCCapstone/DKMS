import "client-only";

/**
 * Reads a value from local storage.
 *
 * @param key The key to read from
 * @returns They value of the key, or null if not defined
 */
const getLocalStorage = <T>(key: string) => {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

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
