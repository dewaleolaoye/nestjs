import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { firstName: string, lastName: string, phoneNumber?: string } {
    return {
      firstName: 'Adewale',
      lastName: 'Olaoye',
      phoneNumber: '07085160602'
    }
  }
}
