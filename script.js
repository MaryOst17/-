{

}
const fileInput = document.getElementById('image');
const imageUploadCanvas = document.getElementById('image-upload-canvas');
const imageUploadCtx = imageUploadCanvas.getContext('2d');
const textCanvas = document.getElementById('text-canvas');
const textCtx = textCanvas.getContext('2d');
const textCanvasBottom = document.getElementById('text-canvas-bottom');
const textCtxBottom = textCanvasBottom.getContext('2d');

const topContentInput = document.getElementById('top-content');
const bottomContentInput = document.getElementById('bottom-content');

let img = new Image();

fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            img = new Image();
            img.onload = function () {
                drawImageAndText();
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});

topContentInput.addEventListener('input', drawImageAndText);
bottomContentInput.addEventListener('input', drawImageAndText);

function drawImageAndText() {
    imageUploadCtx.clearRect(0, 0, imageUploadCanvas.width, imageUploadCanvas.height);
    textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
    textCtxBottom.clearRect(0, 0, textCanvasBottom.width, textCanvasBottom.height);
    if (img.src) {
        const scale = Math.min(imageUploadCanvas.width / img.width, imageUploadCanvas.height / img.height);
        const x = (imageUploadCanvas.width / 2) - (img.width / 2) * scale;
        const y = (imageUploadCanvas.height / 2) - (img.height / 2) * scale;
        imageUploadCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
    textCtx.font = '30px Montserrat';
    textCtx.fillStyle = 'white';
    textCtx.textAlign = 'center';
    textCtx.fillText(topContentInput.value, textCanvas.width / 2, 50);

    const bottomMargin = 19;
    const textBoxHeight = 30;
    const bottomY = textCanvasBottom.height - bottomMargin;

    textCtxBottom.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Фоновая заливка
    textCtxBottom.fillRect(0, textCanvasBottom.height - textBoxHeight, textCanvasBottom.width, textBoxHeight);

    textCtxBottom.font = '20px Montserrat';
    textCtxBottom.fillStyle = 'white';
    textCtxBottom.textAlign = 'center';
    textCtxBottom.fillText(bottomContentInput.value, textCanvasBottom.width / 2, textCanvasBottom.height - 9);
}
