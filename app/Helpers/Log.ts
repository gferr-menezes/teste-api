import Logger from '@ioc:Adonis/Core/Logger'

import Date from 'App/Helpers/Date'

export default class Log {
  /**
   * Error
   * @param error
   *
   */
  public static error(message: string, error?): void {
    Logger.error(`${Date.getDate('dd/MM/yyyy H:mm:ss')} - ${message} `, error)
  }

  /**
   *
   * Info
   *
   */
  public static info(message: string, error?): void {
    Logger.info(`${Date.getDate('dd/MM/yyyy H:mm:ss')} - ${message} `, error)
  }
}
