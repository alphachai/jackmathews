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

staticfiles:
	$(WITH_PIPENV) python manage.py collectstatic --noinput
.PHONY: staticfiles

run: env staticfiles
	$(WITH_PIPENV) heroku local web
.PHONY: run

lint: python/lint
.PHONY: lint

fmt: python/fmt
.PHONY: fmt

test:
.PHONY: test

# test-post-build:
# .PHONY: test-post-build

# release_patch: bumpversion/release_patch
# .PHONY: release_patch
#
# release_minor: bumpversion/release_minor
# .PHONY: release_minor
#
# release_major: bumpversion/release_major
# .PHONY: release_major

clean: pipenv/clean python/clean clean-build-harness
	@exit 0
.PHONY: clean

stage:
	git push heroku master
.PHONY: stage

config: config.txt
	@cat config.txt
.PHONY: config

config.txt:
	heroku config >> config.txt

remote_bash:
	heroku run bash
.PHONY: remote_shell

remote_shell:
	heroku run python manage.py shell
.PHONY: remote_shell

# Write .env to app
# heroku config:set $(cat .env | sed '/^$/d; /#[[:print:]]*$/d')

# Write app config to .env
# heroku config | sed 's/:  */=/g; /^=/d' >> .env
