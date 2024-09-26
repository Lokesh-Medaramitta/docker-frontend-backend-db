const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3001;
const routes = require("./routes");

// CORS options
const corsOptions = {
  origin: 'http://4.186.32.201:3000', // Your frontend URL
  optionsSuccessStatus: 200, // For legacy browser support
};

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://4.186.32.201:27017/todos", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const app = express();
  app.use(cors(corsOptions)); // Use the CORS options
  app.use(express.json());
  app.use("/api",routes);

  app.listen(port, () => {
    console.log('Server is listening on port: ${port}');
  });
}

