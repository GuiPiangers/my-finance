export abstract class Currency {
  static format(value: string | number) {
    const newValue = typeof value === 'string' ? value : value.toString()
    return newValue
      .replace(/\D/g, '')
      .replace(/^0/g, '')
      .replace(/(\d)(\d{2})$/, '$1,$2')
      .replace(/(?=(\d{3})+(\D))\B/g, '.')
  }

  static unFormat(value: string) {
    const unformattedValue = value.replace(/[^\d,]/g, '').replace(',', '.')
    return +unformattedValue
  }
}
