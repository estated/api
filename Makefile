service=api

export service

.PHONY: build # Build containers
build:
	docker-compose build

.PHONY: install # Install Api depencencies
install:
	docker-compose run --rm api sh -lc 'yarn install'

.PHONY: dev
dev:
	docker-compose up -d

.PHONY: stop
stop:
	docker-compose down

.PHONY: logs
logs:
	docker-compose logs -f $(service)

.PHONY: start
dev: start-deps boot-es
	DEV_HOST=192.168.99.100 yarn dev

.PHONY: boot-es
boot-es: boot-es
	DEV_HOST=192.168.99.100 yarn indexes

.PHONY: start-deps
start-deps:
	docker-compose up -d rmq kibana elasticsearch redis
	sleep 10