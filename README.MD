# Payment System - Transaction CRUD

This is a payment system developed with Node.js, TypeScript, and SQLite, following Clean Architecture principles.

## Prerequisites

### Node.js Installation

- Download and install Node.js from the official website
- Recommended version: 18.x or higher

### SQLite3 Installation

**Windows*:*
```bash
# Using chocolatey
choco install sqlite3

# Or download the executable from SQLite official website
```

**macOS*:*
```bash
# Using homebrew
brew install sqlite3
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install sqlite3
```

### Recommended VSCode Extensions
1. **REST Client**
    - Name: Rest Client (Huachao Mao)
    - Required to execute .http files

## Project Setup
1. Clone the repository and install dependencies:
```bash
git clone [repository-url]
cd payment-system
npm install
```

## Running the Project
1. Start the server in development mode:
```bash
npm run dev
```

2. The server will be running at `http://localhost:3000`

## Testing the API
### Using the .http file

1. Open the `tests/api.http` file
2. Click on "Send Request" above each request

### Example request to create a transaction:
```http
POST http://localhost:3000/transactions
Content-Type: application/json

{
    "amount": 100.50,
    "currency": "USD",
    "payer_id": "user123",
    "payee_id": "merchant456"
}
```

## Checking Transactions in SQLite
1. Open terminal and access the database:
```bash
sqlite3 database.sqlite
```

2. Configure visualization:
```sql
.mode column
.headers on
```

3. Query transactions
```sql
-- View all transactions
SELECT * FROM transactions;

-- View last 5 transactions
SELECT 
    transaction_id,
    amount,
    currency,
    status,
    payer_id,
    payee_id,
    datetime(created_at) as created_at
FROM transactions 
ORDER BY created_at DESC 
LIMIT 5;
```

4. Exit SQLite:
```sql
.exit
```

## Project Structure

```
payment-system/
├── src/
│   ├── domain/
│   │   ├── entities/        # Type and interface definitions
│   │   ├── repositories/    # Repository interfaces
│   │   └── usecases/       # Business logic
│   ├── infrastructure/
│   │   └── database/       # Repository implementation
│   ├── presentation/
│   │   └── controllers/    # API controllers
│   └── main/
│       └── server.ts       # Server configuration
├── tests/
│   └── api.http           # API tests
├── package.json
├── tsconfig.json
└── README.md
```

## Available Scripts
```bash
# Development
npm run dev       # Start server with hot-reload

# Production
npm run build    # Compile TypeScript
npm start        # Start production server
```

## API Endpoints
### POST /transactions

Creates a new transaction

**Request body**:
```json
{
    "amount": 100.50,
    "currency": "USD",
    "payer_id": "user123",
    "payee_id": "merchant456"
}
```

**Success response (201):**
```json
{
    "transaction_id": "generated-uuid",
    "amount": 100.50,
    "currency": "USD",
    "status": "PENDING",
    "payer_id": "user123",
    "payee_id": "merchant456",
    "created_at": "2024-10-22T...",
    "updated_at": "2024-10-22T..."
}
```

## Troubleshooting
### Common Issues

1. **Error: Address already in use**
    - Port 3000 is already in use
    - Solution: Stop other services using the port or change the port in server.ts

2. **Database access error**
    - Verify if SQLite3 is installed
    - Check if database.sqlite file was created
    - Ensure you have directory permissions

3. **TypeScript can't find types**
    - Run: `npm install --save-dev @types/node`
