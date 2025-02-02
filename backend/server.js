const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/crypto_dashboard', { useNewUrlParser: true, useUnifiedTopology: true });

const Investment = mongoose.model('Investment', new mongoose.Schema({ coin: String, amount: Number, buy_price: Number }));

const app = express();
app.use(cors());
app.use(express.json());

app.post('/invest', async (req, res) => {
    const investment = new Investment(req.body);
    await investment.save();
    res.json({ message: 'Інвестицію додано!' });
});

app.get('/investments', async (req, res) => {
    const investments = await Investment.find();
    res.json(investments);
});

app.get('/prices', async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Не вдалося отримати дані' });
    }
});

app.listen(5000, () => console.log('Крипто-дашборд запущено на порту 5000'));
