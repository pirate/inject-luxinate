#!/usr/local/bin/python
import sys
import os

# make sure to add line to sudoers file
# _www    ALL=NOPASSWD: /path/to/inject-luxify/download.py

types = ["video", "audio", "both"]
sources = ["individual", "playlist", "user"]

try:
    url = sys.argv[1]
except IndexError:
    print "No URL Specified."
    exit(1)

try:
    if sys.argv[2] in types:
        media_type = types.index(sys.argv[2])+1
    else:
        media_type = 2
except IndexError:
    media_type = 2

try:
    if sys.argv[3] in sources:
        source = sys.argv[3]
    else:
        source = "individual"
except IndexError:
    source = "individual"

try:
    assert len(url) < 500
    assert media_type in (1,2,3)
    assert source in ("individual", "playlist", "user")
except:
    print "Invalid input %s" % sys.argv
    exit(1)

command = '/usr/bin/sudo ./download.py %s %s %s' % (url, media_type, source)
p = os.popen(command)
print "Downloading url:%s type:%s source:%s" % (url, media_type, source)
print p.read()
exit(0)
    
