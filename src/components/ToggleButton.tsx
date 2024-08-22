/* eslint-disable react/function-component-definition */
import React from 'react'
import { Button } from 'primereact/button'

interface ToggleButtonProps {
  isActive: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isActive, onClick }) => (
  <Button
    icon={isActive ? 'pi pi-times' : 'pi pi-check'}
    rounded
    text
    raised
    tooltip={isActive ? 'DeActivate' : 'Activate'}
    severity={isActive ? "danger" : "success"}
    onClick={onClick}
    tooltipOptions={{ position: 'top' }}
    className='me-4'
    size='small'
    
  />
)

export default ToggleButton
