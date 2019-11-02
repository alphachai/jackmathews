-include $(shell curl -sSL -o .build-harness "https://raw.githubusercontent.com/mintel/build-harness/master/templates/Makefile.build-harness"; echo .build-harness)

init: init-build-harness
	@make pipenv
.PHONY: init

export SERVICE_NAME = jackmathews
NODE_MODULES = frontend/node_modules

$(NODE_MODULES):
	@cd frontend && yarn install --pure-lockfile --non-interactive

frontend: $(NODE_MODULES)
	set -ex \
		&& ( \
			cd frontend \
			&& yarn --pure-lockfile --no-progress \
			&& yarn run build:prod \
			&& yarn autoclean \
		)
.PHONY: frontend


pre-build: frontend
.PHONY: pre-build

.env:
	@read -p "Enter a port for your dev site: " DJANGO_DEV_PORT; \
	@echo "# Development settings (NOT FOR PRODUCTION USE!)" >> .env; \
	@echo "DJANGO_DEBUG=true" >> .env; \
	@echo "DJANGO_SECRET_KEY=foobar" >> .env; \
	@echo "" >> .env; \
	@echo "# Port for dev site. Must end in a colon (:)." >> .env; \
	@echo "DJANGO_DEV_PORT=$$DJANGO_DEV_PORT:" >> .env; \
	@echo "" >> .env; \
	echo "Wrote local development environment to .env" 1>&2; \

up: .env compose/up
.PHONY: down

down: compose/down
.PHONY: down

restart: compose/rebuild
.PHONY: restart

exec: docker/exec
.PHONY: exec

ps: compose/ps
.PHONY: ps

logs: compose/logs
.PHONY: logs

lint: python/lint
.PHONY: lint

fmt: python/fmt
.PHONY: fmt

test:
.PHONY: test

test-post-build:
.PHONY: test-post-build

release_patch: bumpversion/release_patch
.PHONY: release_patch

release_minor: bumpversion/release_minor
.PHONY: release_minor

release_major: bumpversion/release_major
.PHONY: release_major

clean: pipenv/clean python/clean clean-build-harness
	@exit 0
.PHONY: clean
