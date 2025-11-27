// Função para formatar a data | XX de MM de AAAA
export const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
