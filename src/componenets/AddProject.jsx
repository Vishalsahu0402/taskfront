import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [github, setGithub] = useState("");
    const [live, setLive] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const res = await fetch("https://task-server-4x4g.onrender.com/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // 🔐 Send token here
                },
                body: JSON.stringify({
                    title,
                    description,
                    githubLink: github,
                    liveLink: live,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to create project");
            }

            const data = await res.json();
            console.log("Project created:", data);

            // Navigate to projects list or dashboard
            navigate("/");

        } catch (err) {
            console.error(err.message);
            alert("Error: " + err.message);
        }
    };


    return (
        <div>

            <form className='p-4'>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Project title.</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="ABCD"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Project description textarea</label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows={3}
                        defaultValue={""}
                        onChange={(e) => setDescription(e.target.value)}

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Github Link.</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="git.com"
                        onChange={(e) => setGithub(e.target.value)}

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Live Project Link.</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="live.com"
                        onChange={(e) => setLive(e.target.value)}
                    />
                </div>


                <div className='d-flex justify-content-center'>
                    <button type="button" class="btn btn-warning my-2" onClick={handleSubmit}>Add Project</button>

                </div>

            </form>


        </div>
    )
}

export default AddProject
