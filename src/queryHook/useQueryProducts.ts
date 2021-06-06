import { useQuery } from "react-query";
import axios from "axios";
import config from "../config/config";

export const useQueryProducts = () => {
    return useQuery('products',() => axios.get(config.PRODUCT))
}