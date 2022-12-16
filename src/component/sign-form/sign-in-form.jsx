import { useState} from "react";
import FormInput from '../form-input/form-input'

import { SignUpContainer} from "./sign-up.style";

import { ButtonContainer,
         Button, 
         GoogleButton } from "../Button/button.style";

import { signInWithGooglePopup,
     createUserDocFromAuth,
     signInAuthUserWithEmailAndpassword
} 
     from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email:'',
    password:''
    }


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;


    const reSetFormFields =() =>{
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
         await signInWithGooglePopup();
    }

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        

        try{
            await signInAuthUserWithEmailAndpassword (
                email,
                password);
            reSetFormFields();
        }
            catch (error)
            {
                switch(error.code){
                    case 'auth/wrong-password':
                    alert ('incorrect password for email');
                    break

                    case 'auth/user-not-found':
                    alert ('no user associated with this email');
                    break

                    default:
                    console.log('user sign in failed', error);
                }
            }

    }
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields,[name]:value}) 

    }
    return(
        <SignUpContainer>
            <h1>Already Have An Account</h1>
            <form onSubmit={handleSubmit}>
               
            <FormInput
                label='Email'
                type='email'
                required
                onChange={handleChange}
                name='email'
                value={email}
                />

            <FormInput
                label='Password'
                type='password'
                required
                onChange={handleChange}
                name='password'
                value={password}
                />

                <ButtonContainer>
                <Button type="submit">Sign in</Button>
                <GoogleButton  onClick={signInWithGoogle}>Google Sign in</GoogleButton>
                </ButtonContainer>
            </form>
        </SignUpContainer>
    )
}

export default SignInForm
 
