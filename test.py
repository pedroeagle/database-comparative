import requests
import threading
import time
from random import randint, shuffle

host = 'http://localhost/api'

routes = [
  'departments/count?',
  'employees/count?',
  'titles/count?',
  'salaries/count?',
  'employees/by/year?',
  'employees/by/department?',
  'last/hirings?',
  'last/promotions?',
  'departments/count?',
  'employees/count?',
  'titles/count?',
  'salaries/count?',
  'employees/by/year?',
  'employees/by/department?',
  'last/hirings?',
  'last/promotions?',
  'employees/all?page=page&size=size&',
  'employees/new?'
]

def get_random_page(id):
  count = requests.get(f'{host}/postgres/employees/count?id={id}').json()['response']
  sizes = [10, 25, 50, 100, 1000, 100000, 1000000]
  size = sizes[randint(0, len(sizes)-1)]
  page = randint(0, int(count/size))
  return size, page

def get_employee():
  return requests.get(f'{host}/employee/random').json()

def get_departments ():
  indexes = [i for i in range(len(routes))]
  shuffle(indexes)
  size, page = get_random_page('test')
  employee = get_employee()
  for i in indexes:
    dbs = ['mongo', 'postgres']
    shuffle(dbs)
    for db in dbs:
      s = randint(0, 5000)/1000
      if 'new' in routes[i]:
        requests.post(f'{host}/{db}/{routes[i]}id=test', json=employee)
      else:
        requests.get(f'{host}/{db}/{routes[i]}id=test'.replace('=page', f'={page}').replace('=size', f'={size}'))
    time.sleep(s)

if __name__ == "__main__":
    threads = [threading.Thread(target=get_departments) for t in range(100) ]
    for t in threads:
      t.start()