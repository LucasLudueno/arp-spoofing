# arp-spoofing

# Description

This is a basic project that allows you to play and test the MITM technique: arp-spoofing.

Made to run in Ubuntu. Tested with Ubuntu 18.04


# Execution

## ARP Spoofing

_Note: Before starting ensure having `arpspoof` command installed._


## Scan LAN
In order to detect the router IP and all the other ips connected in the same LAN is needed to run `./scan-lan.sh`.

This step is not necessary if the router and the victim IP are known.  


## Start Spoofing
`./arp-spoofing.sh VICTIM_IP ROUTER_IP INTERFACE` command will start spoofing the traffic between the victim IP and the router IP. `VICTIM_IP` and `ROUTER_IP` must be replaced by the victim and the router ip respectively. `INTERFACE` field is optional, by default it takes `wlp2s0`.

Notice that it will enable the IP Forwarding mode to let forward all the ipv4 traffic through our computer

Now, all the traffic between the victim and the router will pass through our computer.

Many techniques can be used after spoofing. Following some of them will be explained. 


## Redirect Traffic
In order to redirect the incoming web traffic from the port 80 (http) to a selected `PORT` of our computer the command `./redirect-traffic.sh PORT` is executed.


## DNS Spoofing

_Note: Before starting ensure having `dnsspoof` command installed._

### Start the DNS redirect
In order to redirect the traffic from a web site to our computer the command `./dns-spoofing.sh DNS_FORWARD_FILE` is executed.

`DNS_FORWARD_FILE` should be replaced by the path of a file that contains the web sites to be redirected.
It should have a format like this:

```
CURRENT_IP	www.some-page.com
CURRENT_IP	http://www.another-page.com
```

`CURRENT_IP` should be replaced by the IP of our computer in the LAN


## Start the fake web server

_Note: Before starting ensure having NPM and Node installed to configure and start the fake web server. https://nodejs.org/es/download/_


Once the web traffic is redirected to the specified PORT, a server could be created to intercept these traffic, modify or replace it.

First, the server should be configured. Inside the fake-server directory execute the following command: `npm install`. That will install the library dependencies of the project.

To start the server, execute: `PORT=PORT npm start`, assigning the specified PORT.

If the server is already configured, the script `./start-server PORT` could be executed to start it too.

When the victim enters in some http page defined in the `DNS_FORWARD_FILE`, the traffic will be intercepted by the server, and a custom html defined in `fake-server/index.html` will be rendered.

This behavior could be changed modifying the file `fake-server/index.js`


## Atack Examples

There are some examples in this repositories (`fake-server/index.js`) to be used as arp-spoofing atacks.


### Code Injection

Uncomment the code `Code Injection` inside `fake-server/index.js` in order to inject code inside the html web site requested for the victim. Custom JS code can be added replacing the constant `SCRIPT_TO_ADD`.


### Images replace Injection

Uncomment the code `Image Injection` inside `fake-server/index.js` in order to replace all the image from the html web site requested for the victim to a custom image defined in `IMAGE_TO_REPLACE`.


### Fake Login

Uncomment the code `HTML Login Injection` or `Facebook Login Injection` inside `fake-server/index.js` in order replace the html web site requested for the victim to a custom login. When the victim enter the credentials, it will be redirected to the requested web site and the credentials will be shown in our computer terminal.
