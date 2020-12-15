import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

export default class Customer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        numberOfPotions: 0,
        // email: { , fieldName: "Email", required: true, requiredTxt: "Email is required", formatErrorTxt: "Incorrect email format" },
        // name: { , fieldName: "name", required: true, requiredTxt: "Name is required"  },
        // allFieldsValid: false
      };
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      const target = event.target;
  
      this.setState({

      });
    }

    handleSubmit(event) {
        alert('Is it here?');
        event.preventDefault();
    }
  
    render() {

        return (
            <Container fluid>
                <h3>Magic Potion</h3>
                <Row>
                    <Image src="/images/magic-potion-product.png" rounded />

                    <Form.Group controlId="numberOfPotions">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control as="select" placeholder="Max 3">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="name" placeholder="0.00" onChange={this.handleChange}/>
                    </Form.Group>
                </Row>

                <h3>Customer Details</h3>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Control type="name" placeholder="Name" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formAddress1">
                        <Form.Control type="name" placeholder="Address Line 1" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formAddress2">
                        <Form.Control type="name" placeholder="Address Line 2" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formCity">
                        <Form.Control type="name" placeholder="City" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formState">
                        <Form.Control type="name" placeholder="State" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formZip">
                        <Form.Control type="name" placeholder="Zip code" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Control type="name" placeholder="Email" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Control type="name" placeholder="Phone" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formCreditCard">
                        <Form.Control type="name" placeholder="Credit Card Number" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formCCExpiration">
                        <Form.Control type="name" placeholder="mm/yy" onChange={this.handleChange}/>
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container> 
        );
    }
  }
  
ReactDOM.render(
    <Customer />,
    document.getElementById('product')
);