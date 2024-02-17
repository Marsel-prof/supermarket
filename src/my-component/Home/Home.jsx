import { Link } from "react-router-dom";
import style from "./product.module.css";
import { Card } from "react-bootstrap";
import { useGetProductsQuery } from "../../redux/Apis/dummyJson";
import Loading from "../Loading/Loading";

function Home() {
  const { data, isSuccess} = useGetProductsQuery();
  if (isSuccess) {
    return (
      <div className="container pt-5 mt-5">
        <div className="row row-cols-1 row-cols-md-4">
          {data?
            data.products.map((item) => (
              <div className="col mb-4" key={item.id}>
                <Link to={`/product/${item.id}`} className="text-decoration-none">
                  <Card
                    style={{ height: "100%" }}
                    className={`border-warning ${style.hover}`}
                  >
                    <Card.Img variant="top" src={item.thumbnail} />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            )): <Loading/>}
        </div>
      </div>
    );
}
}

export default Home;