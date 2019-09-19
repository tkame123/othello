#!/bin/bash

APP_ROOT=$(dirname $0)/..

cd ${APP_ROOT}

firebase deploy --only functions
firebase deploy --only firestore:rules

npm run build
firebase deploy --only hosting
