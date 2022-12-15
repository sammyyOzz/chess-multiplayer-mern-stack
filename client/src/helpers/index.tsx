export function getKeyFromValue<T>(object: T, value: string) {
  const keys = Object.keys(object) as Array<keyof object>
  return keys.find(key => object[key] === value);
}

export const getBoardOrientation = (isGameCreator: boolean | null | undefined) => {
  if (isGameCreator || isGameCreator === null) return 'white'
  return 'black';
}

export const isPlayerTurn = (isGameCreator: boolean | null | undefined, gameTurn: 'w' | 'b') => {
  if (isGameCreator && gameTurn === 'w') return true;
  if (!isGameCreator && gameTurn === 'b') return true;
  return false;
}