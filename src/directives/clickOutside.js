export default {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event) {
      // Cek apakah klik berada di luar elemen
      if (!(el === event.target || el.contains(event.target))) {
        // Jika ya, panggil fungsi yang diberikan
        binding.value(event)
      }
    }

    document.addEventListener('click', el.clickOutsideEvent)
  },

  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
