
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [country, setCountry] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search?country=${country}`);
    };

    return (
        <div>
            <h1>Welcome to eSIM Store</h1>
            <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter country"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default Home;
