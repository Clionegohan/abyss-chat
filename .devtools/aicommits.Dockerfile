# .devtools/aicommits.Dockerfile

FROM node:18-slim

WORKDIR /repo

# Gitとaicommits CLIをインストール
RUN apt-get update && apt-get install -y git && npm install -g aicommits

# プロンプト用localeを日本語に固定したい場合は以下を設定可能
ENV OPENAI_KEY=""

CMD ["aicommits"]
