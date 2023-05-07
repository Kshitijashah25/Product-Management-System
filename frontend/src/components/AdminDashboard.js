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
	Toolbar
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {React, useEffect, useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../css/AdminDashboard.css";
import axios from "axios";

function AdminDashboard() {
	const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:1111/api/product/getProducts');
            console.log(response.data);
			setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

	useEffect(() => {
		fetchProducts();
	}, []);

	const deleteProduct = async (id) => {
		try {
			const response = await axios.delete('http://localhost:1111/api/product/deleteProduct/' + id);
			console.log(response.data);
			fetchProducts();
			alert(response.data);
		} catch (error) {
			console.log(error);
		}
	}




	return (
        <>
			<AppBar>
				<Toolbar>
					<Button component={Link} to="/addproduct" color="inherit">
						Add Product
					</Button>
					<div style={{flexGrow: 1}}/>
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
								<TableCell style={{ width: '15%' , fontWeight:'bold', fontSize: '18px'}}>Quantity</TableCell>
								<TableCell style={{ width: '15%' , fontWeight:'bold', fontSize: '18px'}}>Category</TableCell>
								<TableCell style={{ width: '10%' , fontWeight:'bold', fontSize: '18px'}}>Price</TableCell>
								<TableCell style={{ width: '10%' , fontWeight:'bold', fontSize: '18px'}} align="right">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.map((product) => (
								<TableRow key={product.id}>
									<TableCell>{product.name}</TableCell>
									<TableCell>{product.description}</TableCell>
									<TableCell>{product.quantity}</TableCell>
									<TableCell>{product.productCategory}</TableCell>
									<TableCell>{product.price}</TableCell>
									<TableCell align="right">
										{/*<IconButton onClick = {() => updateProduct(product.id,product) }>*/}
										{/*	<EditIcon />*/}
										{/*</IconButton>*/}
										<Link to={`/editproduct/${product.id}`}>
											<IconButton>
												<EditIcon />
											</IconButton>
										</Link>
										<IconButton  onClick={() => deleteProduct(product.id) }>
											<DeleteIcon />
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

export default AdminDashboard;