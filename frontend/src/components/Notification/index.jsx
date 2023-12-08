import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Notifications = () => {
  const [notifications, setNotifications] = React.useState([
    { id: 1, text: 'Update to site' },
  ]);

  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter((n) => n.id !== id);
    setNotifications(updatedNotifications);
  };

  return (
    <div className="notifications whiteBox shadow">
      <div className="pad10">
        <p className="strong">Notifications</p>
        <Button type="text" shape="circle" className="del-notif">
          <DeleteOutlined />
        </Button>
      </div>
      <div className="line"></div>
      <div className="notif-list">
        {notifications.map((notification) => (
          <div href="/" key={notification.id} className="notification">
            <Button type="text" className="notif-btn">
              <span>{notification.text}</span>
            </Button>
            <Button
              type="text"
              className="del-notif"
              shape="circle"
              onClick={() => deleteNotification(notification.id)}
            >
              <DeleteOutlined />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notifications;
