import { PrimeIcons } from 'primereact/api';

type Props = {
  title: string;
  icon?: string; // icon should be a string representing the PrimeIcon
};

export function PageHeader({ title, icon = PrimeIcons.FILE }: Props) {
  return (
    <h4
      className="mt-2 mb-4 text-xl font-bold flex items-center"
      style={{
        color: 'rgb(40 56 98)',
        fontWeight: '700!important',
        fontSize: '1.7rem',
        lineHeight: '1.2',
      }}
    >
      <i className={`${icon} me-2 `} style={{ fontSize: '1.8rem ', marginLeft: '12px' }} />
      {title}
    </h4>
  );
}
