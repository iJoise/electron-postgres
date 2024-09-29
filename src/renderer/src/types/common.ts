type SuccessResponseType<T> = {
  success: true
  data: T
}

type ErrorResponseType = {
  success: false
  error: string
}

export type ResponseType<T> = SuccessResponseType<T> | ErrorResponseType
