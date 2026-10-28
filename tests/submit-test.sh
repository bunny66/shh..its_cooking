#!/bin/bash
# Test: submit a sample result to the birthday bets Apps Script endpoint.
ENDPOINT="https://script.google.com/macros/s/AKfycbzK7NTyAPZrL3nHN4R5ohjhHPj_G6iztf8B28KDbjG27lzuKEy8dPriUXbRi9CFSIfY/exec"
curl -s -X POST "$ENDPOINT" \
  -H 'Content-Type: text/plain;charset=utf-8' \
  -d '{"name":"Test User","answers":[["opt1","opt2"],["opt3"]],"ts":"2026-10-26T00:00:00Z"}'
echo