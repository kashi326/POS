const SettingSchema = {
  'title': 'Setting schema',
  'description': 'Setting information',
  'version': 0,
  'type': 'object',
  'properties': {
    shopName: {
      type: 'string',
      default: ''
    },
    shopAddress: {
      type: 'string',
      default: ''
    },
    shopOwnerName: {
      type: 'string',
      default: ''
    },
    shopOwnerPhone: {
      type: 'string',
      default: ''
    },
    shopOwnerEmail: {
      type: 'string',
      default: ''
    }
  }
}
export default {SettingSchema}