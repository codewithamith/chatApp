import React from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import HeroImg from "../assets/hero.png";

import "../index.css"
import { Container } from "react-bootstrap";
import Member1Img from "../assets/abhi-img_01.png";
import Member2Img from "../assets/anand.JPG";
import Member3Img from "../assets/amit.png";
import Member4Img from "../assets/rahul.jpg";
import Member5Img from "../assets/deepak.jpeg";

const teamMembers = [
  {
    name: "Abhishek Kumar",
    class: "MCA-IV",
    regNo: "1751202151/17",
    designation: "MERN Stack Dev.",
    image: Member1Img,
  },
  {
    name: "Anand Vaibhav",
    class: "MCA-IV",
    regNo: "1515270014/14",
    designation: "Project Manager",
    image: Member2Img,
  },
  {
    name: "Amit Kumar",
    class: "MCA-IV",
    regNo: "1715202139/17",
    designation: "Backend Developer",
    image: Member3Img,
  },
  {
    name: "Rahul Raj",
    class: "MCA-IV",
    regNo: "1715101077/17",
    designation: "Graphics Designer",
    image: Member4Img,
  },
  {
    name: "Deepak Kumar",
    class: "MCA-IV",
    regNo: "1602226697/16",
    designation: "Frontend Developer",
    image: Member5Img,
  },
];

function Home() {

  return (
  <>
    <div className="d-flex flex-wrap p-3 align-items-center ">
      <div className="col-md-6 p-3 ">
        <p className="display-5"> Breaking down barriers,</p>
        <p className="display-5"><strong>Chat App</strong> allows you to share your world effortlessly.</p>
        <p className="display-5">Connect globally, chat locally!</p>
        <LinkContainer to="/chat">
          <Button  variant="outline-success" size="lg">
            Get Started <i className="fas fa-comments"></i>
          </Button>
        </LinkContainer>
      </div>
      <div className="col-md-6 mt-3 mt-md-0 d-flex justify-content-center">
        <img
          src={HeroImg}
          alt="Home Background"
          className="img-fluid rounded w-50"
        />
      </div>
    </div>
     
     <div className="text-center p-3">
    <a href="#team" className="text-decoration-none text-primary">
      Team View <i className="fas fa-angle-down"></i>
    </a>
    </div>

    <Container fluid className="py-5" id="team">
      <h2 className="text-center mb-5 display-6">Our Team Members</h2>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center mb-4 p-3 border rounded">
            <img
              src={member.image}
              alt={member.name}
              className="img-fluid mb-4 mt-4 pointer zoom-effect"
              style={{ width: "150px", height: "150px" }}
            />
            <h5>{member.name}</h5>
            <p className="mb-1">Class: {member.class}</p>
            <p className="mb-1">Reg. No: {member.regNo}</p>
            <p className="mb-1">Designation: {member.designation}</p>
          </div>
        ))}
      </div>
    </Container>

</>
  );
}

export default Home;
