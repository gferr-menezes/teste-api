export default class String {
  /**
   * Convert object values toLowerCase
   * @param obj Object
   * @param exclude Array contains keys ignore lowercase
   */
  static toLowerCaseObj(obj: object, exclude?: Array<string>) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = !exclude?.includes(key) && typeof obj[key] === 'string' ? obj[key].toLowerCase() : obj[key]
      return acc
    }, {})
  }

  /**
   * Format money
   * @param value
   * @returns
   */
  static formatMoney(value: string): number | null {
    if (!value) return null
    let val = value.replace(/[.R$r$]/g, '')
    val = val.replace(',', '.')
    return parseFloat(val)
  }

  static setMask(mask: string, number: string) {
    number = number.replace(/[^0-9]/g, '')

    var s = '' + number,
      r = ''
    for (var im = 0, is = 0; im < mask.length && is < s.length; im++) {
      r += mask.charAt(im) == 'X' ? s.charAt(is++) : mask.charAt(im)
    }
    return r
  }
}
