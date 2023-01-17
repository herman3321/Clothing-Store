import { useState} from "react";
import { useDispatch } from "react-redux";

import FormInput from '../form-input/form-input'

import { SignUpContainer, ButtonContainer} from "./sign-up.style";

import  Button, { BUTTON_TYPE_CLASSES } from "../Button/button.component";

import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";     

const defaultFormFields = {
    email:'',
    password:''
    }


const SignInForm = () => {
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;


    const reSetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
         dispatch(googleSignInStart)
    }

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        

        try{
           dispatch(emailSignInStart(email, password))
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
               <Button type='submit'>Sign In</Button>
                <Button
                    buttonType={BUTTON_TYPE_CLASSES.google}
                    type='button'
                    onClick={signInWithGoogle}>Sign In With Google
                </Button>
        </ButtonContainer>
            </form>
        </SignUpContainer>
    )
}

export default SignInForm
 
