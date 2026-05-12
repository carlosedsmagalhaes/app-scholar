export function calculateSemestre(qtd_semestre: number): any {
  const semestres = [];
  for (let i = 1; i <= qtd_semestre; i++) {
    semestres.push({ label: `${i}º Semestre`, value: i });
  }
  return semestres;
}