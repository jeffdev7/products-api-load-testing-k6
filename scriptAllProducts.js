import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    getAllProducts:{
      executor: 'ramping-vus',
      startVUs: 10,
      stages:[
        {duration: '20s', target: 100}, //ramp up
        {duration: '30s', target: 100}, //stable
        {duration: '10s', target: 0}, //ramp-down
      ],
      gracefulRampDown: '0s',

    }
    
  }
};

export default function() {
  const response = http.get('https://localhost:7163/api/product');
  check(response, {'200': (r) => r.status === 200 })
  sleep(1);
}
