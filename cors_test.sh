#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Server URL
SERVER_URL="https://golfcartwaiver-server.onrender.com/api/send-waiver-email"
FRONTEND_ORIGIN="https://golf-cart-waiver.netlify.app"

echo -e "${YELLOW}CORS and API Connectivity Tests${NC}"

# Test 1: Simple GET request
echo -e "\n${YELLOW}Test 1: Simple GET Request${NC}"
curl -v $SERVER_URL

# Test 2: Preflight OPTIONS request
echo -e "\n\n${YELLOW}Test 2: Preflight OPTIONS Request${NC}"
curl -v -X OPTIONS $SERVER_URL \
  -H "Origin: $FRONTEND_ORIGIN" \
  -H "Access-Control-Request-Method: POST"

# Test 3: POST request with origin
echo -e "\n\n${YELLOW}Test 3: POST Request with Origin${NC}"
curl -v -X POST $SERVER_URL \
  -H "Origin: $FRONTEND_ORIGIN" \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Test 4: Detailed headers test
echo -e "\n\n${YELLOW}Test 4: Detailed Headers Test${NC}"
curl -v -X POST $SERVER_URL \
  -H "Origin: $FRONTEND_ORIGIN" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type, Authorization" \
  -H "Content-Type: application/json" \
  -d '{"test": "detailed headers"}'
