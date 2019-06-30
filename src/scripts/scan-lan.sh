#!/bin/bash

echo "Getting Router IP"
router=`ip route show | awk '/default/ {print $3}'`
echo $router
echo ""

echo "Getting LAN IPs"
echo "sudo nmap -sP $router/24"
sudo nmap -sP $router/24
echo ""
