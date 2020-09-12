import { createRxDatabase, addRxPlugin } from 'rxdb';
// import Schema from './Schema';

const expenseSchema = {
    'title': 'expense schema',
    'description': 'Expense information',
    'version': 0,
    'type': 'object',
    'properties': {
      ExpenseName: {
        type: 'string'
      },
      ExpenseDate: {
        type: 'string'
      },
      PaidTo: {
        type: 'string'
      },
      Amount: {
        type: 'number',
        default: 0
      }
    }
  };

  export default expenseSchema;