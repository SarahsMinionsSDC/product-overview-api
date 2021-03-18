import http from 'k6/http';
import { sleep } from 'k6';
export default function () {
  http.get('https://127.0.0.1:3000/products/10000');
  sleep(1);
}