export interface PayTypes {
  PayID: string;
  PayName: string;
  TotalCount: string;
}

export const PayNames: Record<string, string> = {
  "银联卡支付": "Pay by Card",
  "赠送": "Gift"
}

export const PayIDs: Record<string, string> = {
  "1": "Pay by Card",
  "15": "Gift"
}
