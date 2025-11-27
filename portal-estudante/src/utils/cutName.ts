/**
 * Extrai o primeiro e último nome de um nome completo
 * @param fullName - Nome completo da pessoa
 * @returns String com primeiro e último nome, ou o nome original se tiver apenas um nome
 * 
 * @example
 * getFirstAndLastName("Ana de Assis Correia Diogo ") // "Ana Diogo"
 * getFirstAndLastName("Ana Diogo") // "Ana Diogo"  
 * getFirstAndLastName("Ana") // "Ana"
 * getFirstAndLastName("") // ""
 */


export const getFirstAndLastName = (fullName: string): string => {
  if (!fullName || typeof fullName !== 'string') {
    return '';
  }

  // Remove espaços extras e divide o nome em partes
  const nameParts = fullName.trim().split(/\s+/);
  
  // Se não há nome ou há apenas um nome, retorna como está
  if (nameParts.length <= 1) {
    return fullName.trim();
  }
  
  // Se há apenas dois nomes, retorna ambos
  if (nameParts.length === 2) {
    return fullName.trim();
  }
  
  // Se há mais de dois nomes, pega o primeiro e o último
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  
  return `${firstName} ${lastName}`;
};

/**
 * Extrai apenas o primeiro nome
 * @param fullName - Nome completo da pessoa
 * @returns Primeiro nome
 */
export const getFirstName = (fullName: string): string => {
  if (!fullName || typeof fullName !== 'string') {
    return '';
  }
  
  return fullName.trim().split(/\s+/)[0] || '';
};

/**
 * Extrai apenas o último nome
 * @param fullName - Nome completo da pessoa  
 * @returns Último nome
 */
export const getLastName = (fullName: string): string => {
  if (!fullName || typeof fullName !== 'string') {
    return '';
  }
  
  const nameParts = fullName.trim().split(/\s+/);
  return nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
};

/**
 * Cria iniciais a partir do nome completo
 * @param fullName - Nome completo da pessoa
 * @param maxInitials - Número máximo de iniciais (padrão: 2)
 * @returns String com as iniciais
 * 
 * @example
 * getInitials("Ana Maria Diogo") // "AD"
 * getInitials("Ana Maria Diogo Santos", 3) // "ADS"
 */
export const getInitials = (fullName: string, maxInitials: number = 2): string => {
  if (!fullName || typeof fullName !== 'string') {
    return '';
  }
  
  const nameParts = fullName.trim().split(/\s+/);
  
  if (maxInitials === 2 && nameParts.length > 1) {
    // Para 2 iniciais, pega primeira e última
    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
  }
  
  // Para outros casos, pega as primeiras N iniciais
  return nameParts
    .slice(0, maxInitials)
    .map(name => name[0])
    .join('')
    .toUpperCase();
};