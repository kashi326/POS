const heroSchema = {
  'title': 'hero schema',
  'description': 'describes a simple hero',
  'version': 0,
  'type': 'object',
  'properties': {
      'name': {
          'type': 'string',
          'primary': true
      },
      'color': {
          'type': 'string'
      }
  },
  'required': ['color']
};

const customerSchema = {
  'title': 'product schema',
  'description': 'Customer information',
  'version': 0,
  'type': 'object',
  'properties': {
    customerName: {
      type: 'string'
    },
    customerAddress: {
      type: 'string'
    },
    customerPhone: {
      type: 'string'
    },
    startingBalance: {
      type: 'number',
      default: 0
    },
    creditAmount: {
      type: 'number',
      default: 0
    },
    debitAmount: {
      type: 'number',
      default: 0
    }
  }
}

export default { heroSchema, customerSchema };
