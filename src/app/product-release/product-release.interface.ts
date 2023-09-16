export interface ProductReleaseInfo {
  code: number,
  msg: string,
  page: number,
  records: number,
  total: number,
  rows: ProductRelease[],
  UserData: any
}

export interface ProductRelease {
  rowId: string,
  TrMachineID: string,
  MiAlias: string,
  TrCoilID: string,
  TrPayType: string,
  Prcode: string,
  PrName: string,
  MiName: string,
  TrCardID: string,
  TrSalePrice: string,
  TrResult: string,
  TrSerialNumber: string,
  TrTime: string,
  Addtime: string
}
