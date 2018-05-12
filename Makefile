service=api

export service

.PHONY: build # Build containers
build:
	docker-compose build

.PHONY: install # Install Api depencencies
install:
	docker-compose run --rm api sh -lc 'apk add -U python make g++;yarn install'

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
start: start-deps boot-es
	yarn dev

.PHONY: boot-es
boot-es: boot-es
	yarn indexes

.PHONY: start-deps
start-deps:
	docker-compose up -d rmq kibana elasticsearch redis
	sleep 10