#!/bin/bash
# $1 --> DNS_FORWARD_FILE

echo "Redirecting web traffic"
echo "dnsspoof -f $1"
sudo dnsspoof -f $1
