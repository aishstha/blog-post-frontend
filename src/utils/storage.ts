/**
 * Get value from storage for given key.
 *
 * @param  {string}  key
 * @return {string}
 */
export function get(key: string) {
  try {
    if (key) {
      const value: any = localStorage.getItem(key);
      return JSON.parse(value);
    }
  } catch (e) {
    return null;
  }
}

/**
 * Set key value pair in storage.
 *
 * @param {string} key
 * @param {any} value
 */
export function set(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Remove key value pair in storage.
 *
 * @param {string} key
 */
export function remove(key: string) {
  localStorage.removeItem(key);
}

/**
 * Clear storage.
 *
 * @return {string}
 */
export function clear() {
  return localStorage.clear();
}
