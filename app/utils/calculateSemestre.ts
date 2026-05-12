export function calculateSemestre(
  qtd_semestre: number,
): { label: string; value: string }[] {
  const semestres: { label: string; value: string }[] = [];
  for (let i = 1; i <= qtd_semestre; i++) {
    semestres.push({ label: `${i}º Semestre`, value: String(i) });
  }
  return semestres;
}