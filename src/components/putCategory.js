import React from 'react';
import  {render} from 'react-dom';
import {Card,Button,Form}  from 'react-bootstrap';
import {connect} from 'react-redux';
import  ApiServices from '../Services/api_services'


class CategoryAdd extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    api = new ApiServices()
   handleSubmit(event){
    event.preventDefault()
    
    console.log(event.target.elements.formBasiccategoryname.value)
    let category = {
        catId: "cat"+Math.floor(Math.random() * 10000000000),
        category_name:event.target.elements.formBasiccategoryname.value,

    }

    this.api.putCategory(category).then(result=>{
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
                <Card.Body>
                <Card.Title>Add Category</Card.Title>
                    <form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasiccategoryname">
                    <Form.Label>Category Name</Form.Label>
                        <Form.Control  type="text" placeholder="Enter category" required/>
                        <Form.Control.Feedback type="invalid">
                        Please provide category name.
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">Add</Button>
                    </form>
                </Card.Body>
            </Card>

        )
    }

}


export default  CategoryAdd;