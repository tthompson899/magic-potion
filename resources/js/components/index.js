import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import axios from 'axios';

// todo: 
// - add validation
// - add success and error msgs

class Customer extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        numberOfPotions: 0,
        price: 0,
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

    handlePrice(event) {        
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
            phone: this.state.phone,
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            state: this.state.formState,
            zip: this.state.zip,
            quantity: this.state.numberOfPotions,
            price: this.state.price,
            credit_card_number: this.state.ccnum,
            expiration_date: this.state.ccexp,
        };

        try {
            const response = await axios.request({
                url: 'http://magic-potion.test/api/create',
                method: 'POST',
                data: data
            });
            console.log(response);

        } catch (e) {
            console.log(e);
        }
    };
  
    render() {
        return (
            <Container fluid>
                <h3>Magic Potion</h3>
                <Form onSubmit={(event) => this.handleSubmit(event)} >

                <Row>
                    <Image src="/images/magic-potion-product.png" rounded />

                    <Form.Group controlId="numberOfPotions">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control as="select" type="number" placeholder="Max 3" name="numberOfPotions" required onChange={this.handlePrice} value={this.numberOfPotions}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" disabled={true} placeholder="0.00" name="price" value={this.state.price} onChange={this.handlePrice}/>
                    </Form.Group>
                </Row>

                <h3>Customer Details</h3>
                {/* <Form method="POST"> */}
                    <Form.Group controlId="formName">
                        <Form.Control type="text" placeholder="Name" name="fullName" value={this.fullName} onChange={(val) => this.handleInputChange(val)} required /> {/*onChange={(e) => setName(e.target.value)} */}
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Control type="email" placeholder="Email" name="email" value={this.email} onChange={(val) => this.handleInputChange(val)}  required />   {/* onChange={(e) => setEmail(e.target.value)} */}
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Control type="text" placeholder="Phone" name="phone" value={this.phone} onChange={(val) => this.handleInputChange(val)}  required />
                    </Form.Group>

                    <Form.Group controlId="formAddress1">
                        <Form.Control type="text" placeholder="Address Line 1" name="address1" value={this.address1} onChange={(val) => this.handleInputChange(val)} required />
                    </Form.Group>
                    <Form.Group controlId="formAddress2">
                        <Form.Control type="text" placeholder="Address Line 2" name="address2" value={this.address2} onChange={(val) => this.handleInputChange(val)} required />
                    </Form.Group>
                    <Form.Group controlId="formCity">
                        <Form.Control type="text" placeholder="City" name="city" value={this.city} required onChange={(val) => this.handleInputChange(val)}  />
                    </Form.Group>
                    <Form.Group controlId="formState">
                        <Form.Control type="text" placeholder="State" name="formState" value={this.formState} onChange={(val) => this.handleInputChange(val)} required />
                    </Form.Group>
                    <Form.Group controlId="formZip">
                        <Form.Control type="text" placeholder="Zip code" name="zip" value={this.zip} onChange={(val) => this.handleInputChange(val)}  required />
                    </Form.Group>

                    <Form.Group controlId="formCreditCard">
                        <Form.Control type="text" placeholder="Credit Card Number" name="ccnum" value={this.ccnum} onChange={(val) => this.handleInputChange(val)} required />
                    </Form.Group>
                    <Form.Group controlId="formCCExpiration">
                        <Form.Control type="text" placeholder="mm/yy" name="ccexp" value={this.ccexp} onChange={(val) => this.handleInputChange(val)} required />
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
