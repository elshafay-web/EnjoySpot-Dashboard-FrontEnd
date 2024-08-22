import { Button } from 'primereact/button'

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  buttonText?: string
}

export default function AddButton({ onClick, buttonText }: Props) {
  return (
    <Button type="button" onClick={onClick}>
      <i className="fa-solid fa-plus text-xl mx-2"></i> {buttonText}
    </Button>
  )
}
