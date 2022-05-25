import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Profile() {
    let navigate = useNavigate();
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('/api/users/mycart', {
                    headers: {
                        Authorization: `Bearer ${token}`, // JWT in Authorization header
                    },
                })
                .then((res) => {
                    setCart(res.data);
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        // token expired - remove and redirect to login
                        localStorage.removeItem('token');
                        navigate('/login');
                    }
                });
        } else {
            navigate('/login');
        }
    }, []);
    return (
        <>
            <h2>My profile page</h2>
            <h3>My shopping cart items</h3>
            <ul>{cart && cart.map((c) => <li>{c.item}</li>)}</ul>
        </>
    )
}