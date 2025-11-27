import QRCodeStyling, { Options } from "qr-code-styling";

/**
 * Gera um QR Code estilizado a partir de dados (string ou objeto).
 * 
 * @param data - Informações que vão ser codificadas no QR Code
 * @returns Promise<string> - Uma string base64 representando a imagem do QR Code
 */
export async function generateQRCode(
  data: Record<string, any> | string
): Promise<string> {
  // Se o parâmetro for objeto, transforma em string JSON
  const stringData = typeof data === "string" ? data : JSON.stringify(data);

  // Configurações do QR Code
  const options: Options = {
    width: 600, // largura do QR Code em px
    height: 600, // altura do QR Code em px
    type: "canvas", // formato de renderização interno (canvas ou svg)
    data: stringData, // dados a codificar
    margin: 4, // margem branca ao redor
    qrOptions: {
      errorCorrectionLevel: "M", // nível de correção de erro (L, M, Q, H)
    },
    dotsOptions: {
      color: "#000000", // cor dos módulos (os quadradinhos)
      type: "square", // estilo dos módulos (square, dots, rounded, etc.)
    },
    backgroundOptions: {
      color: "#ffffff", // cor de fundo
    },
    cornersSquareOptions: {
      type: "square", // estilo dos cantos (extra-rounded, square, etc.)
      color: "#000000", // cor dos cantos
    },
  };

  // Cria uma instância do QR Code com as opções definidas
  const qrCode = new QRCodeStyling(options);

  // Converte o QR Code em imagem base64 (aqui no formato PNG)
  return new Promise<string>((resolve) => {
    qrCode.getRawData("png").then((blob) => { // "png", "jpeg", "webp" podem ser usados
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string); // converte para base64
      reader.readAsDataURL(blob as Blob); // lê o Blob como Data URL
    });
  });
}
