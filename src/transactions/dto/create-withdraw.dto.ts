export class CreateWithdrawDto {
  amount: string;
  transactionDetails: TransactionDetails;
  notes: string;
  paymentOrderId: string;
  externalId: string;
}

class TransactionDetails {
  transactionChannelId: string;
}
