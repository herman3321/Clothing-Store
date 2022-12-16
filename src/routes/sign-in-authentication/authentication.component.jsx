import SignUpForm from '../../component/sign-form/sign-up-form.component';         
import SignInForm from '../../component/sign-form/sign-in-form';
import './form.style.scss'


const Auth= () => {
        
        return(
          <div className='authentication-container'>

              <SignInForm/>
              <SignUpForm/>
          </div>
        )
}

export default Auth;