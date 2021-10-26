import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserContext } from '../lib/context';
import '../styles/global.css'
import 'tailwindcss/tailwind.css'
import 'react-quill/dist/quill.snow.css'



function MyApp({ Component, pageProps }) {

  const[user] = useAuthState(auth);

  return (
  <UserContext.Provider value={user}>
    <Navbar />
    <Component {...pageProps} />
  </UserContext.Provider>
  )
}

export default MyApp
