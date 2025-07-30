import React, { useEffect, useState } from "react";
import { api } from "../api/api";

export const useAuth = ()=>{
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{

        api
            .get("https://xplorenow.onrender.com/api/v1/users/me")
            .then((res)=>{
                setUser(res.data.data)})
            .catch(()=>setUser(null))
            .finally(()=>setLoading(false))
    },[])
    console.log(user)
    return {user , loading}
} 