import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("https://task-server-4x4g.onrender.com/api/user/loginuser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await res.json();

            // ✅ Save token in localStorage or sessionStorage
            localStorage.setItem("token", data.token);

            // Optional: Save user info
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect to  homepage
            navigate("/");
        } catch (err) {
            alert(err.message);
        }
    };


    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                            alt="login form"
                                            className="img-fluid"
                                            style={{ borderRadius: "1rem 0 0 1rem" }}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i
                                                        className="fas fa-cubes fa-2x me-3"
                                                        style={{ color: "#ff6219" }}
                                                    />
                                                    <span className="h1 fw-bold mb-0">Logo</span>
                                                </div>
                                                <h5
                                                    className="fw-normal mb-3 pb-3"
                                                    style={{ letterSpacing: 1 }}
                                                >
                                                    Sign into your account
                                                </h5>
                                                <div data-mdb-input-init="" className="form-outline mb-4">
                                                    <input
                                                        type="email"
                                                        id="form2Example17"
                                                        className="form-control form-control-lg"
                                                        onChange={(e)=>setEmail(e.target.value)}

                                                    />
                                                    <label className="form-label" htmlFor="form2Example17">
                                                        Email address
                                                    </label>
                                                </div>
                                                <div data-mdb-input-init="" className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        id="form2Example27"
                                                        className="form-control form-control-lg"
                                                        onChange={(e)=>setPassword(e.target.value)}
                                                    />
                                                    <label className="form-label" htmlFor="form2Example27">
                                                        Password
                                                    </label>
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button
                                                        data-mdb-button-init=""
                                                        data-mdb-ripple-init=""
                                                        className="btn btn-dark btn-lg btn-block"
                                                        type="button"
                                                        onClick={handleLogin}
                                                    >
                                                        Login
                                                    </button>
                                                </div>
                                                <a className="small text-muted" href="#!">
                                                    Forgot password?
                                                </a>
                                                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                                                    Don't have an account?{" "}
            
                                                    <p className='cursor-pointer' onClick={()=>navigate("/register")}  style={{ color: "#393f81" }}>
                                                        Register here
                                                    </p>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login
