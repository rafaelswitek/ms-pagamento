import 'dotenv/config'
import app from './src/app.js'

const PORTA = process.env.PORTA || 3000

app.listen(PORTA, () => {
  console.log(`Servidor executando na porta:${PORTA}`)
})
