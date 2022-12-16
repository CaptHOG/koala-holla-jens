$( document ).ready(onReady);

function onReady() {
  console.log('DOM ready');
  getAndRenderKoalas();
  $('#addButton').on('click', saveKoala);
  $('body').on('click', '.deleteKoalaButton', deleteKoala);
  $('body').on('click', '.markReadyButton', readyKoalaForTransfer);
}


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
      if (koala.ready_for_transfer == 0) {
        $('#viewKoalas').append(`
        <tr data-id=${koala.id}>
          <td>${koala.name}</td>
          <td>${koala.gender}</td>
          <td>${koala.age}</td>
          <td>${koala.ready_for_transfer}</td>
          <td>${koala.notes}</td>
          <td><button class="markReadyButton">Ready for Transfer</button></td>
          <td><button class="deleteKoalaButton">Delete</button></td>
        </tr>
        `);
      } else {
        $('#viewKoalas').append(`
        <tr data-id=${koala.id}>
          <td>${koala.name}</td>
          <td>${koala.gender}</td>
          <td>${koala.age}</td>
          <td>${koala.ready_for_transfer}</td>
          <td>${koala.notes}</td>
          <td></td>
          <td><button class="deleteKoalaButton">Delete</button></td>
        </tr>
        `);
      }
    }
  });
}

function saveKoala(){
  console.log( 'in saveKoala');
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
  let idToDelete = $(this).parent().parent().data().id;
  console.log(idToDelete);

  $.ajax({
    method: 'DELETE',
    url: `/koalas/${idToDelete}`
  }).then((response) => {
    console.log(response);
    getAndRenderKoalas();
  }).catch((error) => {
    console.log('deleteKoala not working', error);
  })
}

function readyKoalaForTransfer() {
  console.log('koala updated');
  let idToUpdate = $(this).parent().parent().data().id;
  console.log(idToUpdate);

  $.ajax({
    method: 'PUT',
    url: `/koalas/${idToUpdate}`,
    data: {
      readyForTransfer: 'Y'
    }
  }).then((response) => {
    console.log(response);
    getAndRenderKoalas();
  }).catch((error) => {
    console.log('readyKoalaForTransfer not working', error);
  })
}