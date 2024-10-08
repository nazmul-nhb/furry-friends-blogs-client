import PropTypes from "prop-types";
import { useState, createContext, useEffect } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
// import axios from 'axios';
import useAxiosPublic from "../hooks/useAxiosPublic";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const axiosPublic = useAxiosPublic();
	const [user, setUser] = useState(null);
	const [userLoading, setUserLoading] = useState(true);

	// Register with Email & Password
	const createUser = (email, password) => {
		setUserLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	// Sign in with Email & Password
	const userLogin = (email, password) => {
		setUserLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	// Sign in with Google
	const googleLogin = () => {
		setUserLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	// Sign in with Github
	const githubLogin = () => {
		setUserLoading(true);
		return signInWithPopup(auth, githubProvider);
	};

	// Sign Out
	const logOut = () => {
		setUserLoading(true);
		return signOut(auth);
	};

	// Observer Function
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			const userEmail = currentUser?.email || user?.email;
			const userInfo = { email: userEmail };
			setUser(currentUser);
			setUserLoading(false);

			if (currentUser) {
				axiosPublic
					.post("/jwt", userInfo, { withCredentials: true })
					.then(() => {})
					.catch((error) => {
						console.error(error);
					});
			} else {
				axiosPublic
					.post("/logout", userInfo, { withCredentials: true })
					.then(() => {})
					.catch((error) => {
						console.error(error);
					});
			}
		});

		return () => {
			unsubscribe();
		};
	}, [axiosPublic, user]);

	const authInfo = {
		user,
		createUser,
		userLogin,
		googleLogin,
		githubLogin,
		logOut,
		userLoading,
		setUserLoading,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node,
};

export default AuthProvider;
