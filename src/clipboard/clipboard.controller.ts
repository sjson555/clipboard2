import { Controller, Post, Body } from '@nestjs/common';
import { ClipboardService } from './clipboard.service';

@Controller('clipboard')
export class ClipboardController {
  constructor(private readonly clipboardService: ClipboardService) {}

  @Post()
  async getClipboardData(@Body() body): Promise<{
    clipboardItems: (string | ArrayBuffer)[];
    error: string;
  }> {
    await this.clipboardService.saveClipboardData(body.clipboardData);
    return this.clipboardService.getClipboardItems();
  }
}
