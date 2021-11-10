import { DateTime } from 'luxon'

export default class Date {
  public static getDate(format: string): string {
    return DateTime.now().toFormat(format)
  }

  /**
   *
   * @param date
   * @param fromFormat dd/MM/yyyy
   * @param toFormat yyyy-MM-dd
   * @returns
   */
  public static convertDate(date: string, fromFormat?: string, toFormat?: string): string {
    return DateTime.fromFormat(date, !fromFormat ? 'dd/MM/yyyy' : fromFormat).toFormat(!toFormat ? 'yyyy-MM-dd' : toFormat)
  }

  public static INITDATESYSTEM = '1984-02-29'

  public static dateExtense = (dateParams?) => {
    let date = !dateParams ? DateTime.now() : DateTime.fromFormat(dateParams, 'yyyy-MM-dd')
    return `${date.weekdayLong}, ${date.day} de ${date.monthLong} de ${date.year}`
  }
}
