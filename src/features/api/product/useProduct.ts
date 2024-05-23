import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../ApiResponse";
import { Product } from "./models";

interface ResponseData extends ApiResponse {
  data: Product;
}

const getProducts = async (category: string): Promise<ResponseData> => {
  const response = await fetch(`https://api.example.com/products/${category}`);
  return response.json();
};

export const useProduct = (category: string) => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => getProducts(category),
  });
};
