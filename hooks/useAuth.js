import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '../firebase/firebaseClient';
import { useRouter } from 'next/router';
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	updateProfile,
	sendPasswordResetEmail,
	setPersistence,
	browserSessionPersistence,
} from '@firebase/auth';
import { useToast } from '../store/ToastProvider';

const authContext = createContext();

export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
	return useContext(authContext);
};

function useProvideAuth() {
	const [user, setUser] = useState(null);
	const router = useRouter();
	const { addToast } = useToast();

	const signin = async (email, password) => {
		try {
			// set auth state persistence to SESSION instead of default local
			await setPersistence(auth, browserSessionPersistence);
			///////////////////////////////
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			// Signed in
			setUser(userCredential.user);
			router.push('/overview');
			return userCredential.user;
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorMessage, errorCode);
			if (errorMessage.includes('wrong-password'))
				addToast('Password is incorrect.');
			if (errorMessage.includes('user-not-found'))
				addToast('User not found.');
			if (errorMessage.includes('invalid-email'))
				addToast('Email not valid.');
		}
	};

	const signup = async (email, password, displayName) => {
		try {
			const res = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			setUser(res.user); // setting our state variable user to the FB user object
			await updateProfile(res.user, { displayName: displayName });

			router.push('/overview');
			console.log(`Signed in after created account!`);
			return res.user;
		} catch (error) {
			console.log(error);
			if (error.message.includes('auth/email-already-in-use'))
				addToast('Email already in use.');
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			console.log(`Sign-out successful.`);
			setUser(false);
			router.push('/');
		} catch (error) {}
	};

	const passwordResetEmail = async (email) => {
		try {
			await sendPasswordResetEmail(auth, email);
			addToast(`Password reset email has been sent.`);
		} catch (error) {
			console.log(error.message);
			addToast(error.message);
		}
	};

	/////// What exactly is this??
	const confirmPasswordReset = (code, password) => {
		return firebase
			.auth()
			.confirmPasswordReset(code, password)
			.then(() => {
				return true;
			});
	};

	// Subscribe to user on mount
	// Because this sets state in the callback it will cause any ...
	// ... component that utilizes this hook to re-render with the ...
	// ... latest auth object.
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(false);
			}
		});
		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	// Return the user object and auth methods
	return {
		user,
		signin,
		signup,
		logout,
		updateProfile,
		passwordResetEmail,
		confirmPasswordReset,
	};
}
