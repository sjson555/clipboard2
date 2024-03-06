import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clipboard } from './clipboard.entity';

@Injectable()
export class ClipboardService {
  constructor(
    @InjectRepository(Clipboard)
    private clipboardRepository: Repository<Clipboard>,
  ) {}

  public async saveClipboardData(data: string): Promise<void> {
    try {
      const clipboard = new Clipboard();
      clipboard.data = data;
      await this.clipboardRepository.save(clipboard);
    } catch (error) {
      console.error('Error saving clipboard data:', error);
      throw error;
    }
  }

  public async getClipboardItems(): Promise<{
    clipboardItems: (string | ArrayBuffer)[];
    error: string;
  }> {
    try {
      const clipboardItemsFromDB = await this.clipboardRepository.find();

      const clipboardItems = clipboardItemsFromDB.map((item) => item.data);

      return { clipboardItems, error: '' };
    } catch (error) {
      console.error('Error getting clipboard items:', error);
      return { clipboardItems: [], error: 'Failed to get clipboard items.' };
    }
  }
}
