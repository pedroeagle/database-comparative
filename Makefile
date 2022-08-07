start:
	docker-compose up --build
load:
	docker exec -it mysql rm -rf /usr/share/dump
	docker cp dump mysql:/usr/share/dump
	docker exec -it mysql sh -c 'cd /usr/share/dump/ && exec mysql < employees.sql'