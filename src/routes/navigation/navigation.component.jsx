import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../component/context/user.context";
import { CartContext } from "../../component/context/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as DmLogo} from '../../assets/crown.svg'

import { NavigationContainer,
         LogoContainer,
         NavLinkContainer,
         NavLink } from "./navigation.style";


const Navigation = () =>{
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext)

    const signOutHandler = async () => {
    await signOutUser();
    }

    
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
                        <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
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
