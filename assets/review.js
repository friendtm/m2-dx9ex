
const dataNode = document.getElementById('source-data');
const sources = dataNode ? JSON.parse(dataNode.textContent) : {};
document.querySelectorAll('[data-download]').forEach(button => button.addEventListener('click', () => {
  const entry = sources[button.dataset.file];
  const encoded = entry[button.dataset.download];
  if (encoded === null) return;
  const bytes = Uint8Array.from(atob(encoded), c => c.charCodeAt(0));
  const url = URL.createObjectURL(new Blob([bytes], {type:'application/octet-stream'}));
  const link = document.createElement('a'); link.href = url;
  link.download = button.dataset.download + '-' + entry.path.split('/').pop();
  link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}));
const filter = document.getElementById('filter');
if (filter) filter.addEventListener('input', () => {
  const value = filter.value.trim().toLowerCase();
  document.querySelectorAll('[data-search]').forEach(el => {el.hidden = !el.dataset.search.includes(value);});
});
