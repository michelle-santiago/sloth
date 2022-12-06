import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  useUserApi,{ UserApiContext } from '../src/hooks/useUserApi'
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import HomePage from './pages/Home';
import ProtectedRoutes from './components/services/ProtectedRoutes';

function App() {
  const {userAuth, setUserAuth} = useUserApi();
  return (
      <UserApiContext.Provider 
        value={{
          userAuth,
          setUserAuth
        }}>

        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signUp' element={<SignUpPage/>}/>
            <Route path='/' element={<ProtectedRoutes />}>
              <Route path='/Home' element={<HomePage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>

      </UserApiContext.Provider>
  )
}

export default App
