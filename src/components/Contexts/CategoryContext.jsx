import { createContext, useEffect, useState } from "react";
import api from "../../api";
// create a context
export const CategoryContext = createContext();



export const CategoryProvider =({children})=>{
    const [categories, setCategories] = useState([])
    const token = localStorage.getItem("access");

    useEffect(()=>{

        const fetchCategories = async()=>{
            try{
                const res =  await api.get("https://spbproperty.pythonanywhere.com/api/categories/", {
                    headers: { Authorization: `Bearer ${token}` },
                  })
            console.log(res.data)
            setCategories(res.data)
            }catch(error){
                console.log(error)
            }
        
        }
    
    
        fetchCategories()
    },[token])
    return(
        <CategoryContext.Provider value={{categories, setCategories}}>
            {children}
        </CategoryContext.Provider>
    );
    
};

