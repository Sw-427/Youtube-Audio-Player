# YouTube Audio Player/Downloader
#### Video Demo:  https://youtu.be/qyJQyDHlDPw
#### Description: This a YouTube audio player that works with the YouTube API to get data when the user searches for      something and returns it to template where there is an embedded YouTube player that plays the Audio for you.            
1) application.py: This file is where all the stuff related to flask takes place. All the redirecting, rendering of templates and sending files back takes place.                                                                          
2) Yt_P.py:  This python file consist of all the functions that are used in main application.py file. The yt_cal() function is the most important function of this project which is call a lot of times. It returns all the data back to the template soo that the user can select a thumbnail and then using that information the audio is played.                                                                                                                  
3) index.html: This template took a decent amount of time to make. The inspiration for this came from a YouTube video. a good bit of CSS has been used here. Other than the looks there's not much going on here.  
                              
4) medi.html: This is the templates that is used as an intermediate between index and play. Here the results of the search are shown which are clickable, which on clicking redirect you to the main template play.html where the most stuff happens. Although here also you can search for stuff and get results if not satisfied with the previous results.         
5) play.html: This is the most important file of the project. This alone took around 2-3 weeks to make, as everything had to be arrange in harmony along with the many other things that are present here. A lot of javascript has been used here, around 400 lines of just javascript. This was the most difficult part to figure out. There are a lot of hidden tags here when work in the background to make it so that everything works just fine. There is also a good bit of ajax being used here to dynamically generate search results and then hide it later.     
                                                 
6) download.html: There is almost nothing going on here. This is just a template used to download the file so that any we won't have to make any changes to the main play.html.                           
7) styles.css: Just a lot of CSS. All the CSS as a matter of fact.  
                                                   
9) medi.js: A little bit of javascript.
