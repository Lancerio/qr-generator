const form = document.getElementById('generate--form');
const loader = document.getElementById('loader');
const qrcode = document.getElementById('qrcode');

function generateSubmit(e) {
  e.preventDefault();

  clear();

  const url = document.getElementById('url').value;

  if (url === '') {
    alert('Enter a valid URL');
  } else {
    showLoader();

    setTimeout(() => {
      hideLoader();
      generateQR(url);
    }, 500);

    setTimeout(() => {
      const saveUrl = qrcode.querySelector('img').src;
      createSaveBtn(saveUrl);
    }, 600);
  }
}

// show loader
function showLoader() {
  loader.style.display = 'block';
}

// hide loader
function hideLoader() {
  loader.style.display = 'none';
}

// generate qr
function generateQR(url) {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: 240,
    height: 240,
    colorDark: '#000000',
    colorLight: '#fff',
  });
}

// clear ui before generating qr
function clear() {
  qrcode.innerHTML = '';

  const saveBtn = document.getElementById('save--link');
  if (saveBtn) {
    saveBtn.remove();
  }
}

// create save button
function createSaveBtn(saveUrl) {
  const link = document.createElement('a');

  link.id = 'save--link';
  link.innerHTML = 'save';
  link.href = saveUrl;
  link.download = 'qrcode';

  document.getElementById('generated').appendChild(link);
}

// event listener
form.addEventListener('submit', generateSubmit);
