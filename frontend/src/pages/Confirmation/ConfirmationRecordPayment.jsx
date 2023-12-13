import configPage from './config';
import RecordPaymentConfirmationModule from '@/modules/ConfirmationModule/RecordPaymentConfirmationModule';

export default function ConfirmationRecord() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <RecordPaymentConfirmationModule config={config} />;
}
