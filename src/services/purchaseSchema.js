const purchaseSchema = {
  'title': 'purchase schema',
  'description': 'Buyed item and seller information',
  'version': 0,
  'type': 'object',
  'properties': {
    receiptID:{
      type:'number'
    },
    sellerName:{
      type:'string'
    },
    totalProducts:{
      type:'number'
    },
    bill:{
      type:'number'
    },
    paid:{
      type:'number'
    },
    remainingBalance:{
      type:'number'
    }
  }
}
const purchaseReceiptSchema = {
  'title': 'purchase Receipt schema',
  'description': 'items in receipt information',
  'version': 0,
  'type': 'object',
  'properties': {
    receiptID:{
      type:'number'
    },
    productName:{
      type:'string'
    },
    quantity:{
      type:'number'
    },
    retailPrice:{
      type:'number'
    }
  }
}

export default {purchaseSchema, purchaseReceiptSchema}
