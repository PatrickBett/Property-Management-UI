import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useEffect } from "react";



export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
    const [homes, setHomes] = useState([]);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    
    const token = localStorage.getItem("access");
    
    
    useEffect(() => {
      getHome();
    }, []);
    
    const getHome = async() => {
      try {
        const response = await api.get('/api/myhome', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setHomes(response.data);
        
        if (response.data.length > 0) {
          setUsername(response.data[0].tenant.username);
        }
      } catch(error) {
        console.log(error);
        // navigate("/login")
      }
    };
  
    return (
      <HomeContext.Provider value={{ homes, setHomes }}>
        {children}
      </HomeContext.Provider>
    );
  };