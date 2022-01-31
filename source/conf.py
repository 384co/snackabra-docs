# Snackabra Documentation Sphinx File
# Copyright (c) Magnusson Institute

project = 'snackabra'
copyright = '2019-2022, Magnusson Institute'
author = 'Magnusson Institute'

# The full version, including alpha/beta/rc tags
release = '0.3'

extensions = ['sphinxcontrib.blockdiag', 'sphinxcontrib.seqdiag']

templates_path = ['_templates']

exclude_patterns = []

html_theme = 'furo'

# ... fuck me
# https://stackoverflow.com/questions/50080481/rendering-discrepancy-between-readthedocs-and-localhost
html_static_path = ['']
