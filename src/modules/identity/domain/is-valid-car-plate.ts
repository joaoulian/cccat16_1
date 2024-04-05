export function isValidCarPlate(carPlate?: string): boolean {
  if (!carPlate) return false;
  return !!carPlate.match(/[A-Z]{3}[0-9]{4}/);
}
