#!/usr/bin/env bash

set -eu

echo "Restoring test database from prisma/test-database-snapshot.sql to ${DATABASE_URL}_test ... "

DATABASE_NAME=$(psql "$DATABASE_URL" -At -c "SELECT current_database()")
TEST_DATABASE_NAME="${DATABASE_NAME}_test"
TEST_DATABASE_URL=${DATABASE_URL//${DATABASE_NAME}/${TEST_DATABASE_NAME}}
TEMPLATE1_URL=$(node -e "let url = new URL(process.env.DATABASE_URL); url.pathname = '/template1'; process.stdout.write(url.toString())")

psql "$TEMPLATE1_URL" -c "DROP DATABASE IF EXISTS $TEST_DATABASE_NAME"
psql "$TEMPLATE1_URL" -c "CREATE DATABASE $TEST_DATABASE_NAME TEMPLATE template0"
psql -q "${TEST_DATABASE_URL}" < prisma/test-database-snapshot.sql

echo "✅"