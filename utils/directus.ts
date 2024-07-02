export function getDirectusFileUrl(fileId: string): string {
  return `${process.env.DIRECTUS_URL}/assets/${fileId}`;
}
