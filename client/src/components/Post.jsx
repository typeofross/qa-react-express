import React, { useEffect, useState } from 'react';
import services from '../../services/fetch.js';
import { useParams } from 'react-router';
import PostItem from './partials/PostItem.jsx';

function Post() {
  const [data, setData] = useState('');
  const params = useParams();

  useEffect(() => {
    fetchData()
  }, [])

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

  if (!data) {
    return;
  }

  return (
    <>
      <PostItem post={data} />
    </>
  );
}

export default Post;