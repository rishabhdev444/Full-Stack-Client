import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPost] = useState([]);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate("/login");
    } else {
      axios
        .get("https://full-stack-server-production-cdf9.up.railway.app/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((resp) => {
          setListOfPosts(resp.data.listOfPosts);
          setLikedPost(
            resp.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const likePost = (postId) => {
    axios
      .post(
        "https://full-stack-server-production-cdf9.up.railway.app/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((resp) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (resp.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likeArray = post.Likes;
                likeArray.pop();
                return { ...post, Likes: likeArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPost(
            likedPosts.filter((id) => {
              return id != postId;
            })
          );
        } else {
          setLikedPost([...likedPosts, postId]);
        }
      });
  };

  return (
    <div className="row"> 
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post col">
            <div className="title">{value.title}</div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <div className="username">
                <Link to={`/profile/${value.UserId}`}>
                 {value.username}
                </Link>
                </div>
              <div className="buttons">
                <ThumbUpIcon
                  className={
                    likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  }
                  onClick={() => likePost(value.id)}
                />

                <label>{value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
