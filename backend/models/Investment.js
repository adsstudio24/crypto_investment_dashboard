const mongoose = require('mongoose');
const InvestmentSchema = new mongoose.Schema({ coin: String, amount: Number, buy_price: Number });
module.exports = mongoose.model('Investment', InvestmentSchema);
