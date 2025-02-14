export function getDayStart(date?: Date | number) {
  const noTimeDate = date ? new Date(date) : new Date();
  noTimeDate.setHours(0, 0, 0, 0);
  return noTimeDate;
}
