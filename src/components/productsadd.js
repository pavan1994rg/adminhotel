import React from 'react';
import  {render} from 'react-dom';
import {Card,Button,Form}  from 'react-bootstrap';
import {connect} from 'react-redux';
import  ApiServices from '../Services/api_services'


class ProductAdd extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    api = new ApiServices()
   handleSubmit(event){
    event.preventDefault()
    console.log(event.target.elements.formBasicproductname.value)
    console.log(event.target.elements.formBasiccategory.value)
    let product = {
        product_id: "prod"+Math.floor(Math.random() * 10000000000),
        product_name:event.target.elements.formBasicproductname.value,
        product_quantity:event.target.elements.formBasicproductquantity.value,
        product_price:event.target.elements.formBasicproductprice.value,
        product_category:event.target.elements.formBasiccategory.value,
        product_image:this.props.img

    }
    let product_array = [];
    product_array.push(product)
    this.api.putProducts(product_array).then(result=>{
        console.log(result);
        if(result.data.affectedRows === 1){
            alert("added successfully");
            window.location.reload(false);
        }
    })
   }
   state = {

    'categories':[]
}

   componentWillReceiveProps(nextProps){
    console.log("categories"+ JSON.stringify(nextProps));
    
    this.setState({
        'categories':nextProps
    })
  console.log(this.state.categories.categories);

   }

    render(){
        return (
            <Card style={{ width: '30rem' ,backgroundColor:"white", margin:'20px'}}>
            <Card.Img style={{height:'15rem',width:'10rem',display:'block',marginLeft:'auto',marginRight:'auto'}} variant="top" src= {this.props.img} />
            <Card.Body>
              <Card.Title>Add Product</Card.Title>
                <form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicproductname">
                 <Form.Label>Product Name</Form.Label>
                    <Form.Control  type="text" placeholder="Enter product" required/>
                    <Form.Control.Feedback type="invalid">
            Please provide product name.
          </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasiccategory" >
                    <Form.Label>Category</Form.Label>
                    <Form.Control required as="select">
                    <option value="">
                            select
                        </option>
                        {
                                (this.state.categories.categories != undefined && this.state.categories.categories.length > 0) ? 
                             this.state.categories.categories.map((category,index)=>{
                                       return( <option key={index} value={category.cateId}>
                                          {category.category_name}
                                       </option>)
                                    })
                                    :null
                               
                               
                            }
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicproductprice">
                 <Form.Label>Product Price</Form.Label>
                    <Form.Control required type="number" placeholder="Enter product price" />
                </Form.Group>
                <Form.Group controlId="formBasicproductquantity">
                 <Form.Label>Product Quantity</Form.Label>
                    <Form.Control required type="text" placeholder="Enter product quantity" />
                </Form.Group>
                <Button type="submit">Add</Button>
                </form>
            </Card.Body>
          </Card>

        )
    }

}
const mapStateToProps = state => {
    return {
        img: state.image
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'})
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (ProductAdd);