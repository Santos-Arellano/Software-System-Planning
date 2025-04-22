#!/bin/bash

if [ $# -lt 2 ]; then
    echo "Uso: ./run_bot.sh <usuario> <pregunta>"
    exit 1
fi

USER=$1

shift
QUESTION="$*"

docker run --rm \
    -v bot_history:/app/history \
    bot-app "$USER" "$QUESTION"