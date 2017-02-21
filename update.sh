#!/bin/sh

while true; do 

    if [[ $(git pull origin) == *up-to-date* ]]; 
    then
        echo "no change"
    else
        echo "detect changes"
        sleep 2s
        # npm run build
    fi

    echo "sleep 30s"

    sleep 30s        

done