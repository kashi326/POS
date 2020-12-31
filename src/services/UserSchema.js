
const UserSchema = {
  'title': 'User schema',
  'description': 'User information',
  'version': 0,
  'type': 'object',
  'properties': {
    Email: {
      type: 'string'
    },
    Password: {
      type: 'string'
    },
    Name:{
      type:'string'
    },
    Phone:{
      type:'string'
    },
    CreateAt: {
      type: 'string'
    },
    UpdatedAt: {
      type: 'string'
    },
  }
}
export default {UserSchema};