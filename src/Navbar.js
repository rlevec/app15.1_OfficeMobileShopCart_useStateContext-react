import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { useGlobalContext } from './context'

const Navbar = () => {
  const {total} = useGlobalContext()
  return (
    <nav>
        <div className='nav-center'>
            <h3>Office Phone Shop</h3>
            <div className='nav-container'>
                    <FontAwesomeIcon icon={faCartShopping} className='cart-icon'/>
                    <div className='amount-container'>
                        <p className='total-amount'>{total.amount}</p>
                    </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar