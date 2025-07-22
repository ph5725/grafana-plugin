#!/bin/bash
cd "$(dirname "$0")"
echo "Starting Grafana server..."

./grafana/bin/linux-amd64/grafana-server \
  --config=./grafana/conf/defaults.ini \
  --homepath=grafana
