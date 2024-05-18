/* eslint-disable no-useless-constructor */

import { createLaunch, statusEnum, typeEnum } from './launch/launch'

export const test = async () => {
  const newDataLaunch = {
    date: '24/04/2024',
    description: 'Salário MQB',
    value: 2000,
    type: 'revenue' as typeEnum,
    status: 'payed' as statusEnum,
  }
  await createLaunch(newDataLaunch)
}
