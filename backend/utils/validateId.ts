export function validateId(id: string | string[] | undefined): number | null {
  if (!id) {
    return null;
  }
  const idParam = Array.isArray(id) ? id[0] : id;
  const safeId = Number.parseInt(idParam, 10);
  if (Number.isNaN(safeId)) {
    return null;
  }
  return safeId;
}

