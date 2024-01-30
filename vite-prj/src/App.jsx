import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  //https://fakestoreapi.com/products
  const [value, setValue] = useState([]);
  const [title, setTitle] = useState('');

  function getProduct() {
    axios.get("https://fakestoreapi.com/products")
      .then((data) => {
        console.log("data", data.data);
        setValue(data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  useEffect(() => {
    getProduct();
  }, []);

  function submitProduct(event) {
    event.preventDefault();
    var jsonValue = {
      "title": title
    };

    axios.post("https://fakestoreapi.com/products", jsonValue)
      .then((data) => {
        console.log("data", data.data);
      })
      .catch((error) => {
        console.error("Error submitting product:", error);
      });
  }


  return (
    <>
      <form onSubmit={(event) => submitProduct(event)}>
        <input type='text' placeholder='title' value={title} onChange={(event) => setTitle(event.target.value)} />
        <button type='submit'>Submit</button>
      </form>

      <Box>
        <Grid container rowGap={2} columnGap={2}>
          {value.map((res, index) => (
            <Grid key={index} xs={11} sm={6} md={4} lg={3}>
              <div className='product-container'>
                <div>
                  <img
                    src={res.image}
                    className='product-img'
                    alt={`Product ${index + 1}`}
                  />
                </div>
                <div className='p-10'>
                  <h3>{res.title}</h3>
                  <div className='d-flex justify-content-between'>
                    <span>{`${res.price} $`}</span>
                    <span>
                      <ReactStars value={res.rating.rate} isHalf={true} edit={false} />
                    </span>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default App;
