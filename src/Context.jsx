import { createContext, useState, useEffect } from "react";
import api from "./api"; // Adjust path as needed
import { useNavigate } from "react-router-dom";

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // if (window.location.pathname !== "/login") {
      //   navigate("/login");
      // }
      return;
    }

    const fetchProperties = async () => {
      try {
        const res = await api.get("/api/myproperties/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProperties(res.data);
        console.log(res.data)
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [token,navigate]);

  return (
    <PropertyContext.Provider value={{ properties, setProperties }}>
      {children}
    </PropertyContext.Provider>
  );
};
