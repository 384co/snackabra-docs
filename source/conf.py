# Snackabra Documentation Sphinx File
# Copyright (c) 2019-2023 Magnusson Institute
#
# (full sphinx conf docs:
#  https://www.sphinx-doc.org/en/master/usage/configuration.html)

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#

import os

# -- Project information -----------------------------------------------------

project = 'snackabra'
copyright = '2019-2023, Magnusson Institute'
author = 'Magnusson Institute'

# The full version, including alpha/beta/rc tags
release = '0.6.0 beta'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'sphinxcontrib.blockdiag',
    'sphinxcontrib.seqdiag',
    'sphinx.ext.graphviz',
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
    'sphinx.ext.napoleon', # google-style python autodoc
    'sphinx_js',

    # these are for confluence setup ... not sure all are needed
    'sphinx.ext.intersphinx',
    'sphinx.ext.ifconfig',
    'sphinx.ext.viewcode',
    'sphinx.ext.githubpages',
    'sphinxcontrib.confluencebuilder',

    'myst_parser'

]

# myst_parser (?)
source_suffix = ['.rst', '.md']

tsdoc_warning_disable = 'abstract-method'


# Atlassian Confluence extension configuration
# it will only try to deploy if you have env set for it
if (os.environ.get('confluence_server_pass', '')):
    # guide from:
    # https://towardsdatascience.com/publish-python-project-documentation-on-confluence-html-using-sphinx-fad3a98b8eeb
    # extensions.append('sphinxcontrib.confluencebuilder')
    confluence_publish = True
    confluence_space_key = os.environ.get('confluence_space_key', 'YOU NEED TO CONF YOUR ENV')
    # confluence_parent_page = os.environ.get('confluence_parent_page', 'YOU NEED TO CONF YOUR ENV')
    confluence_server_url = os.environ.get('confluence_server_url', 'YOU NEED TO CONF YOUR ENV')
    confluence_server_user = os.environ.get('confluence_server_user', 'YOU NEED TO CONF YOUR ENV')
    confluence_server_pass = os.environ.get('confluence_server_pass', 'YOU NEED TO CONF YOUR ENV')
    # confluence_ask_password = True
    # confluence_page_hierarchy = True

# Fontpath for blockdiag (truetype font)
# ... TODO .. needed?
# ... yes or control is ugly ...
# blockdiag_fontpath = '/usr/share/fonts/truetype/ipafont/ipagp.ttf'

# seqdiag_fontpath = '/System/Library/Fonts/HelveticaNeue.ttc'
seqdiag_fontpath = '/System/Library/Fonts/Noteworthy.ttc'

# doesn't have an effect?
# blockdiag_transparency = False
blockdiag_transparency = True

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []

# sphinx-js path to snackabra-javascript library
# js_source_path = '../snackabra-jslib'
# optional configuration for jsdoc per se
# jsdoc_config_path = '../jsdoc_conf.json'

# testing working with typescript (typedoc)
# (not able to get it to work, stuck on 'Unable to find any entry points'
# js_language = 'typescript'
# primary_domain = 'js'

# -- Options for HTML output -------------------------------------------------

# Our pick for Snackabra
html_theme = 'furo'

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

# allows embedded images to be opened to full size
html_scaled_image_link = True

# per: https://docs.readthedocs.io/en/stable/guides/adding-custom-css.html
html_css_files = [
    'css/custom.css',
    ]

