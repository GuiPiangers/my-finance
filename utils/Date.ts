class DateFormatter {
  private isIsoDate(date: string) {
    const regexPattern = /[0-9]{4}-[0-9]{2}-[0-9]{2}/

    return regexPattern.test(date)
  }

  private isLocaleDate(date: string) {
    const regexPattern = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/

    return regexPattern.test(date)
  }

  toLocaleDate(isoDate: string) {
    if (!this.isIsoDate(isoDate))
      throw new Error('The date must be a Iso Date formate (YYYY/MM/DD))')
    return isoDate.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})/, '$3/$2/$1')
  }

  toIsoDate(localeDate: string) {
    if (!this.isLocaleDate(localeDate))
      throw new Error('The date must be a Locale Date formate (DD-MM-YYYY))')
    return localeDate.replace(/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/, '$3-$2-$1')
  }
}

export const dateFormatter = new DateFormatter()
