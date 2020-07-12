# Greeter

### Description
An application to greet a `customer`/`user`/`guess` on your event. 
Just a simple backend that integrated with [Socket.io](https://socket.io/) you can use this simple application.

## How to try
1. Create (if you haven't) simple `Socket.io` server. Just follow [this](https://socket.io/docs/server-api/)
2. Create a handler for emit the data `Socket.io` clients (for this case, this `Greeter` app).
3. Set `Greeter` env configuration to connect `Socket.io` server.
4. Run both application (backend with socket.io server and `Greeter` app)
5. Hit your created handler with this format:
```
{
   "name": "John Doe",
   "totalGuess": 1,
   "description": "Welcome to the party"
}
```
5. Ta daaa! Greeter app will call your name

---
## Env variable

| Variables  | Example  | Description |
|---|---|---|
| SOCKETIO_HOST  | http://127.0.0.1:9000  | Define where is socket.io located |

