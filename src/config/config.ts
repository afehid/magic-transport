import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })


export const serverConfig = {
    port: parseInt(process.env.port) || 3000,
  }