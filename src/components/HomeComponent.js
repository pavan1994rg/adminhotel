import React from 'react';
import {render} from 'react-dom';
import {Card,Button,Row,Col,Container}  from 'react-bootstrap';
import FileUpload from './fileuploadcomponent';
import ProductAdd from './productsadd';
import ProductUpdate from './productslist';
import '../App.css'
import ApiServices from '../Services/api_services' 
import  CategoryAdd     from './putCategory'
class HomeComponent extends React.Component{

  constructor(){
    super();
  }
  api = new ApiServices();
  state={
    'categories':[]
  }
  componentWillMount(){
   setTimeout(() => {
    this.api.getCategories().then(result=>{
      console.log(result);
      this.setState({
        'categories':result.data
      })
      console.log(this.state.categories); 
    })
   }, 2000);
     
     
  }

  render(){
    return(
      <div >
          <Container>
            <Row>
            <CategoryAdd/>
            </Row>
            <Row>
              <Col xs={12} sm={12} md ={4}>
                <FileUpload />
              </Col>
              <Col xs={12} sm={12} md ={8} >
                <ProductAdd categories={this.state.categories}/>
              </Col>
            </Row>
            <Row>
                <Col >
                <ProductUpdate categories={this.state.categories}  />
                </Col>
            </Row>
          </Container>
      </div>
    )
  }
}

 

export default HomeComponent;
