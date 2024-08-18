
import React from 'react';
import OrderDetails from './OrderDetails';

function Account() {
    return (
        <div>
            <h2>Your Account</h2>
            <p>Here you can view your previous orders.</p>
            <OrderDetails orderNo="YOUR_ORDER_NO" />
        </div>
    );
}

export default Account;
