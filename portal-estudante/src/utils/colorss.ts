// utils/colors.ts

/**
 * Gera uma cor baseada no nome da instituição
 * @param name Nome da instituição
 * @returns Cor em hexadecimal
 */
export const getColorFromName = (name: string): string => {
  const colors = [
    '#FF6B6B', // Vermelho coral
    '#4ECDC4', // Turquesa
    '#45B7D1', // Azul claro
    '#96CEB4', // Verde menta
    '#FFEAA7', // Amarelo suave
    '#DDA0DD', // Lilás
    '#98D8E8', // Azul céu
    '#F7DC6F', // Amarelo dourado
    '#BB8FCE', // Roxo claro
    '#85C1E9', // Azul médio
    '#F8C471', // Laranja claro
    '#82E0AA', // Verde claro
  ];
  
  const index = name.length % colors.length;
  return colors[index];
};

/**
 * Ajusta o brilho de uma cor hexadecimal
 * @param color Cor em hexadecimal (#RRGGBB)
 * @param amount Quantidade de ajuste (-100 a 100)
 * @returns Cor ajustada em hexadecimal
 */
export const adjustColor = (color: string, amount: number): string => {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

/**
 * Verifica se uma cor é escura (para decidir cor do texto)
 * @param color Cor em hexadecimal
 * @returns true se a cor for escura
 */
export const isDarkColor = (color: string): boolean => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Fórmula de luminância
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
};