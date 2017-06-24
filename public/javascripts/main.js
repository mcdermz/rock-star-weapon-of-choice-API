console.log('sanity');
$('#request-btn').click(() => {
  const endpoint = $('#request-url-input').val()
  const url = 'http://localhost:3000/api/' + endpoint
  $.ajax(url).then(data => {
    $('#responseOutput').empty().append(JSON.stringify(data, null, "\t"))
  })
})
