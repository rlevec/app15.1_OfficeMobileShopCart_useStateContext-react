import React, { useContext, useEffect, useState } from 'react'
import CartItem from './CartItem'
import cartItems from './data'


const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [cart, setCart] = useState(cartItems)
    const [total, setTotal] = useState(
        {
            total: 0,
            amount: 0
        }
    )

    const clearItems = () => {
        return setCart([])
    }

    const removeItem = (id) => {
        let filteredItems = cart.filter((cartItem) => cartItem.id !== id)
        return setCart(filteredItems)
    }

    const increaseAmount = (id) => {
        let tempCart = cart.map((cartItem) => {
            if(cartItem.id === id) {
                console.log(cartItem.amount)
                return {...cartItem, amount: cartItem.amount + 1}
            }
            return cartItem
        })
        return setCart(tempCart)
    }

    const decreaseAmount = (id) => {
        let tempCart = cart.map((cartItem) => {
            if(cartItem.id === id) {
                return {...cartItem, amount: cartItem.amount - 1}
            }
            return cartItem
        }).filter((cartItem) => cartItem.amount !== 0)
        return setCart(tempCart)
    }

    const totalAmount = () => {
        let {total, amount} = cart.reduce((cartTotal, cartItem) => {
            let {amount, price} = cartItem
            let itemTotal = amount * price
            cartTotal.total += itemTotal
            cartTotal.amount += amount
            return cartTotal
        },{
            total: 0,
            amount: 0
        })
        return setTotal(total.total, total.amount)
    }

    useEffect(() => {
        totalAmount()
    }, [cart])



    return (
        <AppContext.Provider
        value={
            {
                cart,
                total,
                clearItems,
                removeItem,
                increaseAmount,
                decreaseAmount,
            }
        }
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}