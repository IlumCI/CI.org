const paypal = require('../config/paypal');
const stripe = require('../config/stripe');

exports.createPayPalPayment = (req, res) => {
    const { amount, currency } = req.body;
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/api/payments/paypal/success",
            "cancel_url": "http://localhost:5000/api/payments/paypal/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Product",
                    "sku": "001",
                    "price": amount,
                    "currency": currency,
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": currency,
                "total": amount
            },
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        } else {
            const approval_url = payment.links.find(link => link.rel === 'approval_url');
            res.json({ approval_url: approval_url.href });
        }
    });
};

exports.executePayPalPayment = (req, res) => {
    const { paymentId, PayerID } = req.query;
    const execute_payment_json = {
        "payer_id": PayerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "10.00" // Replace with actual amount
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
        if (error) {
            console.error(error.response);
            res.status(500).json({ error: error.message });
        } else {
            res.json({ success: true, payment });
        }
    });
};

exports.createStripePayment = async (req, res) => {
    const { amount, currency, source } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount: amount * 100, // amount in cents
            currency,
            source,
            description: 'Charge for product'
        });
        res.json({ success: true, charge });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.processUSDT = (req, res) => {
    const { amount, walletAddress } = req.body;
    // Here you would handle the USDT transfer manually or via an exchange API
    res.json({ success: true, message: `Send ${amount} USDT to wallet ${walletAddress}` });
};
