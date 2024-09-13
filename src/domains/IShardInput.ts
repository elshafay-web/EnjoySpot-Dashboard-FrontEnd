/* eslint-disable @typescript-eslint/no-explicit-any */
export interface InputCreateModel {
  inputName: string
  title: string
  value?: any
  isRequired?: boolean
  minLength?: number
  maxLength?: number
  isPassword?: boolean
  isNumber?: boolean
}
