import { Database } from 'sqlite';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from '../../entities/Transaction';
import { ITransactionRepository } from '../../repositories/ITransactionRepository';

export class TransactionRepository implements ITransactionRepository {
    constructor(private db: Database) {}
    update(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    list(filters?: Partial<Transaction>): Promise<Transaction[]> {
        throw new Error('Method not implemented.');
    }
  
    async create(transaction: Omit<Transaction, 'transaction_id' | 'created_at' | 'updated_at'>): Promise<Transaction> {
      const transaction_id = uuidv4();
      const now = new Date();
      
      await this.db.run(`
        INSERT INTO transactions (
          transaction_id, amount, currency, status, payer_id, payee_id, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        transaction_id,
        transaction.amount,
        transaction.currency,
        transaction.status,
        transaction.payer_id,
        transaction.payee_id,
        now.toISOString(),
        now.toISOString()
      ]);
  
      return {
        ...transaction,
        transaction_id,
        created_at: now,
        updated_at: now
      };
    }
  
    async findById(id: string): Promise<Transaction | null> {
      const result = await this.db.get('SELECT * FROM transactions WHERE transaction_id = ?', [id]);
      return result ? this.mapToTransaction(result) : null;
    }
  
    private mapToTransaction(row: any): Transaction {
      return {
        ...row,
        created_at: new Date(row.created_at),
        updated_at: new Date(row.updated_at)
      };
    }
  }