import React from 'react';
import { Space, Layout, Divider } from 'antd';
import { Typography } from 'antd';
import { FacebookOutlined , WhatsAppOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import logo from '@/style/images/logo.png';
import logo1 from '@/style/images/logo1.png';
import logo2 from '@/style/images/logo2.png';
import logo3 from '@/style/images/logo3.png';
import logo4 from '@/style/images/logo4.png';

const { Content } = Layout;
const { Title, Text } = Typography;
const greenLineStyle = {
  borderColor: 'green',
  borderWidth: '2px',
  borderStyle: 'solid',
};

const buttonStyles = {
  backgroundColor: 'white',
  borderColor: '#3b5998',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function SideContent() {
  return (
    <Content
      style={{
        padding: '120px 30px 30px',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
      }}
      className="sideContent"
    >
      <div style={{ width: '100%' }}>
        <img src={logo} alt="Logo" style={{ margin: '0 auto 20px', display: 'block' }} />
        <div className="space10"></div>
        <ul className="list-checked">
          <Text>
            MARININC
            <br />
            ---------------------------------
            <br />
            ---------------------------------
            <br />
            ---------------------------------
          </Text>
          <Divider style={greenLineStyle} />
          <Text>
            MARININC
            <br />
            ---------------------------------
            <br />
            ---------------------------------
            <br />
            ---------------------------------
            <br />
            ---------------------------------
          </Text>
        </ul>
        <Divider />

        <Button
          type="primary"
          style={buttonStyles}
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookOutlined style={{ fontSize: '16px', marginRight: '8px' }} />
          Visit our Facebook Page
        </Button>
        <br></br>
        <Button
          type="primary"
          style={{...buttonStyles, backgroundColor: '#25D366', borderColor: '#25D366'}}
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppOutlined style={{ fontSize: '16px', marginRight: '8px' }} />
          Contact us on WhatsApp
        </Button>
      </div>
    </Content>
  );
}
