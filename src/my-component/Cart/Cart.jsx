import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { Card, Table } from "react-bootstrap";
import style from "../Home/product.module.css";

function Cart() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCart = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      let decoded = jwtDecode(token);
      let userId = decoded.id;
      try {
        const response = await axios.get(
          `https://dummyjson.com/carts/user/${userId}`
        );
        setProducts(response.data.carts[0].products);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    } else {
      console.log("Token is not present in localStorage");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    // Calculate total price whenever products change
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.quantity;
    });
    setTotalPrice(total);
  }, [products]);

  const increaseQuantity = (id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        const updatedQuantity = product.quantity + 1;
        localStorage.setItem(`quantity${product.id}`, updatedQuantity);
        return {
          ...product,
          quantity: updatedQuantity,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const decreaseQuantity = (id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id && product.quantity > 0) {
        const updatedQuantity = product.quantity - 1;
        localStorage.setItem(`quantity${product.id}`, updatedQuantity);
        return {
          ...product,
          quantity: updatedQuantity,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/carts/${id}`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
  };

  return (
    <div>
      <Table bordered hover style={{ marginTop: "6%" }}>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="text-center mt-5 position-relative">
                <Link
                  to={`/product/${product.id}`}
                  className="text-decoration-none"
                >
                  <Card
                    style={{ width: "300px", margin: "auto" }}
                    className={`border-warning ${style.hover}`}
                  >
                    <Card.Img variant="top" src={product.thumbnail} />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => decreaseQuantity(product.id)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control w-25"
                      value={localStorage.getItem(`quantity${product.id}`) || product.quantity}
                      readOnly
                    />
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => increaseQuantity(product.id)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-danger ms-4"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <div>
                    <h5 className="mb-0">${product.price * product.quantity}</h5>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="text-center">
            <td colSpan="2">
              <h4>Total Price: ${totalPrice}</h4>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default Cart;
