import { useEffect} from 'react';
import './App.css';
import Routing from './Routing/Routing';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebase';
import appStore from './zustand/appStore';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { setUser } = appStore((state) => ({ setUser: state.setUser }));
  const {setUserInfo} = appStore((state)=> ({setUserInfo  : state.setUserInfo}));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("User is signed in:", user);
        setUser(true)
        setUserInfo(user)
      } else {
        // console.log("User is signed out");
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, [setUser , setUserInfo]);

  return (
    <div className="App">
      <ToastContainer /> 
      <Routing />

    </div>
  );
}

export default App;
