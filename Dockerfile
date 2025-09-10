# ココチャピ・タロット Docker設定
# 軽量で高速なNginxベースの本番用イメージ

# ========================================
# Stage 1: Build Stage (optional)
# ========================================
# 将来的にビルドプロセスが必要な場合に使用
FROM node:18-alpine AS builder

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonがある場合（将来の拡張用）
# COPY package*.json ./
# RUN npm ci --only=production

# ========================================
# Stage 2: Production Stage
# ========================================
FROM nginx:1.25-alpine

# メタデータの追加
LABEL maintainer="Kokochapi Tarot Team <contact@kokochapi-tarot.com>"
LABEL version="3.2.0"
LABEL description="ココチャピ・タロット - 星空の書斎でタロット占い体験"
LABEL org.opencontainers.image.source="https://github.com/summersir1020-fp/Tarot-CocoChapi"
LABEL org.opencontainers.image.licenses="MIT"

# 必要なパッケージをインストール
RUN apk add --no-cache \
    # セキュリティアップデート
    curl \
    # ヘルスチェック用
    wget \
    # ログ管理用
    logrotate \
    # タイムゾーン設定
    tzdata

# タイムゾーンを日本に設定
ENV TZ=Asia/Tokyo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# カスタムNginx設定ファイルをコピー
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf

# アプリケーションファイルをコピー
COPY . /usr/share/nginx/html/

# 不要なファイルを削除（セキュリティ向上）
RUN rm -rf /usr/share/nginx/html/.git* \
    /usr/share/nginx/html/docker \
    /usr/share/nginx/html/GITHUB_SETUP.md \
    /usr/share/nginx/html/DEVELOPMENT_ROADMAP.md \
    /usr/share/nginx/html/TODO.md \
    /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/docker-compose.yml

# 適切な権限を設定
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Nginxの設定テスト
RUN nginx -t

# ヘルスチェックの設定
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# ポート80を公開
EXPOSE 80

# セキュリティ: rootユーザーで実行しない
USER nginx

# Nginxを開始（フォアグラウンドで実行）
CMD ["nginx", "-g", "daemon off;"]

# ========================================
# ビルドとラベル情報
# ========================================
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION

LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.name="kokochapi-tarot" \
      org.label-schema.description="ココチャピ・タロット - 星空の書斎でタロット占い体験" \
      org.label-schema.url="https://summersir1020-fp.github.io/Tarot-CocoChapi/" \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vcs-url="https://github.com/summersir1020-fp/Tarot-CocoChapi" \
      org.label-schema.vendor="Kokochapi Tarot Team" \
      org.label-schema.version=$VERSION \
      org.label-schema.schema-version="1.0"