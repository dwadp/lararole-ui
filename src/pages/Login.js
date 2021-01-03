import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth/AuthContext';

import { api } from '../lib/api';
import * as storage from './../lib/storage';

const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { authenticated, checkIsAuthenticated } = useContext(AuthContext);

    const handleSignIn = async () => {
      const values = form.getFieldsValue();

      setLoading(true);

      try {
        const response = await api.post('/auth/login', {...values});

        setLoading(false);

        const fieldErrors = form.getFieldsError().map(field => ({
          name: field.name,
          errors: []
        }));

        form.setFields(fieldErrors);
        
        storage.store('token', response.data.data.token);

        checkIsAuthenticated();
      } catch(error) {
        setLoading(false);
        
        const response = error.response;

        if(response.status === 422) {
          const validationErrors = [];

          for(const [key, value] of Object.entries(response.data.errors)) {
            validationErrors.push({
              name: key,
              errors: value
            });
          }

          const fieldErrors = form.getFieldsError();

          if(fieldErrors.length !== validationErrors.length) {
            const fieldKeys = validationErrors.map(field => field.key);

            let errors = fieldErrors.filter(field => !fieldKeys.includes(field.name)).map(field => ({
              name: field.name,
              errors: []
            }));

            errors = [...errors, ...validationErrors];

            form.setFields(errors);
            return;
          }

          form.setFields(validationErrors);
          return;
        }
      }
    };

    useEffect(() => {
      checkIsAuthenticated();
    }, [checkIsAuthenticated]);
  
    return authenticated ? <Redirect to="/dashboard" /> : (
        <Row justify="center" align="middle">
            <Col span={6}>
                <Form
                layout="vertical"
                form={form}
                onFinish={handleSignIn}
                >
                    <Form.Item name="email" label="Email">
                        <Input
                          placeholder="Your email"
                          disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item name="password" label="Password">
                        <Input.Password
                            disabled={loading}
                            placeholder="Your password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                    <Form.Item>
                        <Button
                            block
                            type="primary"
                            loading={loading}
                            htmlType="button"
                            onClick={handleSignIn}
                        >
                          Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
  };

export default Login;