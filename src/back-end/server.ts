import * as express from 'express';

const port = process.env.PORT || 3000;

const app = express();

app.use('/', express.static('public'));
app.listen(3000, () => console.log(`Server is on, port ${port}.`));
