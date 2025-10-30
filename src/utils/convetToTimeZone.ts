export const converToTimeZone = (date: Date) => {
  const timezoneOffset = -date.getTimezoneOffset(); // en minutos
  const diffHours = String(Math.floor(timezoneOffset / 60)).padStart(2, "0");
  const diffMinutes = String(timezoneOffset % 60).padStart(2, "0");
  const sign = timezoneOffset >= 0 ? "+" : "-";
  const formatted = date
    .toISOString()
    .replace("Z", `${sign}${diffHours}:${diffMinutes}`);
    return formatted
};
