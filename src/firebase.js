import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDNmFY2izDP5wZ8rR4KCIfk4n8E_iPqetw",
    authDomain: "shopi-clone.firebaseapp.com",
    projectId: "shopi-clone",
    storageBucket: "shopi-clone.firebasestorage.app",
    messagingSenderId: "132744794215",
    appId: "1:132744794215:web:134023b64ab253b92c84c2",
    measurementId: "G-1HR36Y6CKP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
