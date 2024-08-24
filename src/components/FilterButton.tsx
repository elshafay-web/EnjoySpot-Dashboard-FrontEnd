/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Button } from 'primereact/button'

interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  props?: any
}

export default function FilterButton({ onClick, props }: Props) {
  return (
    <Button className="p-2 px-3" severity='secondary' onClick={onClick} {...props}>
      <i className="fa-solid fa-filter text-2xl text-white me-3" />
      Filter
    </Button>
  )
}
