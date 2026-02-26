import { Injectable } from '@nestjs/common';
import { ApiCrud } from '../api-crud/api-crud.service';
import { ConfigService } from '@nestjs/config';
import { SystemConstants } from '../../constants/system.constants';
import { DelayCalculatorHelper } from '../../helpers/delay-calculator.helper';
import { QrGeneratorHelper } from '../../helpers/qr-generator.helper';

@Injectable()
export class EvolutionService {
  private readonly evolutionApiEnv: any;

  constructor(
    private readonly apiCrud: ApiCrud,
    private readonly configService: ConfigService,
  ) {
    this.evolutionApiEnv = JSON.parse(
      this.configService.get<string>('EVOLUTION_API_ENV') || '{}',
    );
  }

  public async sendWhatsAppMessage(number: string, message: string): Promise<any> {
    const { instance_url, instance_name, instance_key } = this.evolutionApiEnv;
    const url = `${instance_url}/message/sendText/${instance_name}`;
    const internalDelay: number = DelayCalculatorHelper.calculateDelay(message);
    const body = {
      number: SystemConstants.PHONE_BASE + number,
      text: message,
      delay: internalDelay,
      linkPreview: false,
    };

    return await this.apiCrud.post<any>({
      url: url,
      data: body,
      additionalHeaders: {
        apikey: instance_key,
      },
    });
  }

  public async sendWhatsAppImage(number: string, caption: string, accessCode: string): Promise<any> {
    const { instance_url, instance_name, instance_key } = this.evolutionApiEnv;
    const url = `${instance_url}/message/sendMedia/${instance_name}`;
    const base64Image: string = await QrGeneratorHelper.generateQrBase64(accessCode);
    const cleanBase64: string = base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
    const internalDelay: number = DelayCalculatorHelper.calculateDelay(caption);
    const body = {
      number: SystemConstants.PHONE_BASE + number,
      mediatype: 'image',
      mimetype: 'image/png',
      caption: caption,
      media: cleanBase64,
      fileName: 'qr-code.png',
      delay: internalDelay,
      linkPreview: false,
    };

    return await this.apiCrud
      .post<any>({
        url: url,
        data: body,
        additionalHeaders: {
          apikey: instance_key,
        },
      });
  }
}
