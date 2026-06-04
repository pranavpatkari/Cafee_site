import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

// 🔐 Login
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

// 🚪 Logout
export const logout = () => signOut(auth);

// 👤 Current user
export const getCurrentUser = () => auth.currentUser;
