import { useEffect, useState } from 'react';
import { Layout } from 'antd';

import { api } from '../../../lib/api';

import PostList from './components/PostList';

const { Content } = Layout;

const Index = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await api.get('/posts');

    setPosts(response.data.data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Content style={{ padding: '0 24px', minHeight: 280 }}>
      <PostList posts={posts} />
    </Content>
  );
}

export default Index;