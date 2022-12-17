import { useState} from "react";
import FormInput from '../form-input/form-input'

import { SignUpContainer } from "./sign-up.style";

import  Button  from "../Button/button.component";

import { createAuthUserWithEmailAndpassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";


const defaultFormFields = {
    fullName:'',
    email:'',
    password:'',
    confirmPassword:''
    }

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {fullName, email, password, confirmPassword} = formFields;


    const reSetFormFields =() =>{
        setFormFields(defaultFormFields);
    }
    
    
    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        if (password !== confirmPassword){
        alert('incorrect password Try again!');
        return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndpassword(
                email, 
                password,
                confirmPassword);
                
            await createUserDocFromAuth (user, {fullName});
            reSetFormFields();
        }
            catch(error){
                if(error.code === 'auth/email-already-in-use'){
                    alert('email already exists');
                }
                return;    
        }

    }
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value}) 

    }
    return(
        <SignUpContainer>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>

            <FormInput
                label='Fullname'
                type='text'
                required
                onChange={handleChange}
                name='fullName'
                value={fullName}
                />

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

            <FormInput
                label='Confirm Password'
                type='password'
                required
                onChange={handleChange}
                name='confirmPassword'
                value={confirmPassword}
                />
              
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;