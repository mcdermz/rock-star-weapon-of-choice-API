$('#request-btn').click(() => {
  const endpoint = $('#request-url-input').val()
  const url = 'http://localhost:3000/api/' + endpoint

  $.ajax(url).then(data => {
    $('#responseOutput').empty().append(JSON.stringify(data, null, 2))
  })
})

$('.hint').on('click', 'i', function (e){
  const endpoint = e.target.innerText

  $('#request-url-input').val(endpoint)
  $('#request-btn').click()
})
