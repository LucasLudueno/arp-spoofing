#!/bin/bash

echo "Enabling IP Forwarding (host will be able to be a router)"
echo "sysctl -w new.ipv4.ip_forward=1"
sudo sysctl -w net.ipv4.ip_forward=1
echo ""
