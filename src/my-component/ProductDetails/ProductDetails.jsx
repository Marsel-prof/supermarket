import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import { Navigation } from "swiper/modules";
import Image from "./Image";
import {
  useAddToCartMutation,
  useGetProductByIdQuery,
} from "../../redux/Apis/dummyJson";
import { jwtDecode } from "jwt-decode";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSuccess, data } = useGetProductByIdQuery(id);
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.id;
  const [addToCart, product] = useAddToCartMutation();
  
  useEffect(() => {
    if (product.isError) {
      console.error("Error adding to cart:", product.error);
    }
  }, [product.isError, product.error]);

  if (!isSuccess) {
    // Handle loading state
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      userId: userId,
      products: [{ id: data.id, quantity: 1 }],
    });
    navigate("/cart");
  };

  return (
    <div className={`container pt-5 mt-3`}>
      <div className="swiper">
        <div className="swiper-wrapper">
          <div className={`swiper-slide my-2`} key={data.id}>
            <div className={`card`}>
              <div className={`card-header text-center position-relative`}>
                {data.discountPercentage && (
                  <div
                    className={`position-absolute text-black top-0 end-0 bg-success px-2 rounded-start`}
                  >
                    {data.discountPercentage}%
                  </div>
                )}
                <div
                  className="price-badge position-absolute top-0 start-0 bg-primary
                                    text-white px-2 py-1 rounded-start rounded-bottom-2"
                >
                  {data.price} $
                </div>
                <h3>{data.title}</h3>
                <Image image={data.images} key={data.id} />
              </div>
              <div className={`card-body text-center`}>
                <h5 className={`mx-2 my-3`}>{data.description}</h5>
                <button
                  className={`btn btn-secondary position-absolute end-0 bottom-0`}
                  onClick={handleAddToCart}
                  disabled={product.isLoading}
                >
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
