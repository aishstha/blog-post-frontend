/**
 * Get value from storage for given key.
 *
 * @param  {string}  key
 * @return {string}
 */
export function get(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
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
export function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Remove key value pair in storage.
 *
 * @param {string} key
 */
export function remove(key) {
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
