import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import botImg from "../assets/bot.jpeg";
import RegisterIMG from "../assets/register-img.png";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signupUser, { isLoading, error }] = useSignupUserMutation();
    const navigate = useNavigate();
    //image upload states
    const [image, setImage] = useState(null);
    const [upladingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    function validateImg(e) {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size is 1mb");
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    async function uploadImage() {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "ml_default");
        try {
            setUploadingImg(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/ddompt5vq/image/upload", {
                method: "post",
                body: data,
            });
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url;
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    }

    async function handleSignup(e) {
        e.preventDefault();
        if (!image) return alert("Please upload your profile picture");
        const url = await uploadImage(image);
        console.log(url);
        // signup the user
        signupUser({ name, email, password, picture: url }).then(({ data }) => {
            if (data) {
                console.log(data);
                navigate("/chat");
            }
        });
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
                   
                    <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
                        <h1 className="text-center mb-3">Create Account</h1>
                        
                        <div className="position-relative text-center">
                        <img src={imagePreview || botImg} class="img-fluid rounded-circle border" style={{width: "80px", height: "80px", objectFit: "cover"}}/>
                            <label htmlFor="image-upload" className="position-absolute bottom-0  translate-middle">
                                <i className="fas fa-plus-circle fs-5" style={{cursor:"pointer"}}></i>
                            </label>
                            <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
                        </div>

                        {error && <p className="alert alert-danger">{error.data}</p>}
                       
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Your name" onChange={(e) => setName(e.target.value)} value={name} />
                        </Form.Group>
                       
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </Form.Group>

                        <div className="d-grid gap-2">
                        <Button variant="success" type="submit">
                            {upladingImg || isLoading ? "Signing you up..." : "Signup"}
                        </Button>
                        </div>

                        <div className="py-4">
                            <p className="text-center">
                                Already have an account ? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
                <Col md={5} className="signup__bg">
                    <img src={RegisterIMG} className="img-fluid"/>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;
