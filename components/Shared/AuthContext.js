import React from "react";
import {GET, POST} from '../../lib/api'
import Router from 'next/router'



const defaultContextData = {
  token: null,
  user: null,
  getUser: () => {},
  login: () => {},
  signup: () => {},
  logout: () => {}
};

const AuthContext = React.createContext(defaultContextData);
const useAuth = () => React.useContext(AuthContext);


const TOKEN = 'dashboard_token';
const USER = 'dashboard_user';



const userState = () => {

  const [authState, setAuthState] = React.useState({
    token: null,
    user: null,
    hasMounted: false,
    error: {}
  });
  
  


  React.useEffect(() => {
    const lsToken = localStorage.getItem(TOKEN);
    const lsUser = localStorage.getItem(USER);

    

    if(!lsToken && 
      !location.href.includes('/login') && 
      !location.href.includes('/signup') && 
      !location.href.includes('/forgotpassword') &&
      !location.href.includes('/resetpassword')) Router.push('/login')
    setAuthState({ ...authState, token: lsToken, user: JSON.parse(lsUser), hasMounted: true });
  }, []);


  return [authState, setAuthState];
}

const AuthProvider = (props) => {
  const [authState, setAuthState] = userState();

  if (!authState.hasMounted) {
    return <div />;
  }

  

  const login = async (data) => {
    try {
      const resp = await POST('/.netlify/functions/login', data);



      if(resp.data.title === 'Error') {
        setAuthState({...authState, error: resp.data})
      } else {
        await localStorage.setItem(TOKEN, resp.data.token);
        await setAuthState({...authState, token: resp.data.token})
        Router.push('/')

      }

    } catch (error) {
      console.log(error)
    }
  }

  const signup = async (data) => {
    try {
      const resp = await POST(`/.netlify/functions/signup`, 
        {username: data.username, email: data.email, password: data.password}
      );

      if(resp.data.title === 'Error') {
        setAuthState({...authState, error: resp.data})
      } else {
        await localStorage.setItem(TOKEN, resp.data.token);
        await setAuthState({...authState, token: resp.data.token})
        Router.push('/')
      }

    } catch (error) {
      console.log(error)
    }
  }

  const getUser = async () =>  {
    try {
      const resp = await GET('/.netlify/functions/me', {}, TOKEN)
      await localStorage.setItem(USER, JSON.stringify(resp.data));
      setAuthState({...authState, user: resp.data})
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    await localStorage.removeItem(TOKEN);
    await localStorage.removeItem(USER);
    await setAuthState({...authState, user: null, token: null})
    Router.push('/login')

  }
  
  if(authState.token && !authState.user) getUser()



  return (
    <AuthContext.Provider value={{
      token: authState.token,
      login,
      logout,
      signup,
      user: authState.user,
      error: authState.error
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };