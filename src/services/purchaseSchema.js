const purchaseSchema = {
  'title': 'purchase schema',
  'description': 'Buyed item and seller information',
  'version': 0,
  'type': 'object',
  'properties': {
    receiptID: {
      type: 'string'
    },
    sellerName: {
      type: 'string'
    },
    Date: {
      type: 'string',
      default: Date().toString().substring(4, 15)
    },
    totalProducts: {
      type: 'number'
    },
    bill: {
      type: 'number'
    },
    paid: {
      type: 'number'
    },
    remainingBalance: {
      type: 'number'
    }
  }
}
const purchaseReceiptSchema = {
  'title': 'purchase Receipt schema',
  'description': 'items in receipt information',
  'version': 0,
  'type': 'object',
  'properties': {
    receiptID: {
      type: 'string'
    },
    productName: {
      type: 'string'
    },
    quantity: {
      type: 'number'
    },
    retailPrice: {
      type: 'number'
    }
  }
}

export default { purchaseSchema, purchaseReceiptSchema }
