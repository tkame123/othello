#!/bin/bash

APP_ROOT=$(dirname $0)/..

cd ${APP_ROOT}

npm run build
firebase deploy --only hosting:tkame123-othello
