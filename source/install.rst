.. _personal_server:

============
Installation
============

An objective with the design from the outset is that anybody should be
able to cobble together a server that a "static" room UI, with loaded
keys, can connect to. Setting aside more complex features like image
sharing or video streaming, the core code needed to get any single
*one* room up and running again with all its participants is
relatively simple.

We plan for complete open source release of all clients, chat
backends, and CLI for administrative commands, etc that we
develop. We're proud to say that much of this is now available.

If you wish to run your own basic snackabra environment, here are the
building blocks:

* :ref:`Room Server <room_server>`: The chat group / messaging server.

* :ref:`Storage Server <storage_server>`: To manage any shared photos or files yourself.

* :ref:`Web Client <web_client>`: Serves as both landing page, user dashboard,
  and stand-alone chat client. React Native.


The above three parts are working and sufficient to set up a personal snackabra server.
A few additional elements are under development or coming soon. Below we list them
in descending order of priority. Anybody willing to help out can influence priority
simply by helping out.

* For the generic snackabra javascript library, ``npm install snackabra`` or: 
  https://github.com/snackabra/snackabra-jslib (under development).

* :ref:`iOS Client <ios_client>`: An early template (native) implementation. Swift.

* For command line operations you'll need the python library, ``pip install snackabra`` or:
  https://github.com/snackabra/snackabra-pylib (under development).

* Command-line admin interface and tools (coming soon)
  https://github.com/snackabra/snackabra-cli

* Ledger server (coming soon)

* Reference (multi-owner) SSO. Curently low priority, but we will get to it!

.. _room_server:


Room Server
-----------

Source: https://github.com/snackabra/snackabra-roomserver

The room server allows you to host and manage your own Snackabra
server, called a "personal" server (as opposed to a "public"
server). This same code supports a public (multi-user) Snackabra
service, but that requires other building blocks (including you need
an SSO), so for now this documentation will focus on setting up a
personal server. On a personal server, the individual running the
server is de-facto "owner" of all rooms - see the general
documentation for more information.

You will need a client to connect to the server. See
https://github.com/snackabra for what's currently available (at time
of writing, there's a react native web client and an early native
swift ios version).

For installation documentation on the room server, see:

We currently have two
reference implementations, a web app version 

* https://snackabra.github.com/snackabra-webclient

* https://snackabra.github.com/snackabra-ios (early version)

In the clients you can then point to your server (once it's up and
running).


Setup (Personal Room Server)
----------------------------

The current room server requires a domain name and a Cloudflare (CF)
account. Currently, a free CF account is _almost_ sufficient, but
"durable objects" are not available yet on the free plans, so that
sets a minimum of $5/month to host a personal server (*).

If you want (push) notifications for mobile you will (eventually) need
to set up the necessary accounts with Apple; details coming soon in


* Set up a domain (we will call it "example.com") that you control.
  You will need to be able to change the nameservers to be Cloudflare.

* Set up a free account with CF: https://dash.cloudflare.com/sign-up -
  use your domain in the signup process.

* Go to the "workers" section and pick a name for your worker on
  CF, we'll call it "example" here. That sets up a subdomain on
  "workers.dev", e.g. "example.workers.dev."  Later you can set
  up "routes" from own domain.

* Click on the "Free" button, you need to upgrade to the
  "Pay-as-you-go" plan.

Now you have the account(s) set up. You might need to check email for
when any nameservers have propagated.

Next set up the CF command line environment, the "Wrangler CLI", we
use "yarn" in general but the personal server code is pure JS and
(currently) does not need any node packages. Follow instructions at
https://dash.cloudflare.com/id/workers/cli -b
at time of writing:

::

   # install the CLI:
   yarn global add @cloudflare/wrangler
   # authenticate your CLI:
   wrangler login
   # copy the template 'toml' file
   cp setup/template.wranger.toml wrangler.toml

The 'login' will open a web page to confirm that your CLI is allowed
to administrate your CF account.

In the above 'wrangler.toml' file, you will need to add your 'Account
ID' from the dashboard. Next, you will need a few "KV Namespaces". You
can do that with the CLI:

::

   wrangler kv:namespace create "MESSAGES_NAMESPACE"
   wrangler kv:namespace create "KEYS_NAMESPACE"
   wrangler kv:namespace create "LEDGER_NAMESPACE"

For each of them, you need to copy-paste the corresponding 'id' to
your ```wrangler.toml``` file.

Before you deploy, you need to enable "Durable Objects" for your
account.  On your "Workers" dashboard there is currently a link
"Durable Objects is now generally available!" - click that.(**)

Finally, you need to make a tiny change to your copy of
the server code, providing a 'secret'. This is essentially a simple
auth token that your server will request every time you create a new
room, or migrate a room over from somewhere else.

::

   wrangler secret put SERVER_SECRET<enter>

It will prompt you to enter the secret.

You also need to generate a RSA-OAEP key and push that;
you need to generate that and copy-paste.

You need to generate the ledger key yourself ('jwk' format), there's a
few ways to do that, for example open a browser console and enter the
following Javascript (https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey#rsa_key_pair_generation):

::

   let keyPair = await window.crypto.subtle.generateKey(
     {
       name: "RSA-OAEP",
       modulusLength: 4096,
       publicExponent: new Uint8Array([1, 0, 1]),
       hash: "SHA-256"
     },
     true,
     ["encrypt", "decrypt"]
   );
   let my_private_key = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey);
   let my_public_key = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey);
   JSON.stringify(my_public_key);


And you should get something like:

::

   '{"alg":"RSA-OAEP-256","e":"AQAB","ext":true,"key_ops":["encrypt"],"kty":"RSA","n":"mOmu ....


(Don't forget to store the full / private key somewhere secure: ``JSON.stringify(my_private_key)``)

The resulting string (include the quotes) is the string you enter as your "LEDGER_KEY":

::

   wrangler secret put LEDGER_KEY<enter>

Now you should be able to start your server:

::

   wrangler publish

And point a client to it!


(*) We are not affiliated with Cloudflare, we're just fans.

(**) At time of writing, the link was:
https://dash.cloudflare.com/id/workers/overview?enable-durable-objects


---------
Directory
---------

Following files should be in the git:

::

  .
  ├── LICENSE.md
  ├── README.rst
  ├── package.json
  ├── setup
  │   └── template.wranger.toml
  ├── snackabra.svg
  └── src
      └── room.mjs


.. _storage_server:

--------------
Storage Server
--------------
      
Source: https://github.com/snackabra/snackabra-storageserver


.. _web_client:

----------
Web Client
----------

Source: https://github.com/snackabra/snackabra-webclient



.. _ios_client:

----------
iOS Client
----------

Source: https://github.com/snackabra/snackabra-ios




