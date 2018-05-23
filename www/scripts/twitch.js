
$(document).ready(function(){
	getUserData ();
	$("#online").click(function(){
		$("#all").removeClass("active");
		$("#offline").removeClass("active");
		$("#online").addClass("active");

		// loop through all the .box class to get the innerText value of .status class
		$(".box").each(function(i){
			let boxVal = $(this).children();
			let boxValHtml = boxVal[1].innerText;
			if (boxValHtml === "offline"){
				$(this).addClass("hidden");
			} else if(boxValHtml === "live"){
				$(this).removeClass("hidden");
			};

		})		
	})

	$("#offline").click(function(){
		$("#all").removeClass("active");
		$("#online").removeClass("active");
		$("#offline").addClass("active");

		// loop through all the .box class to get the innerText value of .status class
		$(".box").each(function(i){
			let boxVal = $(this).children();
			let boxValHtml = boxVal[1].innerText;
			if (boxValHtml === "live"){
				$(this).addClass("hidden");
			} else if (boxValHtml === "offline"){
				$(this).removeClass("hidden");
			};
		})		
	})

	$("#all").click(function(){
		$("#all").addClass("active");
		$("#offline").removeClass("active");
		$("#online").removeClass("active");

		// loop through all the .box class to remove the "hidden class" of all the .status class
		$(".box").each(function(i){
			$(this).removeClass("hidden");
		})	
	})
})

const ARRAY_USERS = ["scarra", "imaqtpie", "ninja", "kittyplays", "freecodecamp", "forsen", "castro_1021", "debitorlp", "sevadus", "nick28t", "dyrus", "elementlolz"];


// This is to create a dictionary where I can store all the datas from API objects
class DataResponses{
	constructor (){
		this.dataResponses = {}
	}


	updateDataFromUsers(data){
		let innerData = data.data;
		for (i =0; i<innerData.length; i++){

			let id = innerData[i]['id'];
			let name = innerData[i]['display_name'];

			let image = innerData[i]['offline_image_url'];
			if(image === ""){
				image = "https://static-cdn.jtvnw.net/ttv-static/404_preview-320x180.jpg";
			}

			let logo = innerData[i]['profile_image_url'];
			let viewerNum = innerData[i]['view_count'];
			let title = "";
			let type = "offline";
			let url = `https://www.twitch.tv/${innerData[i]['display_name']}`;
			

			this.dataResponses[id] = {
				// id : id,
				name : name,
				image : image,
				logo : logo,
				viewerNum : viewerNum,
				title: title,
				type: type,
				url: url
			};
		}	
		console.log(`Original Dataresponses:`);
		console.log(this.dataResponses);	
	}


	updateDataFromStreams(data){
		let innerData = data.data;

		for (i=0; i<innerData.length; i++){
			let existingData = this.dataResponses[innerData[i]['user_id']];
			let image = innerData[i]['thumbnail_url'];
			image = image.replace("{width}", "320");
			image = image.replace("{height}", "180");
			let title = innerData[i]['title'];
			let viewerNum = innerData[i]['viewer_count'];
			let type = innerData[i]['type'];
			existingData['image'] = image;
			existingData['title'] = title;
			existingData['viewerNum'] = viewerNum;
			existingData['type'] = type;
		}

		console.log(`Dataresponses after calling streams:`);
		console.log(this.dataResponses);

	}

	updateHtml (){
		let html ="";		
		let data = this.dataResponses;

		Object.keys(this.dataResponses).forEach(function(key){

				html += getHtml(data[key]['name'], data[key]['image'], data[key]['logo'],
							 data[key]['viewerNum'], 
							 data[key]['title'], 
							 data[key]['type'],
							 data[key]['url']
						);
		})
		$('#results').html(html);
	}
}

function getUserData (){

	let urls = 'https://api.twitch.tv/helix/users?';
	for (i=0 ; i<ARRAY_USERS.length; i++){
		urls += `login=${ARRAY_USERS[i]}&`;
	}

	urls = urls.slice(0, -1);
	let dataHolder = new DataResponses();

	$.ajax({
		type: 'GET', 
		url: urls,
		headers: {
		  'Client-ID': 'nypwrx1u2pij5ebsk7r25jv71ii1zk'
		},
		success : function(data) {
			dataHolder.updateDataFromUsers(data);
			getStreamOnline(dataHolder);

		}
	})
}


function getStreamOnline (dataHolder){
	let urls = "https://api.twitch.tv/helix/streams?";

	for (i=0 ; i<ARRAY_USERS.length; i++){
		urls += `user_login=${ARRAY_USERS[i]}&`;
	}
	urls = urls.slice(0, -1);

	$.ajax({
		type: 'GET', 
		url: urls,
		headers: {
		  'Client-ID': 'nypwrx1u2pij5ebsk7r25jv71ii1zk'
		},
		success: function(data) {
		   dataHolder.updateDataFromStreams(data)
		   console.log("Stream Online object:")
		   console.log(data);
		   dataHolder.updateHtml ();

		   if(data.data.length <1){
		   		console.log(`no one is streaming`);
		   } else if(data.data.length >= 1){
		   		console.log(`${data.data.length} people is streaming`);
		   }


		}
	})
}


function getHtml (name, image, logo, viewerNum, title, type, url){
		return `
			<div class="col-md-3 box">
				<div class="thumbnail">
		            <img class="preview" src="${image}" alt="" />
		            <img class="logo" src="${logo}" alt="" />
		        </div>
		        <p class="status text-center"><a href="" target="_blank">${type}</a></p>
		        <p class="title text-center">${title}</p>
	        	<p class="viewers text-center">${viewerNum} viewers <br/> @<a href=${url} target="_blank">${name}</a></p>
			</div>
		`;

}


function updateOnlineUsers (){

}

function updateAllUsers (){}






