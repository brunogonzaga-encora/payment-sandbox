import { Currency, Transaction, TransactionStatus } from "../entities/Transaction";
import { ITransactionRepository } from "../repositories/ITransactionRepository";

export class CreateTransactionUseCase {
    constructor(private transactionRepository: ITransactionRepository) {}
  
    async execute(data: {
      amount: number;
      currency: Currency;
      payer_id: string;
      payee_id: string;
    }): Promise<Transaction> {
      if (data.amount <= 0) {
        throw new Error('Amount must be greater than zero');
      }
  
      if (!Object.values(Currency).includes(data.currency)) {
        throw new Error('Invalid currency');
      }
  
      return this.transactionRepository.create({
        ...data,
        status: TransactionStatus.PENDING
      });
    }
  }