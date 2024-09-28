import { ICustomer } from '@domains/ICustomer';
import { formatDate } from '@helpers/helpingFun';
import InputView from './inputView';

export default function CustomerProfile({ customer }: { customer: ICustomer }) {
  return (
    <div>
      <div className="p-0">
        <div className="d-flex justify-content-between align-items-center">
          <InputView title="Name" value={customer.name} />
          <InputView title="User Name" value={customer.username} />
        </div>
        <div className="separator separator-dashed mb-2" />
        <div className="d-flex justify-content-between align-items-center">
          <InputView title="Email" value={customer.email} />
          <InputView title="Source" value={customer.source} />
        </div>
        <div className="separator separator-dashed mb-2" />
        <div className="d-flex justify-content-between align-items-center">
          <InputView
            title="Contact Phone"
            value={customer.landlineOrMobile ?? ''}
          />
          <InputView
            title="Nationality"
            value={customer.nationalityName ?? ''}
          />
        </div>
        <div className="separator separator-dashed mb-2" />
        <div className="d-flex justify-content-between align-items-center">
          <InputView
            title="Birth Date"
            value={formatDate(new Date(customer.dateOfBirth))}
          />
        </div>
      </div>
    </div>
  );
}
