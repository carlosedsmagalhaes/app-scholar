export function validateAlunoId(id: string | string[] | undefined): number | null {
  if (!id) {
    return null;
  }
  const idParam = Array.isArray(id) ? id[0] : id;
  const alunoId = Number.parseInt(idParam, 10);
  if (Number.isNaN(alunoId)) {
    return null;
  }
  return alunoId;
}

