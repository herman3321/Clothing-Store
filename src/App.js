import { Route, Routes } from 'react-router-dom';

import {  useEffect} from 'react'

import { useDispatch } from 'react-redux';

import { onAuthStateChangedListener, 
    createUserDocFromAuth
} from './utils/firebase/firebase.utils';


import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import Auth from './routes/sign-in-authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser } from './store/user/user.action';

const App= () => {
 const dispatch = useDispatch()
  useEffect (() =>{
    const unsubscribe = onAuthStateChangedListener ((user) => {
        if (user){
            createUserDocFromAuth(user)
        }
        dispatch(setCurrentUser(user))
    })
    return unsubscribe
},[dispatch])

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
      <Route index element={<Home />}/>
      <Route path='shop/*' element={<Shop/>}/>
      <Route path='auth' element={<Auth/>}/>
      <Route path='checkout' element={<Checkout/>}/>
      </Route>
    </Routes>
  );
}
export default App;

