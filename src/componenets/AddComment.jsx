import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const AddComment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { data } = location.state || {};
    const [comment, setComment] = useState()


    console.log(data)
    const comment_array = data?.comments;
    const id = data?._id;
    const submitComment = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`https://task-server-4x4g.onrender.com/api/comments/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // 🔐 Send token here
                },
                body: JSON.stringify({
                    text: comment,

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
                    <label htmlFor="exampleFormControlTextarea1">Add Feedback</label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows={3}
                        defaultValue={""}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div className='d-flex justify-content-center'>
                    <button type="button" class="btn btn-warning my-2" onClick={submitComment}>Add Feedback</button>

                </div>
            </form>


            <div className='p-5 bg-danger'>
                <div className="text-center">
                    <h3 className='text-white mb-4'>Existing Comments</h3>
                </div>
                {comment_array?.map((data, index) => <p key={index} className='my-2 p-2 bg-dark text-danger'>{data?.text}</p>)}


            </div>

        </div>
    )
}

export default AddComment
