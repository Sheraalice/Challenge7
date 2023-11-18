require("dotenv").config()
const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)
const PORT = process.env.PORT || 3000
const Sentry = require('@sentry/node');

app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")
io.on("connection", (client) => {
    console.log("Someone Connected")
}); 

Sentry.init({
    desn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
    environment: process.env.ENV,
  });

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(require("./routes/user.routes")(io)) 
app.use(Sentry.Handlers.errorHandler());

server.listen(PORT, () => {
    console.log("Server is running")
});
