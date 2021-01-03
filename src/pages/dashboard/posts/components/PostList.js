import { useContext } from 'react';
import { Table, Space, Button,  Divider } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DiffOutlined
} from '@ant-design/icons';

import { Link } from 'react-router-dom';

import moment from 'moment';

import { AbilityContext } from '../../../../context/ability/AbilityContext';

const PostList = ({ posts }) => {
  const ability = useContext(AbilityContext);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created On',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text, record) => {
        const createdAt = moment(text);

        return <span>{createdAt.format('DD/MM/YYYY')}</span>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Link to={`/dashboard/posts/read/${record.id}`}>
              <EyeOutlined />
            </Link>
            {
              ability.can('edit', 'post') && (
                <Link to={`/dashboard/posts/edit/${record.id}`}>
                  <EditOutlined />
                </Link>
              )
            }
            {
              ability.can('delete', 'post') &&
              (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeletingPost(record.id)
                  }
                }>
                  <DeleteOutlined />
                </a>
              )
            }
          </Space>
        );
      }
    },
  ];

  const handleDeletingPost = (postId) => {
    console.log('deleting post with id: ' + postId);
  };

  return (
    <>
      {
        ability.can('create', 'post') && (
          <>
            <Link to="/dashboard/posts/create">
              <Button type="primary" icon={<DiffOutlined />}>
                Create new post
              </Button>
            </Link>
            <Divider />
          </>
        )
      }
      <Table columns={columns} dataSource={posts} />
    </>
  );
};

export default PostList;