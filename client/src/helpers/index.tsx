export function getKeyFromValue<T>(object: T, value: string) {
  const keys = Object.keys(object) as Array<keyof object>
  return keys.find(key => object[key] === value);
}