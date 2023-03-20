const isString = (input: unknown): input is string =>
  typeof input === "string" || input instanceof String;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export { isString, isObject };
