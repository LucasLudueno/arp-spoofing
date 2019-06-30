# arp-spoofing

# Description

This is a basic project that allows you to play and test the MITM technique of arp-spoofing

# Execution

## ARP Spoofing

### Scan LAN
In order to detect the router IP and all the other ips connected in the same LAN is needed to run `./scan-lan.sh`.

This step is not necessary if the router and the victim IP are known.  

### Configure environment
To configure the environment to start spoofing, is needed to run the script `./configure-environment.sh`. It will enable the IP Forwarding mode to let forward all the ipv4 traffic through our computer.

### Start Spoofing
`./arp-spoofing.sh VICTIM_IP ROUTER_IP` command will start spoofing the traffic between the victim IP and the router IP. `VICTIM_IP` and `ROUTER_IP` must be replaced by the victim and the router ip respectively.

Now, all the traffic between the victim and the router will pass through our computer.

Many techniques can be used after spoofing. Following some of them will be explained. 


## DNS Spoofing

### Start the DNS redirect
In order to redirect the incoming web traffic from the port 80 (http) to a selected `PORT` of our computer the command `./dns-spoofing.sh PORT DNS_FORWARD_FILE` is executed.

`DNS_FORWARD_FILE` should be replaced by the path of a file that contains the web sites to be redirected to the specified `PORT`.
It should have a format like this:

```
CURRENT_IP	www.some-page.com
CURRENT_IP	http://www.another-page.com
```

`CURRENT_IP` should be replaced by the IP of our computer in the LAN


### Start the fake web server
Once the web traffic is redirected to the specified PORT, a server could be created to intercept these traffic, modify or replace it.

First, the server should be configured. Inside the fake-server directory execute the following command: `npm install`. That will install the library dependencies of the project.

To start the server, execute: `PORT=PORT npm start`, assigning the specified PORT.

If the server is already configured, the script `./start-server PORT` could be executed to start it too.

When the victim enters in some http page defined in the `DNS_FORWARD_FILE`, the traffic will be intercepted by the server, and a custom html defined in `fake-server/index.html` will be rendered.

This behavior could be changed modifying the file `fake-server/index.js`

_Note:_ NPM and Node should be installed to configure and start the fake web server. https://nodejs.org/es/download/
