const express = require('express');
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: `${path.resolve(__dirname, "../.env")}`})

const app = express();
app.use(express.json());

app.get("/api/hello",(req, res) => {
  res.status(200).send({"msg":"hello world"})
})

app.use((req,res,next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ success: false, message: err.message || 'Error From Server' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

