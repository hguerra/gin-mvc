.PHONY: clean test security build run

APP_NAME := app
CURRENT_DIR := $(PWD)
BUILD_DIR := $(CURRENT_DIR)/build

devDependencies:
	asdf install
	curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s
	curl -sfL https://raw.githubusercontent.com/securego/gosec/master/install.sh | sh -s
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s
	GOBIN=$(CURRENT_DIR)/bin go install github.com/DarthSim/hivemind@latest
	GOBIN=$(CURRENT_DIR)/bin go install github.com/onsi/ginkgo/v2/ginkgo@v2.6.1
	asdf reshim golang

dependencies:
	go mod download
	go mod tidy

install: devDependencies dependencies

clean:
	rm -rf ./build

lint:
	./bin/golangci-lint run ./...
	./bin/gosec -quiet ./...

fmt:
	go fmt ./...

test: clean
	mkdir -p $(BUILD_DIR)/coverage
	go test -v -timeout 30s -coverprofile=$(BUILD_DIR)/coverage/cover.out -cover ./...
	go tool cover -func=$(BUILD_DIR)/coverage/cover.out

testCover: clean
	mkdir -p $(BUILD_DIR)/coverage
	go test -coverprofile=$(BUILD_DIR)/coverage/cover.out -cover ./...
	go tool cover -func $(BUILD_DIR)/coverage/cover.out -o $(BUILD_DIR)/coverage/cover_percentages.out
	go tool cover -html=$(BUILD_DIR)/coverage/cover.out -o $(BUILD_DIR)/coverage/coverage.html

testBDD: clean
	mkdir -p $(BUILD_DIR)/coverage
	./bin/ginkgo -r -v --randomize-all --randomize-suites --fail-on-pending --keep-going --cover -coverprofile=cover.out --race --trace --junit-report=report.xml
	mv cover.out $(BUILD_DIR)/coverage
	mv report.xml $(BUILD_DIR)/coverage

build: clean
	pnpm run build
	go build -o $(BUILD_DIR)/$(APP_NAME) ./cmd/web/main.go

run: clean
	pnpm run build
	go run cmd/web/main.go

runDev: clean
	mkdir -p build/tmp
	./bin/hivemind Procfile.dev
