import SignUpForm from '../../component/sign-form/sign-up-form.component';         
import SignInForm from '../../component/sign-form/sign-in-form';
import { AuthContainer } from './form.style'


const Auth= () => {
        
        return(
          <AuthContainer>

              <SignInForm/>
              <SignUpForm/>
          </AuthContainer>
        )
}

export default Auth;