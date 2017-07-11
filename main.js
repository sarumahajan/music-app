




//function for song play and pause
	


	function toggleSong() {
				var song = document.querySelector('audio');
				if(song.paused == true) {
				console.log('Playing');
				$('.play-icon').removeClass('fa-play').addClass('fa-pause');
				song.play();
				}
				else {
				console.log('Pausing');
				$('.play-icon').removeClass('fa-pause').addClass('fa-play');
				song.pause();
				}

} 








// click function for all song


function addSongNameClickEvent(songObj,position) {
	var songName = songObj.fileName;
    var id = '#song' + position;
$(id).click(function() {
var audio = document.querySelector('audio');
var currentSong = audio.src;
if(currentSong.search(songName) != -1)
{
toggleSong();
}
else {
audio.src = songName;
toggleSong();
changeCurrentSongDetails(songObj);
}
});
}



// show details of current song playing
function changeCurrentSongDetails(songObj) {
    $('.current-song-image').attr('src','image/' + songObj.image);
    $('.current-song-name').text(songObj.name);
    $('.current-song-artist').text(songObj.artist);
}




//function for change the time from sec to min

function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


//function for display current and duration time of song


function updateCurrentTime() {
var song = document.querySelector('audio');
    var currentTime = Math.floor(song.currentTime);
    currentTime = fancyTimeFormat(currentTime);
    var duration = Math.floor(song.duration);
    duration = fancyTimeFormat(duration)
    $('.time-elapsed').text(currentTime);
    $('.song-duration').text(duration);
}


//playlist

var songs = [{  //song1
        'name': 'Something Just Like This ',
        'artist': 'The Chainsmokers',
        'album': 'Something Just Like This',
        'duration': '4:07',
       'fileName': 'song1.mp3',
	   'image': 'song1.png'
    },
    {      //song2
        'name': 'It Aint Me',
        'artist': 'Selena Gomez, Kygo',
        'album': 'It Aint Me',
        'duration': '3:40',
        'fileName': 'song2.mp3',
	   'image': 'song2.jpg'
    }, 
    {       //song3
        'name': 'Shape of You',
        'artist': 'Galantis, Ed Sheeran',
        'album': 'Shape of You',
        'duration': '3:16',
        'fileName': 'song3.mp3',
	   'image': 'song3.jpg'
    },
    {       //song4
        'name': 'Believer',
        'artist': 'Imagine Dragons',
        'album': 'Believer',
        'duration': '3:23',
        'fileName': 'song4.mp3',
	   'image': 'song4.jpg'
    },
    {         //song5
        'name': 'Cheap Thrills',
        'artist': 'Sia ,Sean Paul ',
        'album': 'Cheap Thrills',
        'duration': '3:44',
        'fileName': 'song5.mp3',
	   'image': 'song5.jpg'
    },
    {        //song6
        'name': 'We Dont Talk Anymore',
        'artist': 'Charlie Puth , Selena Gomez',
        'album': 'We Dont Talk Anymore',
        'duration': '3:37',
        'fileName': 'song6.mp3',
	   'image': 'song6.jpg'
    },
    {       //song7
        'name': 'Let Me Love You',
        'artist': 'Dj Snake , Justin Bieber',
        'album': 'Let Me Love You',
        'duration': '3:25',
        'fileName': 'song7.mp3',
	   'image': 'song7.jpg'
    }
	
	]



window.onload = function() {
changeCurrentSongDetails(songs[0]);
updateCurrentTime();

setInterval(function() {
updateCurrentTime();
},1000);





	
	
	
	//loop for text and click event  for all songs
	
 for(var i =0; i < songs.length;i++) {
        var obj = songs[i];
        var name = '#song' + (i+1);
        var song = $(name);
        song.find('.song-name').text(obj.name);
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj,i+1);
    }
	$('#songs').DataTable({
       
        
         
         
        paging:         false
    });

}
	

	
	
	
	//welcome screen
	
    $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 3) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });
	
	//play-pause the song with icon
	
	
    $('.play-icon').on('click', function() {
        
		toggleSong();
		
		
    });
	
	
	
	
	









	
//play-pause the song with keypress
	
	
	
    $('body').on('keypress',function(event) {
    var target = event.target;
    if (event.keyCode == 32 && target.tagName !='INPUT')
    {
        toggleSong();
    }
});

			
			
			
			
			
	