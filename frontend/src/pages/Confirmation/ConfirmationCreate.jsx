import configPage from './config';
import CreateConfirmationModule from '@/modules/ConfirmationModule/CreateConfirmationModule';

const customConfig = {
  /*your custom config*/
};
const config = {
  ...configPage,
  //customConfig,
};

export default function ConfirmationCreate() {
  return <CreateConfirmationModule config={config} />;
}
