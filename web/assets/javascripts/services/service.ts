import { PATH } from 'env'
import logoUrl from '../../images/logo.png'

type Data = {
  status: string
  logoUrl: string
}

const data: Data = {
  status: 'success',
  logoUrl,
}

function echo() {
  console.log(`PATH is ${PATH}`)
  console.log('>>> Load...', data)
}

export const MyService = {
  echo,
}
