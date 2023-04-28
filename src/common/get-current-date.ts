export class CurrentDateISO {
  public static get(): string {
    const currentDate: Date = new Date();
    const newDateTime: Date = new Date(currentDate.getTime() - 1 * 1000);
    return newDateTime.toISOString().replace(/\.\d+Z$/, '-05:00');
  }
}
