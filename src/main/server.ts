import Fastify from 'fastify';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { TransactionRepository } from '../infrastructure/database/TransactionRepository';
import { CreateTransactionUseCase } from '../usecases/CreateTransactionUseCase';
import { TransactionController } from '../controllers/TransactionController';

async function main() {
  const fastify = Fastify({ logger: true });

  // Database setup
  const db = await open({
    filename: 'database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      transaction_id TEXT PRIMARY KEY,
      amount REAL NOT NULL,
      currency TEXT NOT NULL,
      status TEXT NOT NULL,
      payer_id TEXT NOT NULL,
      payee_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  const transactionRepository = new TransactionRepository(db);
  const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository);
  const transactionController = new TransactionController(createTransactionUseCase);

  // Routes
  fastify.post('/transactions', transactionController.create.bind(transactionController));

  await fastify.listen({ port: 3000 });
}

main().catch(console.error);