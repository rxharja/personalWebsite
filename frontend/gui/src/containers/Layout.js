import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import TopHeader from '../components/TopHeader'

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class CustomLayout extends React.Component {
  state = {
    collapsed: false,
  };

  componentDidMount() {
    console.log(this.props);
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            breakpoint="lg"
            collapsedWidth="0"
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
            {
              this.props.isAuthenticated ?

              <Menu.Item key="1" onClick={this.props.logout} >
                <Icon type="logout" />
                <span>Logout</span>
              </Menu.Item>
              :
              <Menu.Item key="1">
                <Icon type="login" />
                <span><Link to="/login">Login</Link></span>
              </Menu.Item>
            }
            <Menu.Item key="2">
              <Icon type="home" />
              <span><Link to="/">Home</Link></span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="fire" />
                  <span>About</span>
                </span>
              }
            >
              <Menu.Item key="3">Who I am</Menu.Item>
              <Menu.Item key="4">Projects</Menu.Item>
              <Menu.Item key="5">Resume</Menu.Item>
            </SubMenu>
            <Menu.Item key="6">
              <Icon type="smile" />
              <span><Link to="/articles">Blog</Link></span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {
            this.props.history.location.pathname === '/' ?
              <Content style={{ margin: '0', height: window.innerHeight }}>
                <div isAuthenticated = {this.props.isAuthenticated}
                style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {this.props.children}
                </div>
              </Content>
              :
              <div>
              <Content style={{ margin: '0 16px'}}>
                <TopHeader
                location = {this.props.location}
                history = {this.props.history}
                style={{ background: '#fff', padding: 0 }} />
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>{this.props.username}</Breadcrumb.Item>
                </Breadcrumb>
                <div isAuthenticated = {this.props.isAuthenticated}
                style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {this.props.children}
                </div>
              </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
              </div>
          }
        </Layout>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch, event) => {
  return {
    logout: () => dispatch(actions.logout())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));

//           <TopHeader style={{ background: '#fff', padding: 0 }} />
