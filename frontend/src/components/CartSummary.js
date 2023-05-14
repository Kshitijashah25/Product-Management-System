import React from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function CartSummary() {
    const navigate = useNavigate();
    // Calculate the total price of the items in the cart
    const location = useLocation();
    const cart = location.state;
    console.log(cart);
    if (!cart || !Array.isArray(cart)) {
        return <div>No items in cart.</div>;
    }
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const handleCheckout = async () => {
        if (totalPrice === 0) {
            alert("No Item in cart");
            return;
        }
        try {
            console.log("At cart summary");
            // await sendOrderToBackend(cart);
            const customerId = localStorage.getItem("customerId");
            const response = await axios.post('http://localhost:1111/api/order/createOrder/' + customerId, cart)
            console.log(response);
            if (response.data === "Order Successfully Created.") {
                console.log("Added successfully at backend");
                // alert('Order placed successfully!');
                navigate("/customerdashboard");
            } else {
                console.log('Failed to send order to backend');
                alert(response.data);
            }
        } catch (error) {
            alert(`Error submitting order: ${error.message}`);
        }
    };

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.price}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell><Typography variant="h6">Total:</Typography></TableCell>
                        <TableCell><Typography variant="h6">{totalPrice}</Typography></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button variant="contained" color="primary" onClick={handleCheckout}>Checkout</Button>
        </TableContainer>
    );
}

export default CartSummary;
