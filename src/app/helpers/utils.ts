/**
 * Dynamic unique object fields combined with field name and unique id
 * @param {string} value object field name
 * @param {string} uuid
 * @returns {string}
 */
export const generateUniqueFieldName = (value: string, uuid: string): string => `${value}-${uuid}`
