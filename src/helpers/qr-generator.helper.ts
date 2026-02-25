import * as QRCode from 'qrcode';
import {
  Canvas,
  CanvasRenderingContext2D,
  createCanvas,
  Image,
  loadImage,
} from 'canvas';
import * as path from 'path';

export class QrGeneratorHelper {
  static async generateQrBase64(text: string): Promise<string> {
    try {
      const canvas: Canvas = createCanvas(1000, 1000);
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

      await QRCode.toCanvas(canvas, text, {
        width: 1000,
        margin: 0.5,
        scale: 1,
        errorCorrectionLevel: 'H',
        color: {
          light: '#ffffff',
          dark: '#000000',
        },
      });

      const logoPath: string = path.join(process.cwd(), 'src/assets/logo.png');
      const logo: Image = await loadImage(logoPath);

      const logoWidth = 350;
      const logoHeight = 150;
      const logoX: number = (canvas.width - logoWidth) / 2;
      const logoY: number = (canvas.height - logoHeight) / 2;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(logoX, logoY, logoWidth, logoHeight);
      ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);

      return canvas.toDataURL();
    } catch (err) {
      throw new Error('Failed to generate QR code');
    }
  }
}
