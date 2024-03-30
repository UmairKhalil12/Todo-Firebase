import { useEffect, useState } from 'react';
import './App.css';
import Routing from './Routing/Routing';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebase';
import appStore from './zustand/appStore';


function App() {
  const { setUser } = appStore((state) => ({ setUser: state.setUser }));

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user);
        setUser(true)
        setUserInfo(user)
      } else {
        console.log("User is signed out");
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
