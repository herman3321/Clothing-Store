import SignUpForm from '../../component/sign-form/sign-up-form.component';         
import SignInForm from '../../component/sign-form/sign-in-form';
import { AuthenticationContainer } from './form.style.jsx'


const Auth= () => {
        
        return(
          <AuthenticationContainer>

              <SignInForm/>
              <SignUpForm/>
          </AuthenticationContainer>
        )
}

export default Auth;