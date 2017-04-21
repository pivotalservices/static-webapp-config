#!/bin/bash

# with jq 1.4 or later (like we're likely stuck on 1.3)
# jq -n env > config.json

# with python
python -c 'import json, os;print(json.dumps(dict(os.environ)))' > ./public/config.json
