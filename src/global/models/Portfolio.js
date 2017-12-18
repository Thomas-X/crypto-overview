import mongoose from 'mongoose';

const coinSubSchema = new mongoose.Schema({
    coinAmount: { type: Number, required: false, unique: false },
    investmentAmount: { type: Number, required: false },
    coinId: String,
});

const schema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true},
    author: { type: String, required: true, unique: true },
    coins: { type: [coinSubSchema], required: false },
});

const Portfolio = mongoose.model('Portfolio', schema);
export const CoinSub = mongoose.model('CoinSub', coinSubSchema);

export default Portfolio;
