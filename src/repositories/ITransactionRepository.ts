import { Transaction } from "../entities/Transaction";

export interface ITransactionRepository {
    create(transaction: Omit<Transaction, 'transaction_id' | 'created_at' | 'updated_at'>): Promise<Transaction>;
    findById(id: string): Promise<Transaction | null>;
    update(id: string, transaction: Partial<Transaction>): Promise<Transaction>;
    delete(id: string): Promise<void>;
    list(filters?: Partial<Transaction>): Promise<Transaction[]>;
}