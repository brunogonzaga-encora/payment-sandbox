export enum TransactionStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    BRL = 'BRL',
}

export interface Transaction {
    transaction_id: string;
    amount: number;
    currency: Currency;
    status: TransactionStatus;
    payer_id: string;
    payee_id: string;
    created_at: Date;
    updated_at: Date;
}