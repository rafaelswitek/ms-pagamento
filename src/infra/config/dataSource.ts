import { DataSource } from 'typeorm'
import Pagamento from '../../domain/entities/Pagamento'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'db',
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
  username: process.env.MYSQL_USER || 'postech',
  password: process.env.MYSQL_PASSWORD || 'postech',
  database: process.env.MYSQL_DATABASE || 'ms_pagamento',
  entities: [Pagamento],
  synchronize: true,
})
