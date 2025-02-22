import axios_ from 'axios'

export const axios = axios_.create({
  baseURL: 'https://api.302.ai',
  headers: {
    'mj-api-secret': 'sk-frMebAccfYLVuIWaA8ijnfv9xTtpm3d6qqiW7kNEGpQMBFJG',
    'Authorization': `Bearer sk-frMebAccfYLVuIWaA8ijnfv9xTtpm3d6qqiW7kNEGpQMBFJG`,
  },
})
