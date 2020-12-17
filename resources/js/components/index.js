import React, { useState, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import Error from './Errors';

class Customer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        numberOfPotions: 1,
        price: 49.99,
        fullName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        formState: '',
        zip: '',
        ccnum: '',
        ccexp: '',
        errors: {},
        success: {}
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handlePrice = this.handlePrice.bind(this);
    }

    handleInputChange(event) {
      const target = event.target;
      const name = target.name;

      this.setState({
        [name]: target.value,
      });
    }

    handlePrice() { 
        const newPrice = 49.99 * numberOfPotions.value;

        this.setState({
            price: newPrice,
            numberOfPotions: numberOfPotions.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        let data = {
            name: this.state.fullName,
            email: this.state.email,
            address: {
                address1: this.state.address1,
                address2: this.state.address2,
                city: this.state.city,
                state: this.state.formState,
                zip: this.state.zip,
            },
            phone: this.state.phone,
            quantity: this.state.numberOfPotions,
            total: this.state.price,
            payment: {
                creditCardNumber: this.state.ccnum,
                expirationDate: this.state.ccexp,
            }
        };

        try {
            const response = await axios.request({
                url: 'https://floating-inlet-95445.herokuapp.com/api/magic',
                method: 'POST',
                data: data
            });

            // upon success response, clear form
            if (response.status == 200) {
                console.log(response);
                this.setState({
                    numberOfPotions: 1,
                    price: 49.99,
                    fullName: '',
                    email: '',
                    phone: '',
                    address1: '',
                    address2: '',
                    city: '',
                    formState: '',
                    zip: '',
                    ccnum: '',
                    ccexp: '',
                    errors: {},
                    success: {
                        'message': response.data.message,
                        'orderId': response.data.id 
                    }
                });
            }

            } catch (e) {
                console.log(e.response.data);
                this.setState({
                    errors: e.response.data.errors
                });
        }
    };
  
    render() {
        return (
            <Container fluid>
                <h3>Magic Potion</h3>
                    <div className="text-success" role="alert">
                        <p>{ this.state.success.message }</p>
                    </div>
                <Form onSubmit={(event) => this.handleSubmit(event)} >
                <Row>
                    <Image src="/images/magic-potion-product.png" rounded />

                    <Form.Group controlId="numberOfPotions">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control as="select" type="number" placeholder="Max 3" name="numberOfPotions"  onChange={(event) => this.handlePrice(event)} value={this.state.numberOfPotions} >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Form.Control>

                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" disabled={true} placeholder="49.99" name="price" onChange={(event) => this.handlePrice(event)} value={this.state.price} /> 
                    </Form.Group>
                </Row>

                <h3>Customer Details</h3>
                    <Form.Group controlId="formName">
                        <Form.Control type="text" placeholder="Name" name="fullName" value={this.state.fullName} onChange={(val) => this.handleInputChange(val)}  />
                        <Error
                            error={
                                this.state.errors.name
                                ? this.state.errors.name
                                : null
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Control type="email" placeholder="Email" name="email" value={this.state.email} onChange={(val) => this.handleInputChange(val)}   />
                        <Error
                            error={
                                this.state.errors.email
                                ? this.state.errors.email
                                : null
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Control type="text" placeholder="Phone" name="phone" value={this.state.phone} onChange={(val) => this.handleInputChange(val)}   />
                        <Error
                            error={
                                this.state.errors.phone
                                ? this.state.errors.phone
                                : null
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="formAddress1">
                        <Form.Control type="text" placeholder="Address Line 1" name="address1" value={this.state.address1} onChange={(val) => this.handleInputChange(val)}  />
                        <Error
                            error={
                                this.state.errors['address.address1']
                                ? this.state.errors['address.address1']
                                : null
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddress2">
                        <Form.Control type="text" placeholder="Address Line 2" name="address2" value={this.state.address2} onChange={(val) => this.handleInputChange(val)} />
                        <Error
                            error={
                                this.state.errors['address.address2']
                                ? this.state.errors['address.address2']
                                : null
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formCity">
                        <Form.Control type="text" placeholder="City" name="city" value={this.state.city}  onChange={(val) => this.handleInputChange(val)}  />
                        <Error
                            error={
                                this.state.errors['address.city']
                                ? this.state.errors['address.city']
                                : null
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formState">
                        <Form.Control type="text" placeholder="State" name="formState" value={this.state.formState} onChange={(val) => this.handleInputChange(val)}  />
                        <Error
                            error={
                                this.state.errors['address.state']
                                ? this.state.errors['address.state']
                                : null
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formZip">
                        <Form.Control type="text" placeholder="Zip code" name="zip" value={this.state.zip} onChange={(val) => this.handleInputChange(val)}   />
                        <Error
                            error={
                                this.state.errors['address.zip']
                                ? this.state.errors['address.zip']
                                : null
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="formCreditCard">
                        <Form.Control type="text" placeholder="Credit Card Number" name="ccnum" value={this.state.ccnum} onChange={(val) => this.handleInputChange(val)}  />
                        <Error
                            error={
                                this.state.errors['payment.creditCardNumber']
                                ? this.state.errors['payment.creditCardNumber']
                                : null
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formCCExpiration">
                        <Form.Control type="text" placeholder="mm/yy" name="ccexp" value={this.state.ccexp} onChange={(val) => this.handleInputChange(val)}  />
                        <Error
                            error={
                                this.state.errors['payment.expirationDate']
                                ? this.state.errors['payment.expirationDate']
                                : null
                            }
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" noValidate>
                        Submit
                    </Button>
                </Form>
            </Container> 
        );
    }
}

export default Customer;

if (document.getElementById('product')) {
    ReactDOM.render( <Customer />, document.getElementById('product'));
}
