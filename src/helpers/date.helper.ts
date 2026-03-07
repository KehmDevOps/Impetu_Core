import { BadRequestException } from '@nestjs/common';
import { SystemErrorMessages } from '../constants/systemErrorMessages.constants';
import { SystemErrorCodes } from '../constants/systemErrorCodes.constants';

export class DateHelper {
  static parseDDMMYYYY(dateString: string): Date {
    const parts: string[] = dateString.split('/');
    if (parts.length !== 3) {
      throw new BadRequestException(SystemErrorMessages.InvalidDateFormat, SystemErrorCodes.InvalidDateFormat);
    }
    const day: number = parseInt(parts[0], 10);
    const month: number = parseInt(parts[1], 10) - 1;
    const year: number = parseInt(parts[2], 10);

    const date = new Date(year, month, day);

    if (isNaN(date.getTime())) {
      throw new BadRequestException(SystemErrorMessages.InvalidGeneratedDate, SystemErrorCodes.InvalidGeneratedDate);
    }

    return date;
  }

  static calculateAge(birthDate: Date): number {
    const today = new Date();
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const monthDifference: number = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static formatDateOnly(date: any): Date {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }
}
