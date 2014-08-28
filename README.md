moviedb-interactive-search
==========================

This is a single-page webpage which searches the Internet Movie Database. 

The logic of the application is contained within the follwing files:
``` 
 js/defines.js - some constants used in various other files
 js/searchBar.js - classes for controlling seachbar position and progress indicator
 js/result.js - class for displaying individual results
 js/search.js - class for handling search and displaying overall results
 js/main.js - main function which handles hooking everything else up
```

Other insteresting files are in the css folder, and index.html. Libraries used are in the libraries directory. 

#Usage
All you need is a simple web server that is capable of serving local files (just opening the .html file will not work as needs to do ajax). I recommend using python's httpsever, or mongoose on windows: https://code.google.com/p/mongoose/
```
Commands for python, makes server at specified port in current directory: 
  2.*  python -m SimpleHTTPServer 9999
  3.*  python -m http.server 8888
```


#Tests:

Basic functional testing was performed on this application. The following steps were undertaken:

 action | result 
 ------ | -------
 Entering 1 or 2 characters | Nothing happens 
 Removing all characters | Progress bar returns to start
 Entering 3 characters | Progress bar goes to right
 Waiting 2 seconds | Bar goes to top, progress finishes going to right, data shown
 Delete 1 character (now at 2) | Nothing changes
 Add 2 characters (first same as one removed, now at 4) | Bar starts from left
 Remove 1 character | data doesn't reload
 Add 1 character and wait 2 secs | data reloads
 Click on another menu option | data reloads, specific this time
 Delete all characters | everything blanked after seconds
 Type in 3+ characters | search done, still displays specific as per menu
 Refresh web page | back to start
 Type in 3+ characters | search done, still displays specific as per menu
 Type something common (e.g. morgan, under 'all') | scroll down, ensure more loaded
