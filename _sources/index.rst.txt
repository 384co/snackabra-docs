
|
|

.. image:: _static/snackabra.svg
   :height: 100px
   :width: 100px
   :align: center
   :alt: The 'michat' Pet Logo

=========
Snackabra
=========

Snackabra is a new technology stack for building private, secure, and sovereign applications. 
It revisits and redefines the conventional architecture of apps on the internet.

Why did we need to construct a whole new stack? When we embarked on a mission to create chat and social media applications from scratch, integrating 2020s' ideals of privacy, security, and sovereignty, we discovered that this was unattainable with existing technologies. Many small building blocks were 'lying around', but with many gaps. As we tried to assemble these pieces and fill in the gaps, we realized that we were inadvertently building a whole new stack. And so we did.

Whereas conventionally the 'platform' layer resides on servers - whether they be edge-based or in datacenters - the Snackabra (SB) architecture is fundamentally different: the application layer remains the same (eg static web sites, React applications, etc), but the platform layer has migrated from servers “behind” the internet backbone into your client (browser). The platform layer in turn still talks to servers somewhere, but now in the form of two composable low-level primitives: channels (communication) and shards (block storage).

The platform layer is encapsulated in a `single, standalone Typescript library <https://github.com/snackabra/snackabra-jslib/blob/main/src/snackabra.ts>`_. The infrastructure layer is defined by protocols, with reference server implementations `available on Github <https://github.com/snackabra>`_.

For motivation and design principles, see the :ref:`general discussion
<discussion>` section.

To jump into some of the technical design details, you might want to start with a
:ref:`slightly technical introduction <introduction>` and then dig
into :ref:`more detailed overview <overview>`.

Commercial development is being pursued by 384 (https://384.co),
but all the core pieces (platform library, reference servers, template clients, etc)
are open source. If you would like to contribute
or help out with the snackabra project, please feel free to :ref:`reach out to us <contact>`.

This is work in progress, there's much left to do. Design was begun in
2020 and implementation was begun in 2021, and first public release
was in February, 2022. The design and implementation leveraged 
various other projects done at the `Institute <https://Magnusson.Institute>`_ in 2018-2021.

So please be patient if and when we need to change (sometimes fundamental) things. [#f04]_

.. toctree::
   :hidden:
   :maxdepth: 3

   introduction
   overview
   system-architecture
   discussion
   formal
   install
   contact
   glossary
   future
   references
   license
   jslib
   modules
   server
   pylib
   appendix-a-crypto.rst
   user-guide
   (ignore) <diag-sample>
   motivation
   updated-glossary




----------------

.. rubric:: Footnotes

.. [#f02] "SNACKABRA" is pronounced "snack" and then the first part of
   "abracadabra". Accent is on the second "a" (the first "a" in
   "abracadabra"). It's as easy to use as having a snack. And
   it's magical.

.. [#f03] Though bear in mind that the :ref:`license language <license>` will never cease to apply: this is provided "as is".

.. [#f04] The canary function for all of Snackabra's open source technology is @psm's
   personal twitter (https://twitter.com/petersmagnusson).
   You can DM at any time to ask if there are any known "constraints"
   in effect that might impact the integrity of any parts of the design, implementation, algorithms, etc.
   You will get a reply iff there are not any. If you don't know what this footnote means, don't worry about it.


----------------

**LICENSE**

Copyright (c) 2016-2023 Magnusson Institute, All Rights Reserved.

"Snackabra" is a registered trademark

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Affero General Public License for more details.

Licensed under GNU Affero General Public License
https://www.gnu.org/licenses/agpl-3.0.html
