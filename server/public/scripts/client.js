$( document ).ready(onReady);

function onReady() {
  console.log('DOM ready');
  getAndRenderKoalas();
  $('#addButton').on('click', saveKoala);
  $('body').on('click', '#deleteKoalaButton', deleteKoala);
}




// saveKoala( koalaToSend );


function getAndRenderKoalas(){
  console.log( 'in getAndRenderKoalas');
  // ajax call to server to GET koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  }).then((response) => {
    console.log(response);
    $('#viewKoalas').empty();
    for (let koala of response) {
      $('#viewKoalas').append(`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.gender}</td>
        <td>${koala.age}</td>
        <td>${koala.ready_for_transfer}</td>
        <td>${koala.notes}</td>
        <td><button>Ready for Transfer</button></td>
        <td><button id="deleteKoalaButton">Delete</button></td>
      </tr>
      `);
    }
  })
} // end getKoalas

function saveKoala(newKoala){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to POST koalas
  let newName = $('#nameIn').val();
  let newAge = $('#ageIn').val();
  let newGender = $('#genderIn').val();
  let newReadyForTransfer = $('#readyForTransferIn').val();
  let newNotes = $('#notesIn').val();

  console.log(newReadyForTransfer);

  let koalaToSend = {
    name: newName,
    age: newAge,
    gender: newGender,
    readyForTransfer: newReadyForTransfer,
    notes: newNotes,
  };

  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: koalaToSend
  }).then((response) => {
    console.log(response);
    getAndRenderKoalas();
  }).catch((error) => {
    console.log('something broke in saveKoala POST', error);
  })
}

function deleteKoala() {
  console.log('koala removed');
}