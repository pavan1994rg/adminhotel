const axios = require('axios');

class ApiServices {
constructor(){

}

URL = 'http://localhost:3002/'

getCategories(){
  return axios.get(this.URL+'getCategories')
  
}

uploadFiles(files){
    const data = new FormData();
    data.append('myFile',files);
    return axios.post(this.URL+'Upload', data)
}

putProducts(products){
    const data ={
      "products":JSON.stringify(products)
    }  
  return axios.post(this.URL+'putProducts', data)
}

viewProducts(){
  return axios.get(this.URL+"getProducts");
}

updateProduts(product){
    const data ={
      product:JSON.stringify(product)
    }
    return axios.post(this.URL+"updateProducts",data);
}

deleteProduct(productId){
  const data = {
    id:productId
  }
  return axios.post(this.URL+"deleteProduct",data);
}
}


export default ApiServices;