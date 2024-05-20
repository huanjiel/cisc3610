document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    // background color
    var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#FF4500'); 
    gradient.addColorStop(1, '#FFD700');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // sun
    ctx.beginPath();
    ctx.arc(650, 150, 100, 0, 2 * Math.PI);
    ctx.fillStyle = '#FF8C00';
    ctx.fill();

    function drawMountain(x, y, width, height) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width / 2, y - height);
        ctx.lineTo(x + width, y);
        ctx.closePath();
        ctx.fillStyle = '#A9A9A9';
        ctx.fill();
    }

    drawMountain(0, canvas.height - 100, 300, 200);
    drawMountain(150, canvas.height - 100, 500, 300);
    drawMountain(500, canvas.height - 100, 300, 200);

    function drawCloud(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.arc(x + 30, y - 20, radius, 0, 2 * Math.PI);
        ctx.arc(x + 60, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
    }

    drawCloud(100, 150, 30);
    drawCloud(300, 250, 30);
    drawCloud(500, 150, 30);

    ctx.fillStyle = '#228B22'; 
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

    function drawGrass(x, height) {
        ctx.beginPath();
        ctx.moveTo(x, canvas.height - 150);
        ctx.lineTo(x + 5, canvas.height - 50 - height);
        ctx.lineTo(x - 5, canvas.height - 50 - height);
        ctx.closePath();
        ctx.fillStyle = '#228B22';
        ctx.fill();
    }

    // for loop to draw some grass
    for (var i = 0; i < canvas.width; i += 8) {
        var height = Math.random() * 20 + 10;
        drawGrass(i, height);
    }

    // function to draw some trees
    function drawTree(x, y) {
        // stump
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 10, y, 20, 50);

        // leaf
        ctx.beginPath();
        ctx.moveTo(x - 40, y);
        ctx.lineTo(x + 40, y);
        ctx.lineTo(x, y - 80);
        ctx.closePath();
        ctx.fillStyle = '#006400';
        ctx.fill();
    }

    // for loop to draw some trees
    for (var i = 50; i < canvas.width; i += 100) {
        drawTree(i, canvas.height - 140);
    }

    // tent
    ctx.beginPath();
    ctx.moveTo(250, canvas.height - 50);
    ctx.lineTo(350, canvas.height - 50);
    ctx.lineTo(300, canvas.height - 150);
    ctx.closePath();
    ctx.fillStyle = '#FF6347';
    ctx.fill();

    // tent door
    ctx.beginPath();
    ctx.moveTo(300, canvas.height - 150);
    ctx.lineTo(300, canvas.height - 50);
    ctx.lineTo(275, canvas.height - 50);
    ctx.closePath();
    ctx.fillStyle = '#CD5C5C';
    ctx.fill();

    // write caption
    ctx.font = '30px Sans-Serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Mountain Sunset / Camping', 410, canvas.height - 20);
});
