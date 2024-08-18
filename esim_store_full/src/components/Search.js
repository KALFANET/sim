
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PackageList from './PackageList';

function Search() {
    const [country, setCountry] = useState('');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setCountry(params.get('country') || '');
    }, [location]);

    return (
        <div>
            <h2>Search Results for {country}</h2>
            {country && <PackageList country={country} />}
        </div>
    );
}

export default Search;
