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
                <div className=" px-4">
                    <div className='row'>
                        <div className='col-md-9 d-flex justify-content-between'>

                            <Link to="/">
                                <p className="navbar-brand">Pacta Canada </p>
                            </Link>
                            <div className='d-flex'>

                            <Link to="/login">
                                <p className="navbar-brand">Login /</p>
                            </Link>
                            <Link to="/register">
                                <p className="navbar-brand">Register </p>
                            </Link>
                            </div>
                        </div>

                        <div className='col-md-3 d-flex justify-content-center'>
                            <form className="d-flex">

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
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
