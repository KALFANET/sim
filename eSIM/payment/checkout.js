
const stripe = Stripe('your-publishable-key-here'); // Enter your Stripe publishable key
const elements = stripe.elements();
const cardElement = elements.create('card');

cardElement.mount('#card-element');

const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod('card', cardElement);

    if (error) {
        document.getElementById('payment-message').textContent = error.message;
        document.getElementById('payment-message').classList.remove('hidden');
    } else {
        // Process the payment with your backend (e.g., using fetch API)
        fetch('/process_payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                paymentMethodId: paymentMethod.id
            })
        }).then((response) => {
            return response.json();
        }).then((paymentResult) => {
            if (paymentResult.error) {
                document.getElementById('payment-message').textContent = paymentResult.error;
                document.getElementById('payment-message').classList.remove('hidden');
            } else {
                document.getElementById('payment-message').textContent = "Payment successful!";
                document.getElementById('payment-message').classList.remove('hidden');
            }
        });
    }
});
