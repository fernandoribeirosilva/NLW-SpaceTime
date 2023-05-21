import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '::', // vai fazer com que a aplicação ficar acessível a outras aplicações frontEnd
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP Server running! localhost:${process.env.PORT}`)
  })
