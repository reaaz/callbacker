callbacker
==========

callbacker is a small Node.JS app that uses MySQL and Apache. It is used to forward the API callback from a protected service to a staging environement. This is needed because some APIs send their callback request directly from their servers and need a publicly-accessible, SSL-enabled endpoint to hit.

## Installation
1. Copy your SSL key, crt, and intermediate crt to `callbacker/callbacker.key`, `callbacker/callbacker.crt`, and `callbacker/callbacker_intermediate.crt`.
2. Enable Apache's `mod_ssl` and `mod_proxy_http`.
3. Symlink `callbacker/conf/httpd.conf` into your `/etc/apache2/sites-available` folder.
4. Update `callbacker/conf/development.js` with your database and basic auth settings.
5. Symlink `callbacker/conf/callbacker.conf` into your `/etc/supervisor/conf.d` folder.
6. Reload supervisor and ensure callbacker is running.
