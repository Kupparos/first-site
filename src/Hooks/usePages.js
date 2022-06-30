import { useMemo } from "react";


export const usePages = (totalePages) => {
   const getPages = useMemo(() => {
     let result = [];
     for (let i = 0; i < totalePages; i++) {
       result.push(i + 1);
     }
     return result;
   }, [totalePages]);
 
   return getPages;
 };