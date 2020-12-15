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
        price: 49.99,
        // email: { , fieldName: "Email", required: true, requiredTxt: "Email is required", formatErrorTxt: "Incorrect email format" },
        // name: {fieldName: "name", required: true, requiredTxt: "Name is required"  },
      };
  
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
      const target = event.target;
      const name = target.name;
      const newPrice = price.value * numberOfPotions.value;

      this.setState({
        // [name]: value, // @todo remove?
        price: newPrice
      });
    }

    handleSubmit(event) {
        alert('Is it here?'); // @todo: adjust for success msg
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
                        <Form.Control as="select" type="number" placeholder="Max 3" name="numberOfPotions" required onChange={this.handleChange} value={this.numberOfPotions}>
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
                        <Form.Control type="number" disabled={true} placeholder="0.00" name="price" value={this.state.price} onChange={this.handleChange}/>
                    </Form.Group>
                </Row>

                <h3>Customer Details</h3>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Control type="text" placeholder="Name" name="fullName" value={this.fullName} required onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formAddress1">
                        <Form.Control type="text" placeholder="Address Line 1" name="address1" value={this.address1} required onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formAddress2">
                        <Form.Control type="text" placeholder="Address Line 2" name="address2" value={this.address2} required onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formCity">
                        <Form.Control type="text" placeholder="City" name="city" value={this.city} required onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formState">
                        <Form.Control type="text" placeholder="State" name="formState" value={this.formState} required onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formZip">
                        <Form.Control type="text" placeholder="Zip code" name="zip" value={this.zip} required onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Control type="text" placeholder="Email" name="email" value={this.email} required onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Control type="text" placeholder="Phone" name="phone" value={this.phone} required onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formCreditCard">
                        <Form.Control type="text" placeholder="Credit Card Number" name="ccnum" value={this.ccnum} required onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formCCExpiration">
                        <Form.Control type="text" placeholder="mm/yy" name="ccexp" value={this.ccexp} required onChange={this.handleChange}/>
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