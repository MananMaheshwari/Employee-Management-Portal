import React, {useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import userImage from '../images/userImage.png'

const Home = () => {
  return (
    <div className='container'>
      <Carousel style={{height: "20rem"}} data-bs-theme="dark">
      <Carousel.Item>
        <img style={{height: "5rem"}} src={userImage} alt="Faculty's Image"/>
        <p>Faculty's Details are shown here</p>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=eee"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=e5e5e5"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default Home