export function reviewedAtAsString(date: number) {
  if (date !== 0) {
    return new Date(date).toLocaleString();
  } else {
    return "---";
  }
}
