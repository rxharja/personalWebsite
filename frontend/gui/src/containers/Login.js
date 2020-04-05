import React from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { UserOutlined, LoadingOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class NormalLoginForm extends React.Component {

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.username, values.password);
        this.props.history.push('/');
      }
    });

  };

  render() {
    const { getFieldDecorator } = this.props.form;

    let errorMessage =null;

    if ( this.props.error ) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    return (
      <div>
        {errorMessage}
        {
          this.props.loading ?
          <Spin indicator={antIcon} />
          :
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onSubmit={this.onSubmit}
          >
            <Form.Item name="username">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>

            <Form.Item name="password">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>Login</Button>
              or
              <NavLink style={{marginRight: '10px'}} to="/signup/"> signup</NavLink>
            </Form.Item>
          </Form>
        }
      </div>
    );
  };
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(actions.authLogin(username, password))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm));
