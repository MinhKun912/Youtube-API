document.addEventListener("DOMContentLoaded", function(event) { var inputSearch =document.getElementById("keyword");
inputSearch.onkeydown = function(envent){
    if(envent.ketCode == 13){
        loadVideo(this.value);

    }
}
loadVideo("Đen Vâu");
});

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var videoFrame = document.getElementById("video-frame");
span.onclick = function(event){
    if(event.target == modal){
        closeVideo();
    }
}
function loadVideo(keyword){
    var YOUTUBE_API ="https://content.googleapis.com/youtube/v3/search?q=" + keyword + "&type=video&maxResults=9&part=snippet&key=AIzaSyCO_f4mE8n4Pw1R0XN3xUZO1tXUAXHuCHw";
    var xhr =new XMLHttpRequest();
    xhr.open("GET",YOUTUBE_API, true);
    xhr.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var reponseJson=JSON.parse(this.responseText);
            var htmlContent = "";
            for (var i=0 ;i<reponseJson.items.length; i++) {
             if(reponseJson.items[i].id.kind == 'youtube#chanel'){
                continue;
            }
            var videoId = reponseJson.items[i].id.videoId;
            var videoTitle =reponseJson.items[i].snippet.Title
            var videoDescription =reponseJson.items[i].snippet.description;
         var videoThumbnail = reponseJson.items[i].snippet.thumbnails.medium.url;
         htmlContent += '<div class="video" onclick="showVideo((\'' + videoId + '\')">'  
         htmlContent+= '<img src="'+ videoThumbnail +'">'
         htmlContent+= '<div class="title">'+videoTitle+ '</div>';
        htmlContent+='</div>'
        }
        document.getElementById("list-video").innerHTML = htmlContent;

    }else if(this.readyStage==4){
        console.log("Fails");
    }
};
xhr.send();
}
function closeVideo(){
    modal.style.display="none";
    videoFrame.src="";
}
function closeVideo(videoId){
    videoFrame(function(){
        modal.style.display="block";
    },300);
}