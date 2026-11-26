export function formatarNota (nota) {
  if (!nota) return 'Sem nota'
  return `★ ${nota.toFixed(1).replace('.', ',')}`
}

export function formatarDuracao (minutos) {
  if (!minutos) return '';
  
  const horas = Math.floor(minutos / 60);
  const restante = minutos % 60;

  if (horas && restante) {
    return `${horas}h ${restante}min`;
  }
  if (horas) {
    return `${horas}h`;
  }

  return `${restante}min`;
}
