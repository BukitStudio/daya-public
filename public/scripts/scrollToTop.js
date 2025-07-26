// Always scroll to top on page load (prevents anchor restore)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.addEventListener('DOMContentLoaded', function() {
  window.scrollTo(0, 0);
});
