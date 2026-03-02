import { createContext } from "preact"
import { useContext, useState } from "preact/hooks";
import { getProductById } from "../data/products";
import { set } from "react-hook-form";

 export const CartContext = createContext(null)

export default function CartProvider({children}) {
    const [cartItems,setCartItems] = useState([]) //{id:2,quantity:7}

    const addToCart=(productId)=>{
        const existing = cartItems.find((item)=>item.id===productId)
        if (existing){
            
            const currentQuantity = existing.quantity
            const updatedCartItems = cartItems.map((item)=>
            item.id === productId
            ? {id: productId, quantity: currentQuantity +1}
            : item)
            setCartItems(updatedCartItems)
        }
        
        else{
            setCartItems([...cartItems,{id: productId,quantity:1}])
            
        }
    }

    const getCartItemsWithProducts=()=>{
        return cartItems.map(item => ({
            ...item,
            product: getProductById(item.id)
        })).filter(item => item.product)
    }

    const removeFromCart=(productId)=>{
        setCartItems(cartItems.filter((item)=>item.id!==productId))
    }

    const updateQuantity=(productId,quantity)=>{
        if(quantity <=0){
            removeFromCart(productId)
            return
        }
        setCartItems(
            cartItems.map((item)=>
            item.id === productId ? {...item,quantity}: item)
        )
    }
    const getCartTotal=()=>{
        const total = cartItems.reduce((total,item) =>{
            const product = getProductById(item.id)
            return total + (product? product.price * item.quantity :0)
        },0)
        return total
    }

    function clearCart(){
        setCartItems([])
    }

    return <CartContext.Provider 
        value={{
            cartItems,
            addToCart,
            getCartItemsWithProducts,
            updateQuantity,
            removeFromCart,
            getCartTotal,
            clearCart
            }}>
        {children}
    </CartContext.Provider>
}
    
//custom Hook
export function useCart() {
    const context = useContext(CartContext)
    return context
}
    
