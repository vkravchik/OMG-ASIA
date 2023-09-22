export interface ReplenishmentAdviceData {
  total: number,
  page: number,
  records: number,
  rows: ReplenishmentAdvice[],
  UserData: any
}

export interface ReplenishmentAdvice {
  PrName: string,
  CtName: string,
  PrImgUrl: string,
  PrCode: string,
  SiExtantQuantity: number,
  SiCapacity: number,
  SiBuHuo: number
}
