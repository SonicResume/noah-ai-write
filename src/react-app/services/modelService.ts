import { createWorker, OEM, PSM, type Worker as TesseractWorker } from "tesseract.js";
import { postProcessText } from "../utils/textCleanup";

interface OCRResult {
  text: string;
  confidence: number;
}

export class ModelService {
  private static instance: ModelService;
  private tesseractWorker: TesseractWorker | null = null;
  public readonly ready: Promise<void>;

  private constructor() {
    this.ready = this.initialize();
  }

  public static getInstance(): ModelService {
    if (!ModelService.instance) {
      ModelService.instance = new ModelService();
    }

    return ModelService.instance;
  }

  private async initialize(): Promise<void> {
    this.tesseractWorker = await createWorker("eng", OEM.TESSERACT_LSTM_COMBINED, {
      logger: () => {},
    });

    await this.tesseractWorker.setParameters({
      tessedit_char_whitelist:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?-:'\"()/$%&@# ",
      tessedit_pageseg_mode: PSM.AUTO_OSD,
    });
  }

  private async preprocessImage(file: File): Promise<HTMLCanvasElement> {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () =>
        reject(reader.error ?? new Error("Failed to read image"));

      reader.readAsDataURL(file);
    });

    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to load image"));

      img.src = dataUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Unable to prepare image for OCR");
    }

    context.drawImage(image, 0, 0);

    const imageData = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const { data } = imageData;

    for (let i = 0; i < data.length; i += 4) {
      const gray =
        data[i] * 0.299 +
        data[i + 1] * 0.587 +
        data[i + 2] * 0.114;

      const contrasted = Math.min(
        255,
        Math.max(0, (gray - 128) * 1.2 + 128)
      );

      data[i] = contrasted;
      data[i + 1] = contrasted;
      data[i + 2] = contrasted;
    }

    context.putImageData(imageData, 0, 0);

    return canvas;
  }

  public isEnhanced(): boolean {
    return false;
  }

  public async processImage(file: File): Promise<OCRResult> {
    await this.ready;

    if (!this.tesseractWorker) {
      throw new Error("OCR engine is not ready");
    }

    const canvas = await this.preprocessImage(file);
    const result = await this.tesseractWorker.recognize(canvas);

    return {
      text: postProcessText(result.data.text),
      confidence: result.data.confidence,
    };
  }

  public async terminate(): Promise<void> {
    if (this.tesseractWorker) {
      await this.tesseractWorker.terminate();
      this.tesseractWorker = null;
    }
  }
}
