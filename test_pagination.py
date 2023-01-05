import requests
import threading
import time
from random import randint, shuffle

host = 'http://localhost/api'

route = 'employees/all?page=page&limit=limit&'

limits = [10, 25, 50, 100, 1000, 10000]
def get_random_page(id, limit):
  count = requests.get(f'{host}/postgres/employees/count?id={id}').json()['response']
  page = randint(0, int(count/limit))
  return page

def get_employee():
  return requests.get(f'{host}/employee/random').json()

def get_departments ():
  for limit in limits:
    page = get_random_page('test', limit)
    employee = get_employee()
    dbs = ['mongo', 'postgres']
    shuffle(dbs)
    for db in dbs:
        s = randint(5, 10)
        time.sleep(s)
        requests.get(f'{host}/{db}/{route}id=test'.replace('=page', f'={page}').replace('=limit', f'={limit}'))
    

if __name__ == "__main__":
    threads = [threading.Thread(target=get_departments) for t in range(100) ]
    for t in threads:
      t.start()