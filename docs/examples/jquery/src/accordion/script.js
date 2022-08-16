var x = 0
var flag = true

$('.item').eq(x).css('width', 300)
for (var j = 1; j < 7; j++) {
  $('.title')
    .eq(j - 1)
    .css('backgroundImage', 'url(./accordion/img' + j + '.png)')
  $('.concent')
    .eq(j - 1)
    .css('backgroundImage', 'url(./accordion/img0' + j + '.png)')
}

$('.title').click(function () {
  var index = $(this).parent().index()
  console.log(index)
  if (flag) {
    flag = false

    $('.item')
      .eq(index)
      .animate(
        {
          width: 300
        },
        function () {
          flag = true
        }
      )
    $('.item')
      .eq(x)
      .animate(
        {
          width: 50
        },
        function () {
          x = index
        }
      )
  }
})
