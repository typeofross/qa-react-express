import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import config from '/config.js';
import services from '/services/fetch.js';
import PostItem from '/src/components/partials/PostItem.jsx';

function Post() {
  const [postData, setPostData] = useState('');
  const [update, setUpdate] = useState(false);
  const [comment, setComment] = useState({ body: "" });
  const [updatedComment, setCommentUpdate] = useState('');
  const [rate, setRate] = useState(false);
  const [error, setError] = useState([]);
  const params = useParams();

  useEffect(() => {
    getPost()
  }, [rate, comment])

  const getPost = async () => {
    try {
      const response = await services.get('post', params.id, "", { credentials: 'include' });

      if (response.status !== 'success') {
        throw new Error(response.message)
      }

      setPostData(response.message);

    } catch (err) {
      console.error(err)
    }

  }

  const handleRateAction = async (type, id, action) => {
    try {
      if (!config.getCookie()) {
        return;
      }

      const response = await services.crud(type, "", { "id": id, "action": action }, "POST");

      if (response.status !== 200) {
        throw new Error(response.message)
      }

      setRate(rate => !rate);

    } catch (err) {
      console.error(err)
    }
  }

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      comment.postId = params.id;

      const response = await services.crud("addComment", comment, "", "POST");

      if (response.status !== "success") {
        setError(response.message)
        throw new Error(response.message)
      }

      setComment({ body: "" });

    } catch (err) {
      console.error(err)
    }
  }

  const commentDeleteHandler = async (id) => {
    try {
      const response = await services.crud('deleteComment', "", id, "DELETE");

      if (response.status !== 204) {
        throw new Error(response.message)
      }

      setComment({ body: "" })

    } catch (err) {
      console.error(err)
    }
  }

  const commentUpdateHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await services.crud('updateComment', updatedComment, e.target.id, "PATCH");

      if (response.status !== 'success') {
        setError(response.message);
        throw new Error(response.message)
      }

      setComment({ body: "" })
      setUpdate(update => !update);

    } catch (err) {
      console.error(err)
    }
  }

  if (!postData) {
    return;
  }

  return (
    <>
      <PostItem
        post={postData}
        rate={handleRateAction}
        handleSubmitComment={handleComment}
        error={error}
        setError={setError}
        comment={comment}
        setComment={setComment}
        updatedComment={updatedComment}
        setCommentUpdate={setCommentUpdate}
        commentDeleteHandler={commentDeleteHandler}
        commentUpdateHandler={commentUpdateHandler}
        update={update}
        setUpdate={setUpdate}
      />
    </>
  );
}

export default Post;