document.addEventListener("DOMContentLoaded", function() {
    
    var fruit = [
        {name: "Apple", quantity: 20, color: "red"},
        {name: "Orange", quantity: 10, color: "orange"},
        {name: "Banana", quantity: 15, color: "yellow"},
        {name: "Kiwi", quantity: 5, color: "green"},
        {name: "Blueberry", quantity: 5, color: "blue"},
        {name: "Grapes", quantity: 10, color: "purple"}
    ];

    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    var chartWidth = canvas.width;
    var chartHeight = canvas.height;
    var barHeight = (canvas.height / 6);
 
    fruit.forEach((f, index) => {
        var barWidth = f.quantity * canvas.width / 20;
        var y = index * (barHeight);

        ctx.fillStyle = f.color;
        ctx.fillRect(0, y, barWidth, barHeight);

        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        ctx.fillText(f.name, 20, y + barHeight / 2 - 10);
        ctx.fillText(f.quantity, 20, y + barHeight / 2 + 15);
    });
});
