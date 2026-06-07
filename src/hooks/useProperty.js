import { useQuery } from "@tanstack/react-query";
import api from "../api";

// Fetch properties
export const useProperties = () => {
  const fetchProperties = async () => {
    const token = localStorage.getItem("access");
    console.log("Fetching properties...");

    const response = await api.get("/api/properties/");

    console.log("Fetched properties:", response.data);

    return response.data;
  };

  const {
    data = [],
    error,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  console.log("Query Error:", error);

  return {
    properties: data,
    error,
    isPending,
    refetch,
  };
};