=================
JSLib User Manual
=================

*The core of SB is implemented in snackabra.ts, targeting ES2022.
This section documents the JS (translated) version. Please note:
any current published version is Alpha of upcoming 0.5.0 and should
not be used for sensitive or production use (or if you do use it as
such: caveat emptor). We will signal production-ready use by versioning
it as 1.0.x (published to npmjs).*

*We are still trying to sort out how to get Sphinx, JSDoc, Typedoc,
etc to all play nice together in a good way...*

All core capababilities of the SB design is intended to be encapsulated
in this library. Design objectives include: [3]_

* No external dependencies (no other libraries)
* No dependencies on the DOM object 
* Pure asynchronous (eg no 'await')
* Clean es2022 code
* Zero errors/warnings on tsc 'strict' setting
* Minimum "forced typecasting"
* DRY extendable / abstract OOP implementation

Installation / Development
--------------------------

Install with:

``npm i -g snackabra``

Git repository: https://github.com/snackabra/snackabra-jslib.git

Note: in SB version 0.5.0, most core SB client and server
logic is being refactored into this library. If you're looking
at this prior to release of 0.5.0 (link above), then the latest
(in progress) version underlying this documentation is here:

https://github.com/384co/snackabra-docs/blob/main/snackabra-jslib/snackabra.js


Complete reference is here:

* `JSLib <modules.html>`_





SB384
-----

Most classes in SB are rooted in SB384. It encapsulates the core of an 
"identifier" in SB, namely a (384-bit) global :term:`Channel Name`, derived
from the :term:`Owner Key` of that object - typically either a :term:`channel`
or a :term:`object`. Most of the properties (see getters below) are various
perspectives and formats on this identity.

* `SB384 <classes/SB384.html>`_



Snackabra (Server) Class
------------------------

.. _Snackabra:

The SB class is the orchestrator, in particular it tracks one or more channels
connecting to one or more SB servers.

* `Snackabra <classes/Snackabra.html>`_
* `SBServer <interfaces/SBServer.html>`_

Sample usage:

::
   
   const SB = new Snackabra(sb_config)
   SB.create(
     'password',
     (new Identity())).then((channelId) => {
       SB.connect(
         channelId,
         (m: ChannelMessage) => { console.log(`got message: ${m}`)}
       ).then((c) => c.ready).then((c) => {
         c.userName = "TestBot" // optional
         (new SBMessage(c, "Hello Message!")).send().then((c) => { console.log(`sent! (${c})`) })
      })
    })
  }




SB Message Class
================

* `SBMessage <classes/SBMessage.html>`_


Channels
========

Channels (aka "Rooms") are the core communication primitive in SB.
Channel "sockets" are the synchronous communication interface to channels.
The channel "API" class is the asynchronous interface to channels.

* `Channel <classes/Channel.html>`_
* `SBChannelHandle <interfaces/SBChannelHandle.html>`_
* `ChannelSocket <classes/ChannelSocket.html>`_
* `ChannelKeys <interfaces/ChannelKeys.html>`_
* `ChannelMessage <interfaces/ChannelMessage.html>`_


Storage
=======

* `SBObjectHandle <interfaces/SBObjectHandle.html>`_
* `SBObjectHandleClass <classes/SBObjectHandleClass.html>`_
* `SBObjectMetadata <interfaces/SBObjectMetadata.html>`_
* `SBFile <classes/SBFile.html>`_
* `SBPayload <interfaces/SBPayload.html>`_


Utilities and Helpers
---------------------

These are a set common operations, that typically are supported by the
web api, but where we want to ensure specific behavior.

* `MessageBus <classes/MessageBus.html>`_

- [arrayBuffer32ToBase62](modules.md#arraybuffer32tobase62)
- [arrayBufferToBase64](modules.md#arraybuffertobase64)
- [assemblePayload](modules.md#assemblepayload)
- [base62ToArrayBuffer32](modules.md#base62toarraybuffer32)
- [base62ToBase64](modules.md#base62tobase64)
- [base64ToArrayBuffer](modules.md#base64toarraybuffer)
- [base64ToBase62](modules.md#base64tobase62)
- [decodeB64Url](modules.md#decodeb64url)
- [encodeB64Url](modules.md#encodeb64url)
- [encryptedContentsMakeBinary](modules.md#encryptedcontentsmakebinary)
- [extractPayload](modules.md#extractpayload)
- [getRandomValues](modules.md#getrandomvalues)
- [jsonParseWrapper](modules.md#jsonparsewrapper)
- [partition](modules.md#partition)
- [simpleRand256](modules.md#simplerand256)
- [simpleRandomString](modules.md#simplerandomstring)


Crypto Class
============

* `SBCrypto <classes/SBCrypto.html>`_

* `EncryptedContents <interfaces/EncryptedContents.html>`_
* `EncryptedContentsBin <interfaces/EncryptedContentsBin.html>`_


Crypto Helpers
==============



SB "Wire" Format Helpers
========================



SB-specific Helpers
===================


Testing Related
===============

- [compareBuffers](modules.md#comparebuffers)


              
                  
------------------

.. rubric:: Footnotes


.. [1] (test) This is the closest to DM (Direct Message) that the system
	   allows, since one constraint is that any communication must
	   include a responsible Owner.	   

.. [2] (test) If the whisper is initiated by the guest. If whisper is
	   initiated by the owner, the key derivation uses the private
	   half of <room>_ownerKey and the public key of the
	   guest. The derived key remains the same in both cases.

.. [3] (test) In exchange for possible weaker security, since now the
	   Owner needs to keep track of their key files.

------------------

.. _DN004:

DN 004: The "Ready" Pattern
---------------------------

Unfortunately we have lost the original source from where we first
heard about the "ready" design pattern, and that source might have
called it something different. 

The idea is to allow objects to be created immediately, but not
necessarily be "ready" to use, meaning that there might be some
asynchronous initialization that needs to be completed before the
object is ready to use.
   
Here is essentially how it works:

   .. code-block:: javascript

      const obj = new SomeClass()
      // the object per se is created right away

      // you can call any method on the object, but it will
      // throw an exception if the object is not ready    
      obj.someMethod()

      if (obj.readyFlag) {
         // you can explicitly check if an object is ready
      } else {
         // and if not, perhaps do something else
      }

      obj.ready.then((obj) => {
         // or you can set up what should be done when the object is ready
      })
      

That's the basic model. Creating an object is not a blocking operation,
but you can check if it is ready or not, and if not, you can either
wait for it to become ready, or you can move on and do something else.
If you call a method on an object that is not ready, it will throw an
exception.

The "readyFlag" value is set to true when the object is ready, and the
"ready" promise is resolved when the object is ready. The "ready"
promise is initialized by the constructor, so you also can do this:

   .. code-block:: javascript

      (new SomeClass()).ready.then((obj) => {
         // do something with the object
      })


Internally (inside jslib), part of this pattern is done by the
ready decorator, allowing things like getters to be succinct:

   .. code-block:: javascript

      @Ready get privateKey() { return this.#privateKey }


This will automatically protect the getter from being called before
the internal state is ready, which in turn allows users of the library
to code more aggressively and not always have to explicitly 
check if the object is ready or not.


.. _DN005:

DN 005: Browser connectivity
----------------------------

Unfortunately, browsers at the time of writing (February, 2023)
simply do not have a good way of checking network status. Currently
it comes down to this:

* You cannot use ''XMLHttpRequest()'' or ''fetch()'' to "ping"
  a server without it being noisy: for example, Chrome insists on
  complaining (in red font) about ''ERR_CONNECTION_REFUSED'' in the
  developer console, no matter what you do in your javascript code.
  The only way to turn that off is change default settings in the
  browser developer tools setup.

* You cannot use ''navigator.online'' in all cases, because the
  browser doesn't consider a local server (on the same computer)
  as a "server" per se, for this purpose, even though you can
  connect to it.

The current net-net of this situation is that we chose not to
make jslib "proactive", or "smart", in this context. What we
can do, however, is "track" any of these errors, and print out
an info message on the console to ignore ''ERR_CONNECTION_REFUSED''.

It would be nice if there was a simple api to check connectivity
to a server or an IP address. But it's not something to be too
upset about: we're pushing the browser behavior here pretty far
already. But it does mean that systems like Deno or Cloudflare's 
''workerd'' will have to have additional non-browser APIs, just
like node needed ... and then presumably browsers will add 
incompatible versions of those ...


DN 006: Localhost, CORS, and other fun things
---------------------------------------------

The browser has a concept of "same origin" policy, which means that
a web page can only access resources on the same server, or on a
different server, but only if the server explicitly allows it.

This plus some other issues adds up to these constraints:

*  If you want a static (local) web page, e.g. a resource of type
   "file://", then it CANNOT load other resources locally - such as 
   a library (eg jslib itself). This is a security feature of the
   browser, and it's not likely to change.

       
      
                  
      
