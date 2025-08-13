/**
 * Dynamic unique object fields combined with field name and unique id
 * @param {string} value object field name
 * @param {string} id
 * @param {number} index
 * @returns {string}
 */

export const generateUniqueFieldName = (value: string, id: string, index?: number): string =>
  typeof index === 'number' ? `${value}-${id}-${index}` : `${value}-${id}`
