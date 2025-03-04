import { useNavigate, useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import config from '/config.js';
import services from '../../services/fetch.js';
import PostItem from './partials/PostItem.jsx';

function Post() {
  const [data, setData] = useState('');
  const [rate, setRate] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetchData()
  }, [rate])

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

  if (!data) {
    return;
  }

  return (
    <>
      <PostItem post={data} rate={handleRateAction} />
    </>
  );
}

export default Post;