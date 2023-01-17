import { takeLatest, put, all, call } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import { signInFailed,
     signInSuccess,
      signUpSuccess,
       signUpFailed,
        signOutSuccess, 
         signOutFailed } from "./user.action";

import { getCurrentUser, 
         createUserDocFromAuth,
         createAuthUserWithEmailAndpassword,
         signInWithGooglePopup, 
         signInAuthUserWithEmailAndpassword,
        signOutUser} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionDetails){
    try{
        const userSnapshot = yield call (createUserDocFromAuth, userAuth, additionDetails)
        yield put(signInSuccess({id:userSnapshot.id, ...userSnapshot.data() }))
    }
    catch ( error ) {
        yield put(signInFailed(error))
    }
}

export function* signInWithGoogle(){
    try{
        const {user} =  yield call(signInWithGooglePopup)
        yield call(getSnapshotFromUserAuth, user)
    }
    catch (error){
        yield put(signInFailed(error))
    }
}

export function* signInWithEmail({payload: {email, password}}){
    try{
        const { user } = yield call(
            signInAuthUserWithEmailAndpassword,
            email,
            password
        )
        yield call (getSnapshotFromUserAuth, user)
    }
    catch (error){
        yield put(signInFailed(error))
    }
}

export function* signUpwithEmail({payload: {fullName, email, password}}){
    try{
        const { user } = yield call(
            createAuthUserWithEmailAndpassword,
            email,
            password
        )
        yield put(signUpSuccess, user)
    }
    catch (error){
        yield put(signUpFailed(error))
    }
}

export function* isUserAuthenticated() {
    try{
        const userAuth = yield call(getCurrentUser)
        if(!userAuth) 
        return
        yield call(getSnapshotFromUserAuth, userAuth)
    }
    catch (error){
        yield put(signInFailed(error))
    }
}

export function* signOut () {
    try{
        yield call(signOutUser)
        yield put(signOutSuccess())
    }
    catch (error){
        yield put(signOutFailed(error))
    }
    
}

export function* signInAfterSignUp ({payload: {user, additionDetails}}){
    yield call(getSnapshotFromUserAuth, user, additionDetails)
} 

export function* onGoogleSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_START, signInWithGoogle)
}

export function* onEmailSignStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}


export function* onEmailSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpwithEmail)
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onCheckUserSession() {
    yield takeLatest(
        USER_ACTION_TYPES.CHECK_USER_SESSION,
        isUserAuthenticated
        )
}

export  function* userSagas(){
    yield all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart),
        call(onEmailSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ])
}