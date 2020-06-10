var express = require('express');
var app = express();
app.use(express.static('./dist/text-summarization'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/text-summarization/'}
  );
});
app.listen(process.env.PORT || 8080);