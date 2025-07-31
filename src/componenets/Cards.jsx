import React from 'react'
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Cards = () => {


    const [projects, setProjects] = useState([]);
    //   const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const location = useLocation();

    const { projectsSearch } = location.state || {};



    const goToPageB = (data) => {
        navigate('/addcomment', {
            state: { data }
        });
    };


    const handleSubmit = async () => {

        try {
            const res = await fetch("https://task-server-4x4g.onrender.com/api/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });


            const data = await res.json();
            setProjects(data)
            // console.log("Project created:", data);

        } catch (err) {
            console.error(err.message);
            alert("Error: " + err.message);
        }
    };

    useEffect(() => {
        handleSubmit();
    }, [])
    return (
        <div>

            <div className="container-fluid">
                <div className="row">
                    {projectsSearch ? projectsSearch?.map((data, index) => <div key={index} className="col-sm-6 col-md-4 col-lg-3 "><div className="card lnrgrd"  style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <div className="card-body">
                            <h5 className="card-title">{data?.title}</h5>
                            <p className="card-text">
                                {data?.description}
                            </p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Name :- {data?.user?.username}</li>
                            <li className="list-group-item">Email :- {data?.user?.email}</li>
                        </ul>
                        <div className="card-body d-flex justify-content-between">
                            <Link to={data?.githubLink}>
                                <button type="button" className="btn btn-success me-1">GitHub-Link</button>
                            </Link>
                            <Link to={data?.liveLink}>
                                <button type="button" className="btn btn-info me-1">Live Link</button>
                            </Link>
                        </div>
                        <div className='d-flex justify-content-center'>

                            <button onClick={() => goToPageB(data)} type="button" className="btn btn-warning my-2">Add Feedback</button>


                        </div>
                    </div>
                    </div>) : projects?.map((data, index) => <div key={index} className="col-md-6 col-lg-4  mb-4"><div className="card lnrgrd" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{data?.title}</h5>
                            <p className="card-text">
                                {data?.description}
                            </p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Name :- {data?.user?.username}</li>
                            <li className="list-group-item">Email :- {data?.user?.email}</li>
                        </ul>
                        <div className="card-body d-flex justify-content-between">
                            <Link to={data?.githubLink}>
                                <button type="button" className="btn btn-success me-1">GitHub-Link</button>
                            </Link>
                            <Link to={data?.liveLink}>
                                <button type="button" className="btn btn-info me-1">Live Link</button>
                            </Link>
                        </div>
                        <div className='d-flex justify-content-center'>

                            <button onClick={() => goToPageB(data)} type="button" className="btn btn-warning my-2">Add Feedback</button>


                        </div>
                    </div>
                    </div>)}
                </div>
            </div>




        </div>
    )
}

export default Cards
