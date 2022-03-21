import { Carousel, Card, Button } from "react-bootstrap";
import React from "react";
import Gallery from "./gallery";

export default class Home extends React.Component{
    render(){
        return(
            <div className="container">
                {/* <div className="alert alert-success">
                    <h1>Ini adalah halaman Home</h1>
                </div> */}
                <div>
                <Carousel fade>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://drive.google.com/uc?id=1J3GY9R-DgdI1OnXHrpFCJmlOYqOs4EkS"
                        alt="First slide"
                        width="80px" height="475px"
                        />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://drive.google.com/uc?id=18sRx2jwPT3sDW6i8D8Qmcym7zilFRNTB"
                        alt="Second slide"
                        width="80px" height="475px"
                        />
                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://drive.google.com/uc?id=1CC2XTMdVz36a0KExdocrVYegu8MVwXfU"
                        alt="Third slide"
                        width="80px" height="475px"
                        />
                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                </div>
                <div className="mt-5">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.cover} />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
                </div>
            </div>
        )
    }
}