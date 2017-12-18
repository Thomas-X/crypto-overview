import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, maxLength: 255, required: true },
    symbol: { type: String, maxLength: 255, required: false },
    rank: { type: String, maxLength: 255, required: false },
    price_usd: { type: String, maxLength: 255, required: false },
    price_btc: { type: String, maxLength: 255, required: false },
    ['24h_volume_usd']: { type: String, maxLength: 255, required: false },
    market_cap_usd: { type: String, maxLength: 255, required: false },
    available_supply: { type: String, maxLength: 255, required: false },
    total_supply: { type: String, maxLength: 255, required: false },
    max_supply: { type: String, maxLength: 255, required: false },
    percent_change_1h: { type: String, maxLength: 255, required: false },
    percent_change_24h: { type: String, maxLength: 255, required: false },
    percent_change_7d: { type: String, maxLength: 255, required: false },
    last_updated: { type: String, maxLength: 255, required: false },
    // TODO for converting to other currencies, just do it on the spot with some package
});

const Coin = mongoose.model('Coin', schema);

export default Coin;
