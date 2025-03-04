import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import config from '/config.js';
import services from '../../services/fetch.js';
import PostItem from './partials/PostItem.jsx';

function Post() {
  const [data, setData] = useState('');
  const [body, setBody] = useState('');
  const [rate, setRate] = useState(false);
  const [error, setError] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetchData()
  }, [rate, body])

  const fetchData = async () => {
    try {
      const response = await services.getPost(params.id);

      if (response.status !== 'success') {
        throw new Error(response.message)
      }

      setData(response.message);

    } catch (err) {
      console.error(err)
    }

  }

  const handleRateAction = async (action) => {
    try {
      if (!config.getCookie()) {
        return;
      }
      const response = await services.rate(params.id, action);

      if (response.status !== 200) {
        throw new Error(response.message)
      }

      setRate(rate => !rate);

    } catch (err) {
      console.error(err)
    }
  }

  const handleComment = async (comment) => {
    try {
      let postData = {
        "body": comment,
        "postId": params.id
      };

      const response = await services.addComment(postData);

      if (response.status !== "success") {
        setError(response.message)
        throw new Error(response.message)
      }

      setError('');
      setBody('');

    } catch (err) {
      console.error(err)
    }
  }

  if (!data) {
    return;
  }

  return (
    <>
      <PostItem post={data} rate={handleRateAction} comment={handleComment} error={error} data={body} setData={setBody} />
    </>
  );
}

export default Post;