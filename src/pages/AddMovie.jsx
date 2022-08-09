import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { filmRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: 0,
    ticketPrice: 0,
    country: "",
    genre: "",
    photo: {},
  });

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }else{
        setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)))
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
      console.log(event.target.name)
    setValues({ ...values, [event.target.name]: event.target.files[0] });

  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const {
        name,
        description,
        releaseDate,
        rating,
        ticketPrice,
        country,
        genre,
        photo,
      } = values;

      const formData = new FormData();
      formData.append('name', name)
      formData.append('description', description)
      formData.append('releaseDate', releaseDate)
      formData.append('rating', rating)
      formData.append('ticketPrice', ticketPrice)
      formData.append('country', country)
      formData.append('genre', genre)
      formData.append('photo', photo)

      const { data } = await axios.post(filmRoute, formData, 
      {
        headers: {
          "x-access-token": currentUser.token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (!data.success) {
        return toast.error(data.message, toastOptions);
      }

      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return toast.error(error.response.data.message, toastOptions);
      } else {
        return toast.error(error.message, toastOptions);
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Movie App</h1>
          </div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="textarea"
            placeholder="Description"
            name="description"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Release date"
            name="releaseDate"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="number"
            placeholder="Ratings"
            name="rating"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="number"
            placeholder="Ticket price"
            name="ticketPrice"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="file"
            placeholder="Movie image"
            name="photo"
            onChange={(e) => handleImageChange(e)}
          />
          <button type="submit">Add Movie</button>
          {/* <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span> */}
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
