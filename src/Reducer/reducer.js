var initialImage = 
{image:"https://thumbs.dreamstime.com/z/cart-background-made-carts-vector-illustration-36868023.jpg"}


const reducer = (state = initialImage , action)=>{

    if (action.type === 'IMAGEUPDATE') {
        return {
            image:action.value
        }
    }
    return state;
}

export default reducer;