/**
 * Formats a timestamp into a human-readable string with a date and time in 12-hour format.
 * @param timestamp - The timestamp to format, representing seconds since the Unix epoch.
 * @returns A formatted string in the format: "DD MMM YYYY HH:MMAM/PM".
 */
export function formatTimestamp(timestamp: bigint): string {
  // Convert seconds to milliseconds by multiplying by 1000
  const date = new Date(Number(timestamp) * 1000);

  // Get date components
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  // Get time components with 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours %= 12;
  hours = hours || 12; // Hour '0' should be '12'

  // Format minutes to always be two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${day} ${month} ${year} ${hours}:${formattedMinutes}${ampm}`;
}
