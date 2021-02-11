const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const config = require('config');
const bodyParser = require('body-parser');

const app = express();
const jsonParser = express.json();
const PORT = config.get('port') || 5000;

app.use(cors());
app.use(jsonParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/auth', require('./routes/auth.router'));
app.use('/api/expenses', require('./routes/expense.router'));
app.use('/api/users', require('./routes/user.router'));
app.use('/api/expensesType', require('./routes/expenseType.router'));
app.use('/api/profitsType', require('./routes/profitType.router'));
app.use('/api/icons', require('./routes/icon.router'));
app.use('/api/profits', require('./routes/profit.router'));
app.use('/api/expenses', require('./routes/expense.router'));
app.use('/api/wallets', require('./routes/wallet.router'));
app.use('/api/walletsType', require('./routes/walletType.router'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'wallet', 'build')));

    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, 'wallet', 'build', 'index.html'));
    });
}

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

app.use(function (request, response, next) {
    response.status(404).send("Not Found");
});

start();
