export function truncateText(string: string, length: number = 160): string {
  if (string.length <= length) {
    return string;
  }
  return string.slice(0, length) + "...";
}
