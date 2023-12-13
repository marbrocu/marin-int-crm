import { ErpLayout } from '@/layout';
import CreateInvoiceItem from '@/modules/ErpPanelModule/CreateInvoiceItem';
import QuoteForm from '@/modules/QuoteModule/Forms/QuoteForm';

export default function CreateQuoteModule({ config }) {
  return (
    <ErpLayout>
      <CreateInvoiceItem config={config} CreateForm={QuoteForm} />
    </ErpLayout>
  );
}
