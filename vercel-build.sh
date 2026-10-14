#!/bin/bash
set -e

npx prisma generate
npx prisma migrate deploy

if [ "$VERCEL_ENV" = "preview" ]; then
  prisma migrate reset --force
  npx prisma db seed
fi

next build