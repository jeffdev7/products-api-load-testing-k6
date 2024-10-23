import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    createProducts:{
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
    const url = 'https://localhost:7163/api/product'
    const payload = JSON.stringify({
        "name": "New Product",
        "price": 70,
        "stock": 3
    })
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
        
    }

  const response = http.post(url, payload, params)

  check(response, {'201': (r) => r.status === 201 })

  sleep(1);
}
