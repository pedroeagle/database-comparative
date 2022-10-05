start:
	docker-compose up
load: #loads database on mysql
	docker exec -it mysql rm -rf /usr/share/dump
	docker cp dump mysql:/usr/share/dump
	docker exec -it mysql sh -c 'cd /usr/share/dump/ && exec mysql < employees.sql'
build: # make load
	docker exec -i postgres sh -c 'apt update && apt install pgloader -y && pgloader --version'
	docker exec -i postgres sh -c 'pgloader mysql://root@localhost:3306/employees postgres://postgres:postgres@localhost:5432/employees'