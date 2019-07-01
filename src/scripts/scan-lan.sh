#!/bin/bash

echo "ip route show | awk '/default/ {print $3}'"
router=`ip route show | awk '/default/ {print $3}'`
echo "Router LAN IP: $router"
echo ""

echo "hostname -I | awk '{print $1}'"
my_ip=`hostname -I | awk '{print $1}'`
echo "My LAN IP: $my_ip"
echo ""

echo "Getting LAN IPs"
echo "sudo nmap -sP $router/24"
sudo nmap -sP $router/24
echo ""
