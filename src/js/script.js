(function ($){

  // swear agreement
  $('#agree-date, #birth-date').each((i, input) => {
    $(input).datepicker({
      language: 'es',
    })
  })

  // edit btn action
  $('.section__edit-btn').on('click', (e) => {
    $('#client-name').prop('disabled', false)
    $(e.target).prop('disabled', true)

    alert('Edit Callback')
  })

  // find licence callback
  $('.find-licence').on('click', (e) => {
    alert('Find Licence Callback')
  })

})(jQuery)
