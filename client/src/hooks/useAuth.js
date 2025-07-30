import React, { useEffect, useState } from "react";
import { api } from "../api/api";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/users/me");
                setUser(res.data.data);
            } catch (err) {
                setUser(null);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, []);

    return { user, loading, error };
};