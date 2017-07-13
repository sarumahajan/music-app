

var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0;
var willvisual = 0;
















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


function visualization(){
	
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById('audioElement');
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);

  //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  var frequencyData = new Uint8Array(350);

  var svgHeight = '260';
  var svgWidth = '1350';
  var barPadding = '0.5';

  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg = createSvg('body', svgHeight, svgWidth);

  // Create our initial D3 chart.
  svg.selectAll('rect')
     .data(frequencyData)
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return i * (svgWidth / frequencyData.length);
     })
     .attr('width', svgWidth / frequencyData.length - barPadding);

  // Continuously loop and update chart with frequency data.
  function renderChart() {
     requestAnimationFrame(renderChart);

     // Copy frequency data to frequencyData array.
     analyser.getByteFrequencyData(frequencyData);

     // Update d3 chart with new data.
     svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
           return svgHeight - d;
        })
        .attr('height', function(d) {
           return d;
        })
        .attr('fill', function(d) {
           return 'rgb(0, 0, ' + d + ')';
        });
  }

  // Run the loop
   renderChart();
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

function progressbar() {
	var song = document.querySelector('audio');
	var ct=  song.currentTime;
	var dt=song.duration;
	var percentage=(ct/dt)*100;
	$(".progress-filled").css('width', percentage+"%");
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





function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}

function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}














//playlist

var songs = [{  //song1

             'name': 'Believer',
        'artist': 'Imagine Dragons',
        'album': 'Believer',
        'duration': '3:23',
        'fileName': 'song1.mp3',
	   'image': 'song1.jpg'
        
    },
    {      //song2
        'name': 'Cheap Thrills',
        'artist': 'Sia ,Sean Paul ',
        'album': 'Cheap Thrills',
        'duration': '3:44',
        'fileName': 'song2.mp3',
	   'image': 'song2.jpg'
	
    },
    {       //song3
        'name': 'It Aint Me',
        'artist': 'Selena Gomez, Kygo',
        'album': 'It Aint Me',
        'duration': '3:40',
        'fileName': 'song3.mp3',
	   'image': 'song3.jpg'
    },
    {       //song4
        'name': 'Let Me Love You',
        'artist': 'Dj Snake , Justin Bieber',
        'album': 'Let Me Love You',
        'duration': '3:25',
        'fileName': 'song4.mp3',
	   'image': 'song4.jpg'
    },
    {         //song5
        'name': 'Shape of You',
        'artist': 'Galantis, Ed Sheeran',
        'album': 'Shape of You',
        'duration': '3:16',
        'fileName': 'song5.mp3',
	   'image': 'song5.jpg'
    },
    {        //song6
        'name': 'Something Just Like This ',
        'artist': 'The Chainsmokers',
        'album': 'Something Just Like This',
        'duration': '4:07',
       'fileName': 'song6.mp3',
	   'image': 'song6.png'
    },
    {       //song7
        'name': 'We Dont Talk Anymore',
        'artist': 'Charlie Puth , Selena Gomez',
        'album': 'We Dont Talk Anymore',
        'duration': '3:37',
        'fileName': 'song7.mp3',
	   'image': 'song7.jpg'
    }

	]



window.onload = function() {



changeCurrentSongDetails(songs[0]);
updateCurrentTime();

setInterval(function() {
updateCurrentTime();
progressbar();
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






$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});


$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
});



$('.fa-bar-chart').on('click',function() {
    $('.fa-bar-chart').toggleClass('disabled')
    willvisual = 1 - willvisual;
	if(willvisual == 1)
	{
	
	visualization();
	}
	
		
});


$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if (willShuffle == 1) {
        var nextSongNumber = randomExcluded(1,7,currentSongNumber); // Calling our function from Stackoverflow
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < 8) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})
//play-pause the song with keypress



    $('body').on('keypress',function(event) {
    var target = event.target;
    if (event.keyCode == 32 && target.tagName !='INPUT')
    {
        toggleSong();
    }
});
