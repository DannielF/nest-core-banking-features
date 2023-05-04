/**
 * @description Get current date in ISO format
 * @returns {string} ISO date
 * @example 2021-01-01T00:00:00-05:00
 * @author danielf
 */
export class CurrentDateISO {
  public static get(): string {
    const currentDate: Date = new Date();
    const newDateTime: Date = new Date(currentDate.getTime() - 1 * 1000);
    return newDateTime.toISOString().replace(/\.\d+Z$/, '-05:00');
  }

  public static getPreviousDay(): string {
    const currentDate: Date = new Date();
    const previousDay: Date = new Date(
      currentDate.getTime() - 24 * 60 * 60 * 1000,
    );
    return previousDay.toISOString().replace(/\.\d+Z$/, '-05:00');
  }

  public static getOneWeekAfter(): string {
    const currentDateTime: Date = new Date();
    const newDateTime: Date = new Date(
      currentDateTime.getTime() + 7 * 24 * 60 * 60 * 1000,
    );
    return newDateTime.toISOString().replace(/\.\d+Z$/, '-05:00');
  }
}
