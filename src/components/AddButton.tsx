import { Button } from 'primereact/button'

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  buttonText?: string
}

export default function AddButton({ onClick, buttonText }: Props) {
  return (
    <Button type="button" className='px-3 py-2' onClick={onClick}>
      <i className="fa-solid fa-plus text-xl me-3"></i> {buttonText}
    </Button>
  )
}
