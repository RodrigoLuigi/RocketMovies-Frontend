import { createContext, useContext, useState, useEffect } from 'react';

import { api } from '../services/api';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  
  async function signIn({email, password}) {
    
    try {
      setLoading(true);
      const response = await api.post("/sessions", { email, password });
      const { token , user } = response.data;
      
      localStorage.setItem("@rocketmovies:user", JSON.stringify(user));
      localStorage.setItem("@rocketmovies:token", token);
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({user, token});

    } catch (error) {
      if(error.response){
        alert(error.response.data.message);
        setLoading(false);
      } else {
        alert("Não foi possível entrar.")
        setLoading(false);
      } 
    } finally {
      setLoading(false);
    }
  }

  function signOut(){
    localStorage.removeItem("@rocketmovies:token");
    localStorage.removeItem("@rocketmovies:user");
    setData({});
    setLoading(false);
  }

  async function updateProfile({ user , avatarFile}){
    try {
      setLoading(true);
      if(avatarFile){
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);

      localStorage.setItem("@rocketmovies:user", JSON.stringify(user));
      

      setData({user, token: data.token});
      alert("Perfil atualizado com sucesso!");

    } catch (error) {
      if(error.response){
        alert(error.response.data.message);
        setLoading(false);
      } else {
        alert("Não foi possível atualizar o perfil.");
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@rocketmovies:token");
    const user = localStorage.getItem("@rocketmovies:user");

    if(user && token){
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({
        token, 
        user: JSON.parse(user)
      })
    }
  },[]);

  return (
    <AuthContext.Provider value={{ 
      signIn, 
      signOut,
      loading,
      setLoading,
      updateProfile,
      user: data.user
      }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext);

  return context;
}

export {
  AuthProvider,
  useAuth
};

