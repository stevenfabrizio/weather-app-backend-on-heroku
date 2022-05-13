const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const path = require('path');
const cors = require('cors');

app.use(cors());

//req.body
app.use(express.json()); 


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

const recentRoutes = require('./server/routes/routes.js');
app.use('/recent', recentRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  // console.log(`Up on port ${PORT}.`);
});
