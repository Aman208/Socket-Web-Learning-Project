var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

//  socket.emit('createMessage' ,{
//     from : "Andrew" ,
//     text : "Yup that works for me"
//  });

});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);

let li = $('<li></li>') ;

li.text(`${message.from}  :  ${message.text}`);

$("#messages").append(li);



  });

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});


$("#message-form").on('submit' , function(e){
 e.preventDefault();

 socket.emit('createMessage' ,{
        from : $("#name").val() ,
        text : $("#text").val()
     });

})
