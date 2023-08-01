# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line, and also
# from the environment for the first two.
SPHINXOPTS    ?=
SPHINXBUILD   ?= sphinx-build
SOURCEDIR     = source
BUILDDIR      = build

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
        # deploying to root
	echo "Copying file to root directory"
	cp -R $(BUILDDIR)/html/* .

clean:
	rm -rf $(BUILDDIR)/*

# https://gitlab.acceleratxr.com/composerjs/typedoc-plugin-sphinx
jslib: 
	cp ../snackabra-jslib/src/snackabra.ts snackabra-jslib
	npx typedoc --out typedocRegular ./snackabra-jslib/snackabra.ts
	npx typedoc --plugin typedoc-plugin-markdown --namedAnchors true --entryDocument jslib2.md --out typedocMD ./snackabra-jslib/snackabra.ts
	cp typedocMD/modules.md source
	cp -R typedocMD/classes typedocMD/interfaces source

# copyLatestJslib:
# 	echo "Copying over jslib - in case you develop locally"
# 	cp ../snackabra-jslib/snackabra.js snackabra-jslib
# 	cp ../snackabra-jslib/snackabra.js.map snackabra-jslib
# 	cp ../snackabra-jslib/snackabra.d.ts snackabra-jslib
# 	cp ../snackabra-jslib/snackabra.ts snackabra-jslib

