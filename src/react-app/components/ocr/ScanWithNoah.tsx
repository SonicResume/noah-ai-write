import { useEffect, useRef, useState } from "react";
import { Camera, Check, Loader2, RefreshCw, X } from "lucide-react";
import { ModelService } from "@/react-app/services/modelService";
import {
  WebCamera,
  type FacingMode,
  type WebCameraHandler,
} from "./WebCamera";

interface ScanWithNoahProps {
  open: boolean;
  onClose: () => void;
  onTextExtracted: (text: string) => void;
}

export default function ScanWithNoah({
  open,
  onClose,
  onTextExtracted,
}: ScanWithNoahProps) {
  const cameraRef = useRef<WebCameraHandler>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>("environment");
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setIsScanning(false);
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const handleCapture = async () => {
    if (!cameraRef.current || isScanning) return;

    setIsScanning(true);
    setError("");

    try {
      const file = await cameraRef.current.capture();

      const service = ModelService.getInstance();
      const result = await service.processImage(file);

      if (!result.text.trim()) {
        throw new Error(
          "NOAH couldn't find readable text. Try moving closer or improving the lighting."
        );
      }

      onTextExtracted(result.text);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to scan this image. Please try again."
      );
    } finally {
      setIsScanning(false);
    }
  };

  const handleSwitchCamera = () => {
    const nextMode: FacingMode =
      facingMode === "environment" ? "user" : "environment";

    cameraRef.current?.switch();
    setFacingMode(nextMode);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-card border border-border shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="font-semibold text-foreground">Scan with NOAH</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Point your camera at text and NOAH will extract it.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isScanning}
            className="p-2 rounded-lg hover:bg-accent disabled:opacity-50"
            aria-label="Close scanner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          <div className="relative overflow-hidden rounded-xl bg-black aspect-video">
            <WebCamera
              ref={cameraRef}
              facingMode={facingMode}
              captureType="jpeg"
              captureQuality={0.9}
              className="w-full h-full object-cover"
            />

            {isScanning && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                <Loader2 className="w-10 h-10 animate-spin mb-3" />
                <p className="font-medium">NOAH is reading...</p>
                <p className="text-sm text-white/70 mt-1">
                  Extracting text from your image
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              type="button"
              onClick={handleSwitchCamera}
              disabled={isScanning}
              className="p-3 rounded-full border border-border bg-card hover:bg-accent disabled:opacity-50"
              aria-label="Switch camera"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleCapture}
              disabled={isScanning}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Reading...
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  Scan Text
                </>
              )}
            </button>

            <div className="w-11" />
          </div>

          <div className="flex justify-center mt-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="w-3.5 h-3.5" />
              Your image is processed in the browser
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
