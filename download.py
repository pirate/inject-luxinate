#!/usr/local/bin/python
import sys
import luxinate.Luxinate as Luxinate

if len(sys.argv) >= 2:
    url = sys.argv[1]
    print Luxinate.Luxinate().default(url)

    reload(Luxinate)
    print Luxinate.Download().defaultDetermine('2')
else:
    print "No URL Specified."
