import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import ConfirmationForm from '@/modules/ConfirmationModule/Forms/ConfirmationForm';

export default function CreateConfirmationModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={ConfirmationForm} />
    </ErpLayout>
  );
}
