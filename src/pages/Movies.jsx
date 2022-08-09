import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { filmRoute, commentRoute } from "../utils/APIRoutes";

import { Button } from "@mui/material";
import HomePageContainer from "../components/HomePageContainer";
import Comments from "../components/Comments";

import { useParams } from 'react-router-dom'

const Home = () => {
  const { slug } = useParams()

  const [movie_list, setMovies] = useState([]);
  const [commentIndex, setCommentIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        if (slug) {
          const movie = await axios.get(filmRoute + `/${slug}`);

          if (movie.data.success) setMovies([movie.data.data]);
          else setMovies([]);

          if (movie.data.data) {
            setCommentIndex(0);
            if (movie.data.data.comments) {
              setComments(movie.data.data.comments);
            }
          }
        } else {
          const movies = await axios.get(filmRoute);
          setMovies(movies.data.list);

          if (movies.data.list.length > 0) {
            setCommentIndex(0);
            if (movies.data.list[commentIndex].comments) {
              setComments(movies.data.list[commentIndex].comments);
            }
          }
        }
        setLoading(false);
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
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

    fetchMovies();
  }, [refresh]);

  const handleOnChange = async (currentItem, pageIndex) => {
    setLoading(true);
    setCommentIndex(pageIndex);
    if (movie_list[pageIndex].comments) {
      setComments(movie_list[pageIndex].comments);
    } else {
      setComments([]);
    }
    setLoading(false);
  };

  const handleTextOnChange = async (event) => {
    event.preventDefault();
    setNewComment(event.target.value);
  };

  const handleTextOnSubmit = async (props) => {
    try {
      let body = {
        ref: movie_list[commentIndex]._id,
        comment: newComment,
        user_id: currentUser._id,
      };

      const add_comment = await axios.post(commentRoute, body, {
        headers: {
          "x-access-token": currentUser.token,
          "Content-Type": "application/json",
        },
      });

      if (add_comment.data.success) {
        setRefresh(!refresh);
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

  const handleLoginRegister = async () => {
    try {
      navigate("/login");
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

  const handleAddMovie = async () => {
    try {
      if (currentUser !== null) {
        navigate("/films/create");
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
    <div className="containerf">
      <div className="header">
        <h1>Movie App</h1>
      </div>
      <div className="buttons">
        {currentUser === null ? (
          <Button onClick={() => handleLoginRegister()}>Login / Signup</Button>
        ) : (
          <Button onClick={() => handleAddMovie()}>Add Movie</Button>
        )}
      </div>
      <div className="slider">
        <HomePageContainer
          movies={movie_list}
          onChange={(currentItem, pageIndex) =>
            handleOnChange(currentItem, pageIndex)
          }
        />
      </div>
      <div className="comments">
        <Comments
          comments={comments}
          loading={loading}
          onChange={(event) => handleTextOnChange(event)}
          onSubmit={(props) => handleTextOnSubmit(props)}
          currentUser={currentUser}
        />
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default Home;
