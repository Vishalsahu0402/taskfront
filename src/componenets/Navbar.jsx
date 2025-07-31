import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {


    const [query, setQuery] = useState('');
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query.trim()) return;

        setError('');

        try {
            const res = await fetch(`https://task-server-4x4g.onrender.com/api/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();

            if (res.ok) {

                goToPageB(data);
            } else {
                setError(data.error || 'Search failed');
                console.log(error)
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while searching.');
        }
    };

    const navigate = useNavigate();

    const goToPageB = (data) => {
        navigate('/', {
            state: { projectsSearch: data?.projects }
        });
    };


    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/">
                        <a className="navbar-brand">Pacta Canada </a>
                    </Link>
                    <form className="d-flex">
                    <Link to="/login">
                        <a className="navbar-brand">Login /</a>
                    </Link>
                    <Link to="/register">
                        <a className="navbar-brand">Register </a>
                    </Link>
                        
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button className="btn btn-outline-success" type="submit" onClick={handleSearch}>
                            Search
                        </button>
                    </form>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
