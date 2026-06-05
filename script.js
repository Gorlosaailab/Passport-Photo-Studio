window.addEventListener('DOMContentLoaded', function () {
    var image = document.getElementById('image');
    var cropper = new Cropper(image, {
        aspectRatio: 3.5 / 4.5, // पासपोर्ट साइज का मानक रेशियो
        viewMode: 1,
    });

    document.getElementById('upload').addEventListener('change', function (e) {
        var files = e.target.files;
        if (files && files.length > 0) {
            var reader = new FileReader();
            reader.onload = function (e) {
                image.src = e.target.result;
                cropper.replace(e.target.result);
            };
            reader.readAsDataURL(files[0]);
        }
    });

    document.getElementById('generateBtn').addEventListener('click', function () {
        var croppedCanvas = cropper.getCroppedCanvas({
            width: 350,
            height: 450,
        });
        
        var sheet = document.getElementById('sheet');
        sheet.innerHTML = ''; // पुराना डेटा साफ करें
        
        // एक शीट पर 12 फोटो बनाने का लूप
        for (let i = 0; i < 12; i++) {
            var imgElement = document.createElement('div');
            imgElement.className = 'sheet-photo';
            var newImg = document.createElement('img');
            newImg.src = croppedCanvas.toDataURL();
            imgElement.appendChild(newImg);
            sheet.appendChild(imgElement);
        }
    });
});

