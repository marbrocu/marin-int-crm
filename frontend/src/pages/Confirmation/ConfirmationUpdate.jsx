import configPage from './config';
import UpdateConfirmationModule from '@/modules/ConfirmationModule/UpdateConfirmationModule';

export default function ConfirmationUpdate() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <UpdateConfirmationModule config={config} />;
}
