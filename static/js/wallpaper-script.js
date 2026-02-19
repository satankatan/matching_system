document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('set-wallp1').addEventListener('click', function() {
        document.body.style.backgroundImage = "url('img/Wallpallers.png')";
    });

    document.getElementById('set-wallp2').addEventListener('click', function() {
        document.body.style.backgroundImage = "url('img/Neon City.png')";
    });

    document.getElementById('set-wallp3').addEventListener('click', function() {
        document.body.style.backgroundImage = "url('img/Neon Rays.jpg')";
    });

    document.getElementById('set-wallp4').addEventListener('click', function() {
        document.body.style.backgroundImage = "url('img/Mountains.jpg')";
    });

    document.getElementById('set-wallp5').addEventListener('click', function() {
        document.body.style.backgroundImage = "url('img/Neon Honeycomb.jpg')";
    });

    const uploadInput = document.getElementById('upload');
    const setWallpaperButton = document.getElementById('set-wallp6');

    setWallpaperButton.addEventListener('click', function() {
        uploadInput.click();
    });

    uploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.body.style.backgroundImage = `url('${e.target.result}')`;
            };
            reader.readAsDataURL(file);
        }
    });
});
