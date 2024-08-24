export default function DataCard() {
  return (
    <div className="mb-4" >
      <div className="rounded-2xl bg-gray-50 py-4 text-center ring-1 ring-inset ring-darkBlue/5 lg:flex lg:flex-col lg:justify-center">
        <div className="mx-auto max-w-xs px-4">
          <p className="text-base font-semibold text-darkBlue">
            Number Of Suppliers
          </p>
          <p className="mt-6 flex items-baseline justify-center gap-x-2">
            <span className="text-5xl font-bold tracking-tight darkBlue">
              220
            </span>
            <span className="text-sm font-semibold leading-6 tracking-wide text-darkBlue">
              one
            </span>
          </p>
          <p className="mt-6 text-xs leading-5 text-darkBlue">
            Invoices and receipts available for easy company reimbursement
          </p>
        </div>
      </div>
    </div>
  )
}
