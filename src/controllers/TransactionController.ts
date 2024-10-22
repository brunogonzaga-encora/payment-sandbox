import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateTransactionUseCase } from '../usecases/CreateTransactionUseCase';

export class TransactionController {
  constructor(private createTransactionUseCase: CreateTransactionUseCase) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const transaction = await this.createTransactionUseCase.execute(request.body as any);
      return reply.code(201).send(transaction);
    } catch (error) {
      if (error instanceof Error && (error.message === 'Amount must be greater than zero' || error.message === 'Invalid currency')) {
        return reply.code(400).send({ error: error.message });
      }
      return reply.code(500).send({ error: 'Internal server error' });
    }
  }
}