$('#request-btn').click(() => {
  const endpoint = $('#request-url-input').val()
  const url = 'https://rock-star-weapon-of-choice.herokuapp.com/api/' + endpoint

  $.ajax(url).then(response => {
    $('#responseOutput').empty().append(JSON.stringify(response, null, 2))
  })
  .catch(err => {
    $('#responseOutput').empty().append(err.responseText)
  })
})

$('.hint').on('click', 'i', function (e) {
  const endpoint = e.target.innerText

  $('#request-url-input').val(endpoint)
  $('#request-btn').click()
})

$('.post-form-submit').click(function (e) {
  e.preventDefault()
  const url = 'https://rock-star-weapon-of-choice.herokuapp.com/api/star-weapon'
  const $inputs = $('.post-form :input');
  const data = {}

  $inputs.each(function () {
    if (this.value) data[this.name] = this.value
  })

  $.ajax({
    url,
    method: 'POST',
    data
  })
  .done(function (response){
    $('#request-success').removeClass('hidden')
    $inputs.each(function () {
      this.value = ''
    })
  })
  .catch(function (){
    $('#request-fail').removeClass('hidden')
    $('.form-control').addClass('has-danger')
  })
})

$('.post-form input').focus(() => {
  $('#request-fail').addClass('hidden')
  $('#request-success').addClass('hidden')
})
