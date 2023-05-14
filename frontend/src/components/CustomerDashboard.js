import {
	AppBar,
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Toolbar, Drawer, List, ListItem, ListItemText
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {React, useEffect, useState} from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "../css/CustomerDashboard.css";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function CustomerDashboard() {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);

	// const addToCart = (product) => {
	// 	setCart([...cart, product]);
	// 	setCartItems([...cartItems, product]);
	// };
	const addToCart = (product) => {
		const remainingQuantity = product.quantity - cartItems.filter(item => item.id === product.id).length;
		if (remainingQuantity > 0) {
			setCart([...cart, product]);
			setCartItems([...cartItems, product]);
		} else {
			alert(`Sorry, you can't add more than ${product.quantity} items of ${product.name} to the cart.`);
		}
	};


	const [cartItems, setCartItems] = useState([]);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleDrawerOpen = () => {
		setDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};
	const fetchProducts = async () => {
		try {
			const response = await axios.get('http://localhost:1111/api/product/getProducts');
			console.log(response.data);
			setProducts(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleCartSummaryClick = () => {
		console.log("Cart Summary Clicked");
		console.log(cart);
		navigate('/cartsummary', { state:  cart  });
	};

// ...

	const navigate = useNavigate();
	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<>
			<AppBar>
				<Toolbar>
					<div style={{flexGrow: 1}}/>
					<IconButton onClick={handleDrawerOpen} style={{color: '#fff'}}>
						<ShoppingCartIcon />
					</IconButton>
					<Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
						<div className="shoppingCartHeader">
							<h2>Shopping Cart</h2>
							<IconButton onClick={handleDrawerClose}>
								<CloseIcon />
							</IconButton>
						</div>
						<List>
							{cart.map((item) => (
								<ListItem key={item.id}>
									<ListItemText primary={item.name} secondary={`\u20B9 ${item.price}`} />
								</ListItem>
							))}
						</List>
						<Button variant="contained" onClick={handleCartSummaryClick}>
							Order Summary
						</Button>
					</Drawer>
					<Button color="inherit" component={Link} to="/">
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<div style =  {{ maxWidth: '150%', margin: '0 auto ',height: "590px", overflowY: "scroll" ,paddingTop: '60px', paddingBottom: '5px' }}>
				<TableContainer component={Paper} variant="outlined" style={{ width: '99%', margin: '0 auto' }}>
					<Table aria-label="products table" style={{ tableLayout: 'fixed' }}>
						<TableHead>
							<TableRow>
								<TableCell style={{ width: '25%' , fontWeight:'bold' , fontSize: '18px'}}>Name</TableCell>
								<TableCell style={{ width: '40%' , fontWeight:'bold', fontSize: '18px'}}>Description</TableCell>
								<TableCell style={{ width: '15%' , fontWeight:'bold', fontSize: '18px'}}>Category</TableCell>
								<TableCell style={{ width: '15%' , fontWeight:'bold', fontSize: '18px'}}>Quantity</TableCell>
								<TableCell style={{ width: '10%' , fontWeight:'bold', fontSize: '18px'}}>Price</TableCell>
								<TableCell style={{ width: '10%' , fontWeight:'bold', fontSize: '18px'}} align="right">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.map((product) => (
								<TableRow key={product.id}>
									<TableCell>{product.name}</TableCell>
									<TableCell>{product.description}</TableCell>
									<TableCell>{product.productCategory}</TableCell>
									<TableCell>{product.quantity}</TableCell>
									<TableCell>{product.price}</TableCell>
									<TableCell align="right">
										<IconButton color="primary" aria-label="add to shopping cart" onClick={() => addToCart(product)}>
											<AddShoppingCartIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

			</div>
		</>
	);
}
