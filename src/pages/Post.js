import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://full-stack-server-production-cdf9.up.railway.app/posts/byId/${id}`).then((resp) => {
      setPostObject(resp.data);
    });

    axios.get(`https://full-stack-server-production-cdf9.up.railway.app/comments/${id}`).then((resp) => {
      setComments(resp.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        `https://full-stack-server-production-cdf9.up.railway.app/comments`,
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: res.data.username,
            id: res.data.id,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`https://full-stack-server-production-cdf9.up.railway.app/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`https://full-stack-server-production-cdf9.up.railway.app/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/");
      });
  };

  const editPost = (option) => {
    if (option == "title") {
      let newTitle = prompt("Enter New Title: ");

      axios.put(
        `https://full-stack-server-production-cdf9.up.railway.app/posts/title`,
        { newTitle: newTitle, id: id },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      setPostObject({...postObject,title:newTitle})
      
    } else {
      let newPostText = prompt("Enter New Text: ");
      axios.put(
        `https://full-stack-server-production-cdf9.up.railway.app/posts/postText`,
        { newText: newPostText, id: id },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
        );

        setPostObject({...postObject,postText:newPostText})
    }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div
            className="title"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("title");
              }
            }}
          >
            {postObject.title}
          </div>

          <div
            className="body"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("body");
              }
            }}
          >
            {postObject.postText}
          </div>

          <div className="footer">
            {postObject.username}
            {authState.username === postObject.username && (
              <button onClick={() => deletePost(postObject.id)}>
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            value={newComment}
          />
          <button onClick={addComment}>Add Comments</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label>Username: {comment.username}</label>
                {authState.username === comment.username && (
                  <button onClick={() => deleteComment(comment.id)}>X</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
