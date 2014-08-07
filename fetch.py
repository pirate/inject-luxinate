#!/usr/local/bin/python
import sys
import os

if len(sys.argv) >= 2:
    url = sys.argv[1]
    print "Downloading %s" % url
    # add line to sudoers file
    # _www    ALL=NOPASSWD: /path/to/luxify-inject/download.py
    p = os.popen('/usr/bin/sudo ./download.py "%s" > /dev/null & /bin/echo Downloading.' % url.replace('"', "")) # a little bit of security to prevent running arbitrary commands with sudo
    print p.read()
else:
    print "No URL Specified."
