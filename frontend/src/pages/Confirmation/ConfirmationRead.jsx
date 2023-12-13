import configPage from './config';
import ReadConfirmationModule from '@/modules/ConfirmationModule/ReadConfirmationModule';

export default function ConfirmationRead() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <ReadConfirmationModule config={config} />;
}
