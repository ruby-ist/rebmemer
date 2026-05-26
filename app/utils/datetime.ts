export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",

    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[date.getMonth()];

  const year = date.getFullYear();

  let hours = date.getHours();

  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${day} ${month}, ${year} : ${hours}:${minutes} ${ampm}`;
}
