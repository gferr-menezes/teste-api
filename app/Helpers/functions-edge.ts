import numeral from 'numeral'
import { DateTime } from 'luxon'
import View from '@ioc:Adonis/Core/View'
import _ from 'lodash'

if (!numeral.locales['pt-br']) {
  numeral.register('locale', 'pt-br', {
    delimiters: {
      thousands: '.',
      decimal: ',',
    },
    currency: {
      symbol: 'R$',
    },
  })
  numeral.locale('pt-br')
}

export default class Edge {
  /**
   *
   * Method for add globals functions
   *
   *
   */
  public static addFunctionsGlobals() {
    View.global('moneyFormat', function (number) {
      if (!number) {
        number = 0
      }

      return numeral(parseFloat(number)).format('0,0.00')
    })

    View.global('dateExtensive', function (date) {
      if (!date) {
        //  data = moment().format('YYYY-MM-DD')
        date = DateTime.now().toFormat('yyyy-MM-dd')
      }

      date = new Date(date)

      const day = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'][date.getDay() + 1]
      date = date.getDate() + 1
      const month = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][
        date.getMonth()
      ]
      const year = date.getFullYear()

      return `${day}, ${date} de ${month} de ${year}`
    })

    View.global('zeroToLeft', function (number) {
      if (number < 10) {
        return ('00' + number).slice(-2)
      }
      return number
    })

    View.global('setMask', function (mask, number) {
      let s = '' + number,
        r = ''
      for (let im = 0, is = 0; im < mask.length && is < s.length; im++) {
        r += mask.charAt(im) == 'X' ? s.charAt(is++) : mask.charAt(im)
      }
      return r
    })

    View.global('dateFormat', function (date, format) {
      if (!date) {
        return date
      }

      if (format == null) {
        return DateTime.fromFormat(date, 'yyyy-MM-dd').toFormat('dd/MM/yyyy')
      }

      if (format === 'YYYY-MM-DD') {
        return DateTime.fromFormat(date, 'dd/MM/yyyy').toFormat('yyyy-MM-dd')
      }
    })

    View.global('nl2br', function (str, is_xhtml) {
      if (typeof str === 'undefined' || str === null) {
        return ''
      }
      var breakTag = is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>'
      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2')
    })

    /** CALCULA O PERCENTUAL DA DESPESA EM CIMA DO FECHAMENTO */
    View.global('calcPercentBalance', function (value, balance_final) {
      if (!balance_final) return 0

      return value < 0 ? (((value * -1) / balance_final) * 100).toFixed(2) : value
    })

    View.global('first_capitalize', function (text) {
      if (!text) return ''
      return text.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
    })

    View.global('limit_str', function (string, limit) {
      if (string) {
        if (string.length > limit) {
          return string.substring(0, limit) + '...'
        }
        return string
      }

      return null
    })

    View.global('firstName', function (name?: string) {
      if (!name) return null

      var nameSplited = name.split(' ')
      return nameSplited[0]
    })

    View.global('firstCapitalize', function (text?: string) {
      if (!text) return ''

      return _.startCase(_.toLower(text))
    })
  }
}
