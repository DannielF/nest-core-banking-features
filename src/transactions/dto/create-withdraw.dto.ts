export interface CreateWithdrawDto {
  amount: string;
  transactionDetails: TransactionDetails;
  notes: string;
  paymentOrderId: string;
  externalId: string;
}

interface TransactionDetails {
  transactionChannelId: string;
}
