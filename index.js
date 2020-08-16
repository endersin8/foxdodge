const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
})
const PORT = process.env.PORT || 8080

app.listen(PORT, function () {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log(`Your server, listening on port ${PORT}`);
});
