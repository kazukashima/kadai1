.PHONY: build deploy

build:
	# Vite で本番ビルド
	npm run build

deploy: build
	# Firebase Hosting へデプロイ
	firebase deploy
