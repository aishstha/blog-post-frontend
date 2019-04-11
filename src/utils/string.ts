import * as qs from "query-string";

/**
 * Build supplied string by interpolating properties inside delimiters('{ }') with the given parameters.
 *
 * @example
 * interpolate(':name is here.', {name: 'Barbara'})
 * => 'Barbaba is here.'
 *
 * @param {string} str
 * @param {object} params
 * @returns {string}
 */
export function interpolate(str: string, params: any) {
  let formattedString = str;

  for (const [key, value] of Object.entries(params)) {
    const val = value || "";

    formattedString = formattedString.replace(
      new RegExp(":" + key, "gi"),
      val.toString()
    );
  }

  return formattedString;
}

/**
 * Parse string from react router location
 *
 * @param {Object} value
 * @return {string}
 */
export function parseString(value: string) {
  return qs.parse(value);
}

export function stringify(route: string, params: any) {
  if (typeof route !== "string" || typeof params !== "object") {
    throw new TypeError(
      "Route must be of type string and params must be of type object"
    );
  }
  const cleanedParams = cleanKeys(params);

  if (!Object.keys(cleanedParams).length) {
    return route;
  }

  return `${route}?${qs.stringify(cleanedParams)}`;
}

export function cleanKeys(obj: any) {
  if (typeof obj !== "object") {
    throw new TypeError("Params must be of type object");
  }

  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] === undefined || obj[key] === null) {
      return {
        ...acc
      };
    }

    return {
      ...acc,
      [key]: obj[key]
    };
  }, {});
}
