const SalesSchema = {
  'title': 'Sales schema',
  'description': 'Sold item and customer information',
  'version': 0,
  'type': 'object',
  'properties': {
    receiptID: {
      type: 'string'
    },
    customerID: {
      type: 'string'
    },
    Date: {
      type: 'string',
      default: Date().toString().substring(4, 15)
    },
    totalProducts: {
      type: 'number',
      default: 0
    },
    bill: {
      type: 'number',
      default: 0
    },
    paid: {
      type: 'number',
      default: 0
    },
    discount:{
      type:'number',
      default:0
    },
    balance:{
      type: 'number',
      default: 0
    }
  }
}
const ReceiptSchema = {
  'title': 'Receipt schema',
  'description': 'product in receipt information',
  'version': 0,
  'type': 'object',
  'properties': {
    receiptID:{
      type:'string'
    },
    productID:{
      type:'number'
    },
    productName:{
      type:'string'
    },
    quantity:{
      type:'number'
    },
    price:{
      type:'number'
    },
    total:{
      type:'number'
    }
  }
}
export default { SalesSchema, ReceiptSchema }