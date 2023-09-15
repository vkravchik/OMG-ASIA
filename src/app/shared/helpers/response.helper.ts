import { LastEightDay } from '../../dashboard/interfaces/last-eight-day.interface';
import { PayIDs, PayNames, PayTypes } from '../../dashboard/interfaces/pay-types.interface';

export const ab2strMapper = (response: ArrayBuffer): string => {
  return (response as unknown as string).split('|')[0];
}

export const lastEightDayDataMapper = (response: LastEightDay[]): LastEightDay[] => {
  return response.map((item) => ({...item, PTime: item.PTime.replaceAll('/', '').replace(')', '').split('(')[1]}))
}

export const payTypesDataMapper = (response: PayTypes[]): PayTypes[] => {
  return response.map((item) => ({...item, PayName: PayNames[item.PayName]}))
}
