# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


install router-- "npm install react-router-dom" for routing web application 
install Universally Unique Identifier--  "npm install uuid" for creating unique ID
install notification-- "npm install react-hot-toast" for showing toast notifications
install  Ace Editor-- "npm install react-ace" for robust code editing experience within your app
Install Ace Language Tools  "npm install ace-builds" for installed Ace Editor properly and all the necessary components for language tools

import "ace-builds/src-noconflict/mode-" used for  to import the any language mode for the Ace Editor.
import "ace-builds/src-noconflict/keybinding-" used for to import the Emacs keybinding configuration for the Ace Editor. (keyboard shortcuts)

for Backend,,,

Install "npm install express socket.io cors" for These packages include:
(1) express: This is a web application framework for Node.js, which simplifies the process of building server-side applications.
(2) http: This is a core Node.js module that provides utilities to create HTTP servers and clients. Here, it’s used to create an HTTP server.
(3) socket.io: This library enables real-time, bidirectional communication between web clients and servers. It’s useful for applications like chat apps or live notifications.
(4) cors: This middleware is used to enable Cross-Origin Resource Sharing (CORS), allowing your server to accept requests from different origins (useful for APIs that will be called from web clients hosted on different domains).

in package.json add this line
"scripts": {
  "start": "node server.js",
  "server": "node server.js"
}
 
run on bash:
>>npm run server

install "npm install socket.io-client" -The socket.io-client library is used to enable real-time, bidirectional communication between clients (such as web browsers) and servers over WebSockets.