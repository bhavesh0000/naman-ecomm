
const app = require("./app")

const dotenv = require("dotenv")

const connectDatabase = require("./config/db")

// handling uncaught exception

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
  
    // Close the server and exit the process
    server.close(() => process.exit(1));
  });

//config
dotenv.config({path:"./backend/config/.env"})

// conneting database

connectDatabase();
const port = process.env.PORT || 6000

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})

// unhandeled promise rejection

process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`)
    
    // Close the server and exit the process
  server.close(() => process.exit(1));
})