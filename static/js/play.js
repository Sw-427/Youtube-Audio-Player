var dict=[];
var flag = 0;
var liked=[];

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.body.style.backgroundColor = "white";
}
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
let i=1,k=0;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player2', {
    height: '1',
    width: '1',
    videoId: '{{ data['vid_id'] }}',
    events: {
      'onReady': onPlayerReady,
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();

}

  function like(){
    document.getElementById("liked").src = "/static/img/heart2.png";
    liked.push({
      thumbnail:document.getElementById("A4").src,
      title:document.getElementById("songTitle").innerHTML,
      vid_id:document.getElementById("player2").src,
    });
    var like = JSON.parse(JSON.stringify(liked[liked.length-1]))
    var main = document.getElementById('sidebar');
    var but =  document.createElement('button');
    var func = "switch1("+(liked.length-1)+")";
    but.setAttribute('onclick',func);

    var newimg = document.createElement('img');
    newimg.src = like.thumbnail;
    newimg.style.width='100%';


    var x = document.createElement('FIGCAPTION');
    var t = document.createTextNode(like.title);
    x.style.color = "#fff";

    x.appendChild(t);

    but.appendChild(newimg);
    main.appendChild(but);
    main.appendChild(x);


  }
  function switch1(x){
    var like = JSON.parse(JSON.stringify(liked[x]));
    document.getElementById("A1").src=like.thumbnail;
    document.getElementById("A2").innerHTML= like.title;
    document.getElementById("A3").src=like.thumbnail;
    document.getElementById("A4").src=like.thumbnail;
    document.getElementById("songTitle").innerHTML=like.title;
    document.getElementById("player2").src = like.vid_id;
    document.getElementById("play1").src = "/static/img/Pause.png";
    document.getElementById("liked").src = "/static/img/heart2.png";
    i = 1;


  }
  function next(){
    var val = document.getElementById("songTitle").innerHTML;
    var i=0;
    for(i=0; i<liked.length-1;i++)
    {
      var like = JSON.parse(JSON.stringify(liked[i]));
      if(val == like.title)
      {
        like = JSON.parse(JSON.stringify(liked[i+1]));
        document.getElementById("A1").src=like.thumbnail;
        document.getElementById("A2").innerHTML= like.title;
        document.getElementById("A3").src=like.thumbnail;
        document.getElementById("A4").src=like.thumbnail;
        document.getElementById("songTitle").innerHTML=like.title;
        document.getElementById("player2").src = like.vid_id;
        document.getElementById("play1").src = "/static/img/Pause.png";
        document.getElementById("liked").src = "/static/img/heart2.png";
        i = 1;


      }
    }
  }
  function pre(){

      var val = document.getElementById("songTitle").innerHTML;
      var i=0;
      for(i=liked.length-1; i>0;i--)
      {
        var like = JSON.parse(JSON.stringify(liked[i]));

        if(val == like.title)
        {
          like = JSON.parse(JSON.stringify(liked[i-1]));
          document.getElementById("A1").src=like.thumbnail;
          document.getElementById("A2").innerHTML= like.title;
          document.getElementById("A3").src=like.thumbnail;
          document.getElementById("A4").src=like.thumbnail;
          document.getElementById("songTitle").innerHTML=like.title;
          document.getElementById("player2").src = like.vid_id;
          document.getElementById("play1").src = "/static/img/Pause.png";
          document.getElementById("liked").src = "/static/img/heart2.png";
          i = 1;


        }
      }


  }
  var playButton = document.getElementById("play");
  playButton.addEventListener("click", function() {
    if(i == 1)
    {
    document.getElementById("play1").src = "/static/img/Play.png";
    player.pauseVideo();
    i = 0;
    }
    else if(i == 0)
    {
      document.getElementById("play1").src = "/static/img/Pause.png";
      player.playVideo();
      i = 1;
    }

});

const progress = document.getElementById( "progressBar" );

function progressLoop() {
  setInterval(function () {
    progress.value = Math.round(
      (player.getCurrentTime() / player.getDuration()) * 100);
      //progress.value*(player.getDuration() / 100
  });
}
progressLoop();
document.getElementById("progressBar").addEventListener('click',function(e){
  var x =e.pageX - this.offsetLeft;
  var startpos = document.getElementById('progressBar').position;
  var xconvert = (x-485)/4.55;
  var finalx = (xconvert).toFixed(1);
  document.getElementById('progressBar').value = finalx;
  player.seekTo(Math.round(progress.value*(player.getDuration() / 100)), true);
});

function myfunction1(){
  var dat = JSON.stringify(dict[0]);
  var d = JSON.parse(dat);
document.getElementById("id-0").addEventListener('click',function() {
  document.getElementById("A1").src=d[0].thumbnail;
  document.getElementById("A2").innerHTML= d[0].title;
  document.getElementById("A3").src=d[0].thumbnail;
  document.getElementById("A4").src=d[0].thumbnail;
  document.getElementById("songTitle").innerHTML=d[0].title;
  var id = "https://www.youtube.com/embed/"+d[0].vid_id+"?enablejsapi=1";
  document.getElementById("player2").src = id;
  document.getElementById("row").style.display = "none";
  document.getElementById("play1").src = "/static/img/Pause.png";
  document.getElementById("liked").src = "/static/img/heart1.png";
  i = 1;


});

document.getElementById("id-1").addEventListener('click',function() {
  document.getElementById("A1").src=d[1].thumbnail;
  document.getElementById("A2").innerHTML= d[1].title;
  document.getElementById("A3").src=d[1].thumbnail;
  document.getElementById("A4").src=d[1].thumbnail;
  document.getElementById("songTitle").innerHTML=d[1].title;
  var id = "https://www.youtube.com/embed/"+d[1].vid_id+"?enablejsapi=1";
  document.getElementById("player2").src = id;
  document.getElementById("row").style.display = "none";
  document.getElementById("play1").src = "/static/img/Pause.png";
  document.getElementById("liked").src = "/static/img/heart1.png";
  i = 1;


});

document.getElementById("id-2").addEventListener('click',function() {
  document.getElementById("A1").src=d[2].thumbnail;
  document.getElementById("A2").innerHTML= d[2].title;
  document.getElementById("A3").src=d[2].thumbnail;
  document.getElementById("A4").src=d[2].thumbnail;
  document.getElementById("songTitle").innerHTML=d[2].title;
  var id = "https://www.youtube.com/embed/"+d[2].vid_id+"?enablejsapi=1";
  document.getElementById("player2").src = id;
  document.getElementById("row").style.display = "none";
  document.getElementById("play1").src = "/static/img/Pause.png";
  document.getElementById("liked").src = "/static/img/heart1.png";
  i = 1;


});

document.getElementById("id-3").addEventListener('click',function() {
  document.getElementById("A1").src=d[3].thumbnail;
  document.getElementById("A2").innerHTML= d[3].title;
  document.getElementById("A3").src=d[3].thumbnail;
  document.getElementById("A4").src=d[3].thumbnail;
  document.getElementById("songTitle").innerHTML=d[3].title;
  var id = "https://www.youtube.com/embed/"+d[3].vid_id+"?enablejsapi=1";
  document.getElementById("player2").src = id;
  document.getElementById("row").style.display = "none";
  document.getElementById("play1").src = "/static/img/Pause.png";
  document.getElementById("liked").src = "/static/img/heart1.png";
  i = 1;


});

document.getElementById("id-4").addEventListener('click',function() {
  document.getElementById("A1").src=d[4].thumbnail;
  document.getElementById("A2").innerHTML= d[4].title;
  document.getElementById("A3").src=d[4].thumbnail;
  document.getElementById("A4").src=d[4].thumbnail;
  document.getElementById("songTitle").innerHTML=d[4].title;
  var id = "https://www.youtube.com/embed/"+d[4].vid_id+"?enablejsapi=1";
  document.getElementById("player2").src = id;
  document.getElementById("row").style.display = "none";
  document.getElementById("play1").src = "/static/img/Pause.png";
  document.getElementById("liked").src = "/static/img/heart1.png";
  i = 1;


});

}
$(document).ready(function() {

	$('form').on('submit', function(event) {
		$.ajax({
			data : {
				name : $('#in').val(),
        url: "1",
        title:"1",
			},
			type : 'POST',
			url : '/play',

		})
		.done(function(data) {
      var dat = JSON.stringify(data.data);
      var d = JSON.parse(dat);
      var i = 0;

      if(flag == 0)
      {
      dict.push(d);
      for(i=0;i<5;i++)
      {
        var row = document.getElementById("row");
            var newdiv = document.createElement('div');
            var newdiv1 = document.createElement('div');
            var but =  document.createElement('button');

            var id = "id-"+i;
            but.id=id;
            newdiv.style.padding = "18px";
            newdiv.id="column";
            newdiv1.id="img-text";
            id="iid"+i;

            var newimg = document.createElement('img');
            newimg.src = d[i].thumbnail;
            newimg.id = id;
            newimg.height="200";
            newimg.width="250";

            var x = document.createElement('p');
            var t = document.createTextNode(d[i].title);
            id="fid"+i;
            x.id=id;
            x.appendChild(t);

            but.appendChild(newimg);
            newdiv1.appendChild(but);
            newdiv1.appendChild(x);

            newdiv.appendChild(newdiv1);

            row.appendChild(newdiv);
      }
      flag=1;
    }
    else
    {
      dict[0]=d;
      document.getElementById("row").style.display = "block";
      for(i=0;i<5;i++){
        var id = "iid"+i;
        document.getElementById(id).src = d[i].thumbnail;
        id="fid"+i;
        document.getElementById(id).innerHTML = d[i].title;
      }

    }
      myfunction1();

		});

		event.preventDefault();

	});

});
$(document).ready(function() {

	$('#download').click(function(event) {


		$.ajax({
			data : {
        name:"1",
				url : player.getVideoUrl(),
        title: document.getElementById("songTitle").innerHTML,
			},
			type : 'POST',
			url : '/play',

		})
    .done(function() {
      const a = document.createElement("a");
      a.style.display = "none";
      document.body.appendChild(a);

      a.href="/download";
      a.target="_blank";

      // Trigger the download by simulating click
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(a.href);
      document.body.removeChild(a);


      });
		event.preventDefault();

	});

});
