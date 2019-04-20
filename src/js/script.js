(function ($){

  // add datepicker for date inputs
  $('.as-datepicker').each((i, input) => {
    $(input).datepicker({
      language: 'es',
    })
  })

  // edit name btn action callback
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
