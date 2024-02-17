import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";
import style from "../Home/product.module.css";
import { useGetCategoryQuery } from "../../redux/Apis/dummyJson";

function Category() {
  const location = useLocation();
  let { name } = location.state;
  const splideOptions = {
    type: "loop",
    height: 500,
    perPage: 3,
    pagination: false,
    gap: 10,
    breakpoints: {
      600: {
        height: 200,
      },
    },
  };
  const { data, isSuccess } = useGetCategoryQuery(name);
  if (isSuccess) {
    return (
      <Splide options={splideOptions} className={`mt-5 pt-5 h-100 mb-5`}>
        {data.products.map((item) => (
          <SplideSlide
            key={item.id}
            className={`d-flex justify-content-center`}
          >
            <Link to={`/product/${item.id}`}>
              <Card
                style={{
                  width: "18rem",
                  height: "96%",
                  margin: "10px",
                  marginTop: "20px",
                }}
                className={`border-warning ${style.hover}`}
              >
                <Card.Img variant="top" src={item.thumbnail} />
                <Card.Body className={`position-relative`}>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    );
  }
}

export default Category;
