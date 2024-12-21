import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'next/headers';
 
export default getRequestConfig(async () => {
  const locale = cookies().get('lenguage')?.value ? cookies().get('lenguage')?.value : 'es';
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});