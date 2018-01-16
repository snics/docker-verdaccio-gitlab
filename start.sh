#!/bin/bash

node configure.js && node_modules/.bin/verdaccio --config run.yaml
