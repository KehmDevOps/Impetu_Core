import { BadRequestException } from '@nestjs/common';

export class DateHelper {
  static parseDDMMYYYY(dateString: string): Date {
    const parts: string[] = dateString.split('/');
    if (parts.length !== 3) {
      throw new BadRequestException('Invalid date format. Expected DD/MM/YYYY', 'InvalidDateFormat');
    }
    const day: number = parseInt(parts[0], 10);
    const month: number = parseInt(parts[1], 10) - 1;
    const year: number = parseInt(parts[2], 10);

    const date = new Date(year, month, day);

    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid generated date', 'InvalidGeneratedDate');
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
}
