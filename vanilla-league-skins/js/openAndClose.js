function openFromElementOld (elm, toOpen, targetProperties, callback) {
  var $elm = $(elm)
  var $target = $(toOpen)
  $target.show()
  $target.height($elm.outerHeight())
  $target.width($elm.outerWidth())
  $target.offset($elm.offset())
  $target.animate(targetProperties, 300, function () {
    if (callback !== undefined) {
      callback()
    }
  })
}

export const openFromElement = (start, toAnimate) => new Promise((resolve, reject) => {

})
