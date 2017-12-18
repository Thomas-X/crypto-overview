import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    username: { type: String, maxLength: 255, required: true, unique: true },
    password: { type: String, maxLength: 255, required: true },
});

const User = mongoose.model('User', schema);

export default User;
