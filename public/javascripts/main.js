$('#request-btn').click(() => {
  const endpoint = $('#request-url-input').val()
  const url = 'http://localhost:3000/api/' + endpoint

  $.ajax(url).then(response => {
    $('#responseOutput').empty().append(JSON.stringify(response, null, 2))
  })
  .catch(err => {
    $('#responseOutput').empty().append(err.responseText)
  })
})

$('.hint').on('click', 'i', function (e){
  const endpoint = e.target.innerText

  $('#request-url-input').val(endpoint)
  $('#request-btn').click()
})
