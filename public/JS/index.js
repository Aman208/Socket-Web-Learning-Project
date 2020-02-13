var socket = io();

socket.on('connect', () => {
  console.log('Connected to server'); });

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});



socket.on('newMessage', function (message) {
    console.log('newMessage', message);

   var d = moment(message.createdAt).format('h:mm a , L');;
   let li =  $(`<li>
<div class="message-data">
  <span class="message-data-name"><i class="fa fa-circle online"></i>
   ${message.from}</span>
  <span class="message-data-time">${d}</span>
</div>
<div class="message my-message">
  ${message.text}
</div>
</li>`) 

$("#message-list").append(li);

 });



$("#message-form").on('submit' , function(e){
 
  e.preventDefault();
  var d = moment( new Date().getTime()).format('h:mm a , L');
  let text = $("#message-to-send").val();
  let name = $("#user-name").val();

 let li =  $(`<li class="clearfix">
  <div class="message-data align-right">
  <span class="message-data-time" >${d}</span> &nbsp; &nbsp;
  <span class="message-data-name" >${name}</span> <i class="fa fa-circle me"></i>
  </div>
  <div class="message other-message float-right">
    ${text}
  </div>
  </li>`) 

  
  $("#message-list").append(li);

 socket.emit('createMessage' ,{
        from : name,
        text : "User"
     });
  
})






socket.on('someoneTyping' , function(message){

  let element =  $('.typer').find('#typer-user').text();
  
  if(element !== message.from)
 { $('.typer').empty();
   let elm =  $(`<div>
    <p id="typer-user">${message.from}</p>
    <p> is Typing</p>
  <ul class="loader">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul></div>`)

  $('.typer').append(elm);

  setTimeout(function(){ 

 $('.typer').empty();
    
   },
   5000);

}

})


function onTyping() {

  
  $('.typer').empty();
 let name = $("#user-name").val();
  socket.emit('onTyping' , { 
      from : name
  })
};


