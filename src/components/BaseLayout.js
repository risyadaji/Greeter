import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Greeter from './Greeter.js';

import './BaseLayout.css';

class BaseLayout extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  
  componentDidMount() {
  }

  render() {
    const { Header, Content, Footer } = Layout;

    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {
              // maybe next update will be used as navigation for accessing another features
            }
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '50px 0' }}></Breadcrumb>
          {
            // Place imported content from props
          }
          <div className="site-layout-content">
            <Greeter />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    );
  }

}

export default BaseLayout;
