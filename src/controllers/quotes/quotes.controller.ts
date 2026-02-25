import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { Auth } from '../../decorators/auth.decorator';
import { NewMemberQuoteResponse } from '../../dtos/responses/new-member-quote.response';
import { NewMemberQuoteRequest } from '../../dtos/requests/new-member-quote.request';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post('new')
  @Auth()
  public async quoteForNew(@Body() body: NewMemberQuoteRequest): Promise<NewMemberQuoteResponse> {
    return await this.quotesService.quoteForNewMember(body);
  }
}
