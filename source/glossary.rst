========
Glossary
========

.. glossary::
   :sorted:

   addressable worker
      See discussion in :ref:`the computing section <computing>`. As distinct
      from :term:`non-addressable worker`.

   file
      We use "file" to refer to anything we store - image, video, document,
      photo, etc.

   channel
      Basic communication primitive. Used to be a synonym for :term:`Room`,
      but now it's more correct to say that a Room is a simple use of a
      channel.
      
   channel name
      Essentially a synonym for :term:`Room Name`. This is the newer term.
      
   CLI
      The command line interface; relevant for administering a
      :term:`Personal Room Server`. See :ref:`command line tools <command-line>`.

   non-addressable worker
      See discussion in :ref:`the computing section <computing>`. As distinct
      from :term:`addressable worker`.

   Durable Object
      These are "addressable workers", as implemented by Cloudflare
      (https://developers.cloudflare.com/workers/learning/using-durable-objects).
      They are also sometimes referred to as "Unique Durable Objects"
      or “Durable Object Workers”.

   <FN>
      The "full name", sort of: this is a unique identifier that empowers
      you to access a blob of data (such as an image). Just like in fairy tales
      and myths, if you know the True Name of a Demon, you have power over it.
      "<FN>" is the True Name of an object. Details of how it's constructed
      are summarized in :ref:`the section on deduplication and storage <object>`.

   Local Storage
      Storage (typically key-value / JSON) in the client. In a web client,
      this refers to ``Window.localStorage`` (https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage),
      on mobile it will be secure on-device equivalent.

   Personal Room Server
      A :term:`Room` server that you are running for yourself
      or for friends and family. On a personal room server,
      the :term:`Owner` of every room is the individual
      operating the room server.

   KV_global
      Key-value store that is global and accessible by both room and storage servers.
      See :ref:`the section on storage <storage>` for more details.

   KV_local
      Key-value store that is local to the room server, e.g.
      local to each individual :term:`Room`. See :ref:`the section on storage <storage>`
      for more details.

   LEDGER_KEY
      The public half of the server secret for the storage server;
      the private half needs to be kept offline for specific batch use cases.

   Ledger Backend
      See the section on :ref:`Storage Ledger Server <ledgerserver>`.

   manifest
      The set of information needed to convince the storage server
      that you are allowed to fetch a certain :term:`object`, including
      the parts needed to decrypt it. Specifically: <FN>, <verification>,
      <salt>, <iv>, <size>.

   Micro Federation
      See :ref:`micro-federation <micro-federation>` for a discussion.

   MOTD
      The "Message of the Day" - can be set by the :term:`Owner` of
      any :term:`Room`, and is presented to anybody joining the room.

   object
      Think of this as a "blob of data", packaged up in a manner
      that's secure, private, and with a globally unique name.
      See :ref:`the discussion on images and storage <object>` for details.

   Origin Server
      The web site or domain that first generated or allocated
      a particular :term:`Room Name`. It's not identified or tracked.

   Owner
      Every :term:`Room` must have an owner, namely, somebody
      (a human) that is responsible for it's contents and policies,
      and who thus also has certain administrative abilities.
      See :ref:`here <owner definition>` for more details.
      Owners need to be authenticated by an :term:`SSO` or equivalent.

   Owner Key
      The :term:`Public Key Pair` corresponding to the :term:`Owner`
      of a :term:`Room`. Every room has an owner, and the owner
      keys for every room are unique for that room. The :term:`Room Name`
      is derived from the owner key.

   Public Key Pair
      An RSA public-key pair using SECG curve secp3841.
      For public room servers they are generated off-line with
      command line utility and :func:`snackabra.crypto.gen_p384_pair`.

   Restricted
      Rooms can be "restricted" by the :term:`Owner`. This means
      that all participants must be approved by the owner. Any new
      participant will be automatically queued for admission.
 
   Room Name
      The unique 48-byte (64-character b64) string that
      uniquely identifies a :ref:`room <rooms>`.
      It is derived from the :term:`Owner Key`.
      Note that the newer name for this is :term:`Channel Name`.

   Room
      All discussions or chats or conversations or file or document
      sharing occurs within the context of a :ref:`room <rooms>`, identified
      by a :term:`Room Name`.

   Shard
      Storage object. Essentially a blob. 

   SSO
      Single Sign-On system: an online service through which you can
      authenticate to multiple systems. In snackabra, we use "SSO"
      losely to either reference the https://privacy.app membership
      service, or whatever you are using in it's stead. It's main
      purpose for snackabra is authenticating an :term:`Owner`, and
      to manage the `Storage Budget` of any :term:`Room`.

   Storage Budget
      The amount of storage (bytes) any particular :term:`Room` is
      allowed to use - includes all data, notably of course
      any uploaded images or files.

   Social Card ID
      To Be Written. It's a random 11-digit number (constrained to
      always start with a '1').

   Social ID
      To Be Written.
      
   thumbnail
      See :ref:`section on photo sharing <photosharing>`

   <TID>
      Transaction Identifier. First discussed in regards to the
      :ref:`LEDGER_NAMESPACE <ledgerNamespace>`, this is a token
      of sorts, which tracks spending of storage budget. It's
      main purpose is to enable systems where users manage (and
      pay for) their total storage on a system, without any
      individual files or documents being easily attributable to them.
      It's never retained (at rest) anywhere except in either hashed
      or encrypted form.

   verification
      This is a random 16-byte value associated with every
      :term:`object` and serves to defend against various
      types of side-leakage of privacy. 
      See :ref:`the discussion on images and storage <object>` for details.

   preview
      See :ref:`section on photo sharing <photosharing>`

   PII
      Personal Indtifiable Information - any information that
      allows for "you" (the human being) to be uniquely identified
      (or close to uniquely).
