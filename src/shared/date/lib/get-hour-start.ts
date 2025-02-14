export function getHourStart(date?: Date | number) {
  const noMinutesDate = date ? new Date(date) : new Date();
  noMinutesDate.setHours(noMinutesDate.getHours(), 0, 0, 0);
  return noMinutesDate;
}
