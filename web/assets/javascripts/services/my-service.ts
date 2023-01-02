import axios, {AxiosRequestConfig} from 'axios';
import { PATH } from 'env'
import logoUrl from '../../images/logo.png'
import {HttpService} from "./http.service";

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

async function requests() {
  const res = await HttpService.get('requests')
  console.log('>>>', res.data);
}

export const MyService = {
  echo,
  requests,
}
