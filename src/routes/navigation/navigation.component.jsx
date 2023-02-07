import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch  } from "react-redux";

import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";

import { ReactComponent as DmLogo} from '../../assets/crown.svg'

import { NavigationContainer,
         LogoContainer,
         NavLinkContainer,
         NavLink } from "./navigation.style";


const Navigation = () =>{
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)

    const signOutUser = () => dispatch(signOutStart())

    
    return (
    <Fragment>
        <NavigationContainer>
            <LogoContainer  to='/'>
              <DmLogo className='logo' />
          
            </LogoContainer>
            <NavLinkContainer>
                <NavLink  to='/shop'>
                     SHOP
                </NavLink>
                {
                    currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink  to='/auth'>
                        SIGN IN
                   </NavLink>
                    )
                }
               
               <CartIcon/>
            </NavLinkContainer>
            {
            isCartOpen && <CartDropdown/>
            }
        </NavigationContainer>
        <Outlet/>
    </Fragment>
    )
}

export default Navigation;
