/* eslint-disable @typescript-eslint/no-explicit-any */
import AddButton from '@components/AddButton'

type Props = {
  title: string
  openDialog: (edit: { visible: boolean; editObj: any }) => void
}

export default function TableHeader({ title, openDialog }: Props) {
  const openAddModel = () => {
    openDialog({ visible: true, editObj: {} })
  }

  return (
    <div className="flex justify-between items-center w-full mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <AddButton  onClick={openAddModel} buttonText={`Create ${title}`} />
    </div>
  )
}
