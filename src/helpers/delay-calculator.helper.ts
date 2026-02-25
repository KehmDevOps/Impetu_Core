export class DelayCalculatorHelper {
  static calculateDelay(text: string): number {
    const words: number = text.split(/\s+/).length;
    const wordsPerMinute = 60;
    const millisecondsPerWord: number = (60 * 1000) / wordsPerMinute;

    return words * millisecondsPerWord;
  }
}
