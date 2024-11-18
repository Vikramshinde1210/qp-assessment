const express = require('express');

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

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});

