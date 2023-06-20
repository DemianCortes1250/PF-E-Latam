import Carousel from 'react-bootstrap/Carousel';
import Products from './Products';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosAllProducts } from "../../redux/slice/productSlice"

const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(axiosAllProducts());
  }, [dispatch]);

  const array = useSelector((state) => state.products.allProducts);
    const concatenatedObjects = array.reduce((accumulator, currentArray) => {
        return accumulator.concat(currentArray);
        }, []);
    const allProducts = concatenatedObjects
  const productsPerPage = 3;

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const totalItems = Math.ceil(allProducts.length / productsPerPage); // Calculamos el número total de elementos en el carrusel

  return (
    <section className="sec-more-selled">
      <div className="carousel">
      <Carousel activeIndex={index} onSelect={handleSelect} data-bs-theme="dark" indicators={false}>
      {[...Array(totalItems)].map((_, idx) => {
        const indexOfLastProduct = (idx + 1) * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);
        return (
          <Carousel.Item key={idx}>
            <Products currentProducts={currentProducts} />
          </Carousel.Item>
        );
      })}
    </Carousel>
    </div>
    </section>
  );
}

export default ControlledCarousel;
