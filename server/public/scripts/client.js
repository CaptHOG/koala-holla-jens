$( document ).ready(onReady);

function onReady() {
  console.log('DOM ready');
  getAndRenderKoalas();
  $('#addButton').on('click', saveKoala);
}


// let koalaToSend = {
//   name: 'testName',
//   gender: 'testName',
//   age: 'testName',
//   readyForTransfer: 'testName',
//   notes: 'testName',
// };

// saveKoala( koalaToSend );


function getAndRenderKoalas(){
  console.log( 'in getKoalas' );
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
        <td><button>Delete</button></td>
      </tr>
      `);
    }
  })
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to POST koalas
 
}