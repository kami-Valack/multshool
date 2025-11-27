import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';

interface UseQRScannerOptions {
  onScan: (data: string) => void;
  enabled?: boolean;
  scanInterval?: number;
  facingMode?: 'user' | 'environment';
}

interface UseQRScannerReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  error: string | null;
  isActive: boolean;
  startScanning: () => Promise<void>;
  stopScanning: () => void;
  permissionStatus: 'pending' | 'granted' | 'denied' | 'prompt';
}

export function useQRScanner({
  onScan,
  enabled = true,
  scanInterval = 300,
  facingMode = 'environment',
}: UseQRScannerOptions): UseQRScannerReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<'pending' | 'granted' | 'denied' | 'prompt'>('pending');

  const stopScanning = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsActive(false);
  };

  const scanFrame = () => {
    if (
      !videoRef.current ||
      !canvasRef.current ||
      videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA
    ) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { willReadFrequently: true });

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });

    if (code && code.data) {
      stopScanning();
      onScan(code.data);
    }
  };

  const startScanning = async () => {
    try {
      setError(null);
      setPermissionStatus('prompt');

      // Verificar se MediaDevices está disponível
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('MEDIADEVICES_NOT_SUPPORTED');
      }

      console.log('Solicitando acesso à câmara...');
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      console.log('Câmara acessada com sucesso!');
      streamRef.current = stream;
      setPermissionStatus('granted');

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Aguardar o vídeo carregar
        await new Promise<void>((resolve, reject) => {
          if (!videoRef.current) {
            reject(new Error('Video ref não disponível'));
            return;
          }

          videoRef.current.onloadedmetadata = () => {
            console.log('Metadados do vídeo carregados');
            resolve();
          };

          videoRef.current.onerror = (e) => {
            console.error('Erro no elemento de vídeo:', e);
            reject(new Error('Erro ao carregar vídeo'));
          };
        });

        await videoRef.current.play();
        console.log('Vídeo iniciado');
        setIsActive(true);

        // Iniciar scanning após um pequeno delay
        setTimeout(() => {
          scanIntervalRef.current = setInterval(() => {
            scanFrame();
          }, scanInterval);
          console.log('Scanning iniciado');
        }, 500);
      }
    } catch (err: any) {
      console.error('Erro detalhado ao acessar câmara:', err);
      
      let errorMessage = 'Não foi possível acessar a câmara.';
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage = 'Permissão negada. Por favor, autorize o acesso à câmara nas configurações do navegador.';
        setPermissionStatus('denied');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage = 'Nenhuma câmara encontrada no dispositivo.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage = 'Câmara está em uso por outra aplicação.';
      } else if (err.name === 'OverconstrainedError') {
        errorMessage = 'Configurações de câmara não suportadas. Tentando novamente...';
        // Tentar novamente sem constraints específicas
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
            setIsActive(true);
            setPermissionStatus('granted');
            scanIntervalRef.current = setInterval(() => {
              scanFrame();
            }, scanInterval);
            return; // Sucesso na segunda tentativa
          }
        } catch (retryErr) {
          console.error('Erro na segunda tentativa:', retryErr);
        }
      } else if (err.name === 'SecurityError') {
        errorMessage = 'Erro de segurança. Certifique-se de estar usando HTTPS ou localhost.';
      } else if (err.message === 'MEDIADEVICES_NOT_SUPPORTED') {
        errorMessage = 'Seu navegador não suporta acesso à câmara.';
      }
      
      setError(errorMessage);
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      startScanning();
    }

    return () => {
      stopScanning();
    };
  }, [enabled]);

  return {
    videoRef,
    canvasRef,
    error,
    isActive,
    startScanning,
    stopScanning,
    permissionStatus,
  };
}