import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 10,          // 10 virtual users
  duration: '10s',  // run for 10 seconds
};

export default function () {
  let res = http.get('http://localhost:3000');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body is correct': (r) => {
      const bodyStr = typeof r.body === 'string' ? r.body : String.fromCharCode.apply(null, new Uint8Array(r.body));
      return bodyStr.includes('Hello World!');
    },
  });

  sleep(1);
}
