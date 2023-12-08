import React from 'react';
import AuthLayout from '@/layout/AuthLayout';
import { Layout, Typography, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';
import SideContent from '@/components/SideContent';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const EquipmentGrid = ({ equipmentItems }) => {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '10px',
        }}
      >
        {equipmentItems.map((item, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              backgroundColor: '#f0f8f4', // Light green background
            }}
          >
            {item}
          </div>
        ))}
      </div>
    );
  };

const ExperienceParagraph = () => (
    <Paragraph>
      <ul style={{ columns: 2, listStyleType: 'none', paddingInlineStart: '0' }}>
        <li>Since 1980 working in the pulp & paper industry.</li>
        <li>Offices in the main areas of paper plants.</li>
        <li>Extensive experience in sales and customer service.</li>
        <li>Self-confidence and level of competitiveness.</li>
        <li>The best response times.</li>
        <li>Total knowledge of Andritz equipment.</li>
        <li>Direct technical support from Andritz.</li>
        <li>Technicians highly competent in the pulp & paper industry.</li>
        <li>Excellent knowledge of people working in the pulp & paper industry and owners.</li>
        <li>Knowledge of the Mexican and International pulp & paper market.</li>
        <li>Excellent communication.</li>
        <li>We know who our competition is.</li>
      </ul>
    </Paragraph>
  );
  

const AdditionalInfoPage = () => {
    const equipmentItems = [
        'Transport feeders to the pulper',
        'Fiber recovery drum Trommel',
        'Refiners',
        'Parabolic thickeners',
        'Rejects handling systems',
        'Garbage handling pumps',
        'Conventional and drum hydrapulpers',
        'Raggers',
        'Pressurized screens',
        'Disc filter thickeners',
        'Screw presses',
        'Pulp and water pumps',
        'Motors',
        'Drum pulpers',
        'De-trashing systems',
        'Drum thickeners',
        'High and low consistency cleaners',
        'Wet Lap systems',
        'Vacuum pumps',
        'Valves and instrumentation',
      ];

    
  return (
    <AuthLayout sideContent={<SideContent />}>
      <Content
        style={{
          padding: '50px 30px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <Title level={2} style={{ color: '#3b7d2e' }}>Do you want to make better paper?</Title>
        <Paragraph>
          Marin International offers machinery and spare parts for your stock preparation systems,
          new and rebuilt with warranty, as well as complete paper machines, parts, and spare parts
          for paper manufacturing lines. We also offer reconstruction and upgrades for your
          preparation systems and equipment of stock preparation systems and paper machine, at
          competitive prices and of excellent quality.
        </Paragraph>
        <Divider />

        <div style={{ marginBottom: '20px' }}>
          <Title level={4} style={{ color: '#3b7d2e' }}>Preparation of Pulps - Equipment:</Title>
          <EquipmentGrid equipmentItems={equipmentItems} />
        </div>
        <Divider />

        {/* Other sections... */}

        <Divider style={{ borderColor: 'green' }} />

        <Title level={2} style={{ color: '#3b7d2e' }}>Our Experience at Your Service</Title>
        <ExperienceParagraph />

        <Title level={2} style={{ color: '#3b7d2e' }}>About Us</Title>
        <Paragraph>
          Marin International offers you the best option in the selection of your equipment, since
          we have more than 30 years of experience as a supplier to the Pulp and Paper Industry.
          Whatever your company requires in terms of advice, machinery, equipment, and spare parts,
          Marin International puts it at your fingertips with the best technology and in your
          language. We have enough experience in the paper industry to provide you with a high
          quality and efficient service.
        </Paragraph>
        <Divider style={{ borderColor: '#3b7d2e' }} />

        <Title level={2} style={{ color: '#3b7d2e' }}>Mission and Vision</Title>
        <Paragraph>
          To be a multinational company that, with social responsibility and doing things right,
          contributes to the productivity of its clients, offering innovative, competitive, and
          profitable products, technical support, and services to ensure sustainable development for
          our clients.
        </Paragraph>

        <Paragraph>
          To be a leading company in sales of equipment for fiber treatment and manufacturing of all
          types of paper, with the best costs, excellent delivery times, technical services, and
          customer service.
        </Paragraph>

        

        <Divider style={{ borderColor: '#3b7d2e' }} />

        {/* Clear Call to Action */}
        <Button type="primary" style={{ backgroundColor: '#3b7d2e', borderColor: '#3b7d2e' }}>
          <Link to="/login" style={{ color: '#fff' }}>Back to Login Page</Link>
        </Button>
        <Divider />
      </Content>
    </AuthLayout>
  );
};

export default AdditionalInfoPage;
