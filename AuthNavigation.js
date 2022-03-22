import React, { useEffect, useState } from "react";
import { SignedInStack, SignedOutStack } from "./navigation";
import { auth, onAuthStateChanged } from "./firebase";
const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const userHndler = (user) => {
    user ? setCurrentUser(user) : setCurrentUser(null);
  };

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => userHndler(user));
  }, []);

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
