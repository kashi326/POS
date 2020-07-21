const inventorySchema = {
    'title': 'Inventory schema',
    'description': 'inventory items information',
    'version': 0,
    'type': 'object',
    'properties': {
      productName: {
        type: 'string'
      },
      serialNumber: {
        type: 'string'
      },
      quantity: {
        type: 'number',
        default: 0
      },
      retailPrice: {
        type: 'number',
        default: 0
      },
      salePrice: {
        type: 'number',
        default: 0
      }
    }
}

export default {inventorySchema};