import { useGetAllCustomers } from '@apis/customer/apis';
import { addTransaction } from '@apis/transactioins/apis';
import { ICustomer, ICustomerGetRequestFilter } from '@domains/ICustomer';
import { IListing } from '@domains/IListing';
import { IListingPackages } from '@domains/IListingPackage';
import { IAddTransaction } from '@domains/ITransactions';
import { formatDate } from '@helpers/helpingFun';
import UbsertCustomers from '@modules/customers/components/upsert';
import { useMutation } from '@tanstack/react-query';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  listing?: IListing;
  listingPackage?: IListingPackages;
};
export default function Booking({
  open,
  onCancel,
  onSubmit,
  listing,
  listingPackage,
}: Props) {
  const [filter, setFilter] = useState<ICustomerGetRequestFilter>({
    IsActive: true,
    PageSize: 10000,
    PageNumber: 1,
    Search: '',
  });
  const [autoCompleteItems, setAutoCompleteItems] = useState<ICustomer[]>([]);
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [openAddCustomer, setOpenAddCustomer] = useState<boolean>(false);
  const { data: customers, refetch } = useGetAllCustomers(filter);
  const { mutate, isPending } = useMutation({
    mutationFn: (req: IAddTransaction) => addTransaction(req),
    onSuccess: async (res) => {
      toast.success(res.message);
      onSubmit();
    },
  });

  useEffect(() => {
    if (customers) {
      setAutoCompleteItems(customers);
    }
  }, [autoCompleteItems, customers]);

  const handleSubmit = () => {
    mutate({
      customer_Id: customer.id,
      customerData: null,
      listing_Id: listing && listing.id > 0 ? listing.id : null,
      listingPackage_Id:
        listingPackage && listingPackage.id > 0 ? listingPackage.id : null,
      startDate:
        listing && listing.id > 0 && listing.priceType === 'Hour'
          ? formatDate(startDate)
          : null,
      endDate: formatDate(endDate),
    });
  };

  const itemTemplate = (item: ICustomer) => (
    <div>
      <div className="flex justify-between items-center w-100 ">
        <div className="flex justify-start items-center">
          <img
            src="/avatar.png"
            alt={item.name}
            width="40"
            height="40"
            style={{ marginRight: '1em', borderRadius: '50%' }}
          />
          <div>
            <p className="m-0 p-0 fs-6">{item.name}</p>
            <p className="m-0 p-0 fs-8">{item.email}</p>
          </div>
        </div>

        <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded">
          {item.source}
        </span>
      </div>
    </div>
  );

  return (
    <Dialog
      modal
      visible={open}
      onHide={() => {
        onCancel();
      }}
      header="Reserve"
      style={{ width: '50vw', minHeight: '50vh' }}
    >
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3">
          <label htmlFor="zxczxc" className="fs-6 mb-1">
            Search By Customer
          </label>
          <div className="flex">
            <AutoComplete
              value={filter.Search}
              suggestions={autoCompleteItems}
              completeMethod={(e) => {
                setFilter({ ...filter, Search: e.query });
              }}
              field="name"
              itemTemplate={itemTemplate}
              onSelect={(e) => {
                setCustomer(e.value);
                setFilter({ ...filter, Search: e.value.name });
              }}
              className="w-100"
              inputClassName="w-[530px]"
              placeholder="write contact name"
            />
            <Button
              icon="pi pi-plus text-sm mx-2"
              aria-label="Filter"
              raised
              tooltipOptions={{ position: 'bottom' }}
              tooltip="Edit"
              severity="success"
              className="mx-2 p-2"
              onClick={() => setOpenAddCustomer(true)}
            >
              Add a New Customer
            </Button>
          </div>
        </div>
        {listing && listing.priceType === 'Hour' && (
          <div className="col-span-1">
            <label
              htmlFor="startDate"
              className="w-full form-label font-bold text-secondary !mb-1"
            >
              Start Date
            </label>
            <Calendar
              name="startDate"
              onChange={(e) => setStartDate(e.value)}
              value={startDate}
              placeholder="Select a Date"
              className="w-full transition duration-300 rounded mt-1 "
            />
          </div>
        )}

        <div className="col-span-1">
          <label
            htmlFor="startDate"
            className="w-full form-label font-bold text-secondary !mb-1"
          >
            End Date
          </label>
          <Calendar
            name="endDate"
            onChange={(e) => setEndDate(e.value)}
            value={endDate}
            placeholder="Select a Date"
            className="w-full transition duration-300 rounded mt-1 "
          />
        </div>
      </div>

      <div className="flex items-center mt-10 grid ">
        <div className="col-12 ">
          <Button
            label="Submit"
            raised
            type="button"
            className="rounded p-2"
            style={{ width: '100px' }}
            disabled={isPending}
            onClick={() => handleSubmit()}
          />

          <Button
            label="Cancle"
            raised
            severity="secondary"
            type="button"
            className="rounded p-2 ms-4"
            style={{ width: '100px' }}
            onClick={onCancel}
          />
        </div>
      </div>

      <UbsertCustomers
        open={openAddCustomer}
        intialValues={{} as ICustomer}
        mode="add"
        onClose={() => {
          setOpenAddCustomer(false);
          refetch();
        }}
      />
    </Dialog>
  );
}
