type IPropsBase = {
  title: string;
  value?: string | number;
  isVerified?: boolean;
  superscript?: string;
};

type IPropsWithInfo = IPropsBase & {
  showInfo: true;
  infoMessage: string;
};

type IPropsWithoutInfo = IPropsBase & {
  showInfo?: false;
  infoMessage?: never;
};

type IProps = IPropsWithInfo | IPropsWithoutInfo;

export default function InputView({
  title,
  value,
  isVerified,
  showInfo,
  superscript,
}: IProps) {
  return (
    <div className="w-full">
      <div className="flex mb-4">
        <label className="fw-semibold text-gray-400 text-capitalize text-lg">
          {title}
          {showInfo && (
            <i className="fa-solid fa-circle-info text-xl"></i>
          )}
        </label>
        <div className="d-flex align-items-center ms-2">
          <span className="fw-bold text-lg text-gray-800 me-2">
            {value || "-"} {superscript && <sup>{superscript}</sup>}
          </span>
          {isVerified && <span className="badge badge-success">Verified</span>}
        </div>
      </div>
    </div>
  );
}
