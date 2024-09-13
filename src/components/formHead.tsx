type Props = {
  title: string
};
export default function FormHead({ title }: Props) {
  return (
    <h5 className="rounded-[8px] bg-gray-300 py-2 px-3 fw-bold font-bold mt-4">
      <i className="fa-regular fa-circle-question me-4" />
      {title}
    </h5>
  );
}
