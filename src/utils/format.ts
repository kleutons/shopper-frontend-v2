  export function formatCurrency(value: number) {
    
    value = Number(value);
    
    // Converte o número para uma string no formato moeda brasileira
    const formattedNumber = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    return formattedNumber;
  }
  