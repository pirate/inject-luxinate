#!/usr/local/bin/python
import sys
import luxinate.Luxinate as Luxinate

try:
    url = sys.argv[1]
    media_type = sys.argv[2]
    source = sys.argv[3]
    assert len(url) < 800
    assert media_type in "123"
    assert source in ["individual", "playlist", "user"]
except:
    print "Invalid input %s" % sys.argv
    exit(1)

if source == "individual":
    Luxinate.Luxinate().default(url)
    reload(Luxinate)
    Luxinate.Download().defaultDetermine(media_type)

elif source == "playlist":
    Luxinate.Luxinate().playlist(url)
    reload(Luxinate)
    Luxinate.Download().multiDetermine(media_type)

elif source == "user":
    Luxinate.Luxinate().user(url)
    reload(Luxinate)
    Luxinate.Download().multiDetermine(media_type)
print "Downloaded."
exit(0)

# try:
#     url = sys.argv[1]
#     media_type = sys.argv[2]
#     source = sys.argv[3]
#     assert len(url) < 800
#     assert media_type in "123"
#     assert source in ["individual", "playlist", "user"]
# except:
#     print "Invalid input %s" % sys.argv
#     exit(1)

# if source == "individual":
#     import old_luxinate.LuxinateNormal as LuxinateNormal
#     LuxinateNormal.downloadAudio(url)

# elif source == "playlist":
#     import old_luxinate.LuxinatePlaylist as LuxinatePlaylist
#     LuxinatePlaylist.downloadPlaylistAudio(url)

# elif source == "user":
#     import old_luxinate.LuxinateUser as LuxinateUser
#     LuxinateUser.downloadUserAudio(url)

# print "Downloaded."
# exit(0)
