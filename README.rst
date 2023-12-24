.. image:: snackabra.svg
   :height: 100px
   :align: center
   :alt: The 'michat' Pet Logo

=======================
Snackabra Documentation
=======================

This repo contains all documentation and specifications related to ``snackabra``,
both client library and servers, etc, the resulting output is hosted on:

* https://snackabra.readthedocs.io
* https://snackabra.io (previous version, 0.4.x)

Latest PDF format version should be on ReadTheDocs [#r00]_.

If you would like to contribute or help out with the snackabra
project, please feel free to reach out to us at snackabra@gmail.com or
snackabra@protonmail.com

Installation
------------

To setup working with the ``snackabra`` documentation per se:

.. code-block:: console

    $ git clone https://github.com/snackabra/snackabra-docs
    $ cd snackabra-docs

    $ # note we do not support 3.10 yet (some package issues)
    $ python3.9 -m venv venv
    $ source venv/bin/activate
    $ pip install -r ./requirements.txt

    # typescript 5+, typedoc, and importantly snackabra (library)
    $ yarn install


You work with files in 'source', after you've made any changes, run
'make html' [#r03]_ and results will be in the 'build' directory:

.. code-block:: console

    $ make html
    $ make html # you sometimes need to run this twice

    $ # should open nicely, note this is root dir
    $ open index.html

Note that the makefile will copy the results from the 'build'
directory to the root directory.

Currently we only have it set up to make an html version. We build a
PDF through readthedocs [#r00]_. If you want to be able to run 'make
latexpdf' yourself you'll need to install Latexmk [#r02]_,
which can be a bit of a struggle depending on your system, including
needing upwards 10 GB of disk space.

If you're modifying jslib and not using the npm package ``snackabra``,
consider using ``yarn link`` to make life easier.


NOTES
-----

* Requires typedoc 0.25 to get support for Typescript 5.2+

* There's a bug in @types/node:
  https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/67406  
  requiring a hack in package.json and tsconfig (sigh)
  

    
LICENSE
-------

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


Cryptography Notice
-------------------

This distribution includes cryptographic software. The country in
which you currently reside may have restrictions on the import,
possession, use, and/or re-export to another country, of encryption
software. Before using any encryption software, please check your
country's laws, regulations and policies concerning the import,
possession, or use, and re-export of encryption software, to see if
this is permitted. See http://www.wassenaar.org/ for more information.

United States: This distribution employs only "standard cryptography"
under BIS definitions, and falls under the Technology Software
Unrestricted (TSU) exception.  Futher, per the March 29, 2021,
amendment by the Bureau of Industry & Security (BIS) amendment of the
Export Administration Regulations (EAR), this "mass market"
distribution does not require reporting (see
https://www.govinfo.gov/content/pkg/FR-2021-03-29/pdf/2021-05481.pdf ).


---------------

.. rubric:: Footnotes

.. [#r00] https://snackabra.readthedocs.io/_/downloads/en/latest/pdf/

.. [#r01] https://www.sphinx-doc.org/en/master/usage/builders/index.html#sphinx.builders.latex.LaTeXBuilder

.. [#r02] https://mg.readthedocs.io/latexmk.html

.. [#r03] First time, you might need to run it twice, to sort out cross-link issues.
	  Similarly if you make large changes to structure or references, you
	  should 'rm -rf build' and rebuild.


