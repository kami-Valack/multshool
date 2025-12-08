declare module 'jsqr' {
  export interface QRCode {
    data: string;
    location: {
      topLeftCorner: { x: number; y: number };
      topRightCorner: { x: number; y: number };
      bottomLeftCorner: { x: number; y: number };
      bottomRightCorner: { x: number; y: number };
    };
  }

  export default function jsQR(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    options?: {
      inversionAttempts?: 'dontInvert' | 'onlyInvert' | 'attemptBoth' | 'invertFirst';
      greyScaleWeights?: {
        red: number;
        green: number;
        blue: number;
        useIntegerApproximation?: boolean;
      };
    }
  ): QRCode | null;
}

