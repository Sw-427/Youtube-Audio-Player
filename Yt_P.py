# -*- coding: utf-8 -*-
"""
Created on Sun Feb 21 17:47:06 2021

@author: 91704
"""
from googleapiclient.discovery import build
import re
from datetime import timedelta
import html
import random
import string
import shutil
import subprocess
import requests


def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return "".join(random.choice(chars) for _ in range(size))

def zipping(id_generated, location):
        shutil.make_archive(id_generated, "zip", location)
        moving_zip_to = "media\\"
        moving_zip_from = "{id_generated}.zip".format(id_generated=id_generated)
        shutil.move(moving_zip_from, moving_zip_to)

def get_media(url):

    id_generated = id_generator()
    subprocess.call('youtube-dl -f 251 -o "media/Audio downloads/{id_generated}.%(ext)s" -q --no-playlist --extract-audio --audio-format mp3 --no-warnings "{url}"'.format(
                    id_generated=id_generated, url=url
                    ),
                    shell=True,)
    return id_generated
def yt_cal(var):
    data=[]
    temp={}

    api_key = "AIzaSyA8NMrjxI7aC3s-8ONHHRJJh_iBWhvM7v8"
    #"AIzaSyAr6Y864i5x7GNxv1rpJGnGMus53I-9hL0"
    #"AIzaSyA8NMrjxI7aC3s-8ONHHRJJh_iBWhvM7v8"
    youtube = build('youtube','v3',developerKey = api_key)
    request = youtube.search().list(
        q = var,
        part = 'snippet',
        type = 'video'
        )

    response = request.execute()
    
    print(response)

    for title in response['items']:
        temp['title'] = html.unescape(title['snippet']['title'])
        data.append(temp.copy())

    i=0
    for item in response['items']:
        data[i]['vid_id']=item['id']['videoId']
        i=i+1

    i=0
    for item in response['items']:
        data[i]['thumbnail']=item['snippet']['thumbnails']['high']['url']
        i=i+1
    i=0
    for dat in data:
        vid_du = youtube.videos().list(
            part='contentDetails',
            id= dat['vid_id']
            )

        h_p = re.compile(r'(\d+)H')
        m_p = re.compile(r'(\d+)M')
        s_p = re.compile(r'(\d+)S')

        vid_du = vid_du.execute()
        duration = vid_du['items'][0]['contentDetails']['duration']

        hr=h_p.search(duration)
        mins=m_p.search(duration)
        secs=s_p.search(duration)

        hr = int(hr.group(1)) if hr else 0
        mins = int(mins.group(1)) if mins else 0
        secs = int(secs.group(1)) if secs else 0

        dura = timedelta(hours = hr,
                         minutes = mins,
                         seconds = secs)
        data[i]['duration'] = str(dura)
        i=i+1

    i=0
    for dat in data:
        dat['id']=i+1
        i=i+1
    return data
yt_cal("aa")
