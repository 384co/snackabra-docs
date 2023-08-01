#!/usr/bin/env python3

import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

port = 8112
if len(sys.argv) > 1:
    port = int(sys.argv[1])

httpd = HTTPServer(('localhost', port), CORSRequestHandler)
print(f'Server listening on localhost:{port}...')
httpd.serve_forever()
