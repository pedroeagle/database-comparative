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
  'employees/search?search=search&',
  'employees/update?',
  'employees/new?'
]

def get_random_employee():
  return requests.get(f'{host}/employee/get').json()

def get_employee():
  return requests.get(f'{host}/employee/random').json()

def target ():
  indexes = [i for i in range(len(routes))]
  shuffle(indexes)
  update = get_random_employee()
  search = update['first_name']
  employee = get_employee()
  for i in indexes:
    dbs = ['mongo', 'postgres']
    shuffle(dbs)
    for db in dbs:
      s = randint(5, 10)
      time.sleep(s)
      if 'new' in routes[i]:
        requests.post(f'{host}/{db}/{routes[i]}id=test', json=employee)
      elif 'search' in routes[i]:
        requests.get(f'{host}/{db}/{routes[i]}id=test'.replace('=search', f'={search}'))
      elif 'update' in routes[i]:
        requests.put(f'{host}/{db}/{routes[i]}id=test', json=update)
      else:
        requests.get(f'{host}/{db}/{routes[i]}id=test')
    

if __name__ == "__main__":
    threads = [threading.Thread(target=target) for t in range(100) ]
    for t in threads:
      t.start()