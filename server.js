const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

mongoose.connect('mongodb://localhost:27017/combat-interactive', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const paymentRoutes = require('./routes/payments');

app.use('/api/payments', paymentRoutes);
