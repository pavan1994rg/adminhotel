
import React from 'react';
import  {render} from 'react-dom';
import {Card,Button,Form,Container,Col,Row,Modal,Spinner}  from 'react-bootstrap';
import ApiServices from '../Services/api_services' 
import RcIf, {RcElse} from 'rc-if';

class ProductUpdate extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose=  this.handleClose.bind(this);
        this.delete = this.delete.bind(this);

     
       
    }
    api = new ApiServices();
    state = {
        'products':[],
        'categories':[],
        'show':false,
        'showProducts':true
    }
    
   handleSubmit= prod =>event=>{
    event.preventDefault()
    console.log(event.target.elements.formBasicproductname.value)
    console.log(event.target.elements.formBasiccategory.value)
    let product = {
        product_id: prod.product_id,
        product_name:event.target.elements.formBasicproductname.value,
        product_quantity:event.target.elements.formBasicproductquantity.value,
        product_price:event.target.elements.formBasicproductprice.value,
        product_category:event.target.elements.formBasiccategory.value
    
   }
   this.api.updateProduts(product).then(result=>{
    if(result.data.affectedRows === 1){
        alert("updated successfully");
        window.location.reload(false);
    }

   })
}

   componentDidMount(){
       
   }
   delete(e,item){
    var txt;
    var r = window.confirm("Are you Sure you want to delete?");
    if (r == true) {
        console.log(item);
        this.api.deleteProduct(item.product_id).then(res=>{
            if(res.data.affectedRows == 1){
                alert("Product Successfully deleted")
                window.location.reload(false);
            }
            else{
                alert("something went wrong");
            }
        })

    } else {
      
    }

      }
    handleClose = () =>{
        this.setState({'show':false});
        this.delete({},{},true)
    }

     
   componentWillReceiveProps(nextProps){
    console.log("categories"+ JSON.stringify(nextProps));
    if(nextProps.categories!= undefined){
        setTimeout(() => {
            this.viewProducts();   
        }, 2000);
       
    }
    this.setState({
        'categories':nextProps
    })
  console.log(this.state.categories.categories);

   }
 
   viewProducts(){

    this.api.viewProducts().then(result=>{
        console.log(result);
        this.setState({
            "products":result.data,
            'showProducts':false
            
        })
    })
 
        
    // this.state.products.push({
    //     'product_image':'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
    //     'product_name':'product1',
    //     'product_quantity':'2',
    //     'product_price':3,
    //     'product_category':'top_sold'  
    // },
    // {
    //     'product_image':'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
    //     'product_name':'product1',
    //     'product_quantity':'2',
    //     'product_price':3,
    //     'product_category':'top_sold'  
    // },
    // {
    //     'product_image':'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
    //     'product_name':'product1',
    //     'product_quantity':'2',
    //     'product_price':3,
    //     'product_category':'top_sold'  
    // })
   }

  
    render(){
        return (
           [ <div style={{marginBottom:"100px"}}>
               <RcIf if={this.state.showProducts} >
               <Spinner animation="border" variant="light" />
              <RcElse>
              <Container>
                      <Row>
                         
                          {this.state.products.map((product, index) => (
                               <Col sm={12} md ={6} key={index}>
                <Card style={{ width: '30rem' ,backgroundColor:"white", margin:'20px'}}>
                <Card.Img style={{height:'15rem',width:'10rem',display:'block',marginLeft:'auto',marginRight:'auto'}} variant="top" src= {product.product_image} />
                <Card.Body>
                  <Card.Title>Update Product</Card.Title>
                    <form onSubmit={this.handleSubmit(product)}>
                    <Form.Group controlId="formBasicproductname">
                     <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter product"  defaultValue={product.product_name}  required/>
                    </Form.Group>
                    <Form.Group controlId="formBasiccategory" >
                    <Form.Label>Category</Form.Label>
                    <Form.Control required as="select" defaultValue={product.product_category} required>
                    <option value="" >
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
                        <Form.Control type="number" placeholder="Enter product price" defaultValue={product.product_price}  required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicproductquantity">
                     <Form.Label>Product Quantity</Form.Label>
                        <Form.Control type="text" placeholder="Enter product quantity" defaultValue={product.product_quantity} required />
                    </Form.Group>
                    <Row>
                        <Col>
                        <Button type="submit">Update</Button>
                        </Col>
                        <Button style={{marginRight:"20px"}} onClick={(e)=>this.delete(e,product)}><i className="fa fa-trash"></i></Button>
                    </Row>
                   
                    </form>
                </Card.Body>
              </Card>
              </Col>
            ))}
                       
                                     
                    </Row>  
                </Container>
             </RcElse>
          </RcIf>
           
             
                   
               
                
              
            </div>
           ]

        )
    }

}

export default ProductUpdate;