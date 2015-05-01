$(function() {

    var ball = $("#ball");
    var width = $(window).width();
    var height = $(window).height();
    var x = width / 2 - 75;
    var y = height / 2 - 75;
    var vx = 0;
    var vy = 0;
    var ax = 0;
    var ay = 0;

    var stats   = $("#stats");
    var stas_x  = stats.find("#x");
    var stas_y  = stats.find("#y");
    var stas_vx = stats.find("#vx");
    var stas_vy = stats.find("#vy");
    var stas_ax = stats.find("#ax");
    var stas_ay = stats.find("#ay");

    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(eventData) {
            ax = eventData.gamma;
            ay = eventData.beta;
        }, false);
    } else {
        alert("Device orientation not supported.");
    }

    function updateStats() {
        stas_x.text("x: " + x.toFixed(2));
        stas_y.text("y: " + y.toFixed(2));
        stas_vx.text("vx: " + vx.toFixed(2));
        stas_vy.text("vy: " + vy.toFixed(2));
        stas_ax.text("ax: " + ax.toFixed(2));
        stas_ay.text("ay: " + ay.toFixed(2));
    }

    function moveBall() {
        vx = v(vx, ax);
        vy = v(vy, ay);
        x = x + vx;
        y = y + vy;

        if (x + 75 > width) {
            x = width - 75;
            vx = 0;
        }
        else if (x - 75 < 0) {
            x = 75;
            vx = 0;
        }
        if (y + 75 > height) {
            y = height - 75;
            vy = 0;
        }
        else if (y - 75 < 0) {
            y = 75;
            vy = 0;
        }

        ball.css("left", (x + "px"))
            .css("top", (y + "px"))
            .css("background-color", "rgb(" + intensity(vx) + ", 0, " + intensity(vy) + ")");
    }

    function at(a) {
        return a / FPS;
    }

    function intensity(v) {
        return Math.floor(Math.abs(v)/20.0 * 255);
    }

    function v(velocity, acceleration) {
        var v = velocity + at(acceleration);
        if (v < -20) v = -20;
        if (v > 20) v = 20;
        return v;
    }

    var FPS = 60;

    function tick() {
        moveBall();
        updateStats();
        setTimeout(tick, 1000/FPS);
    }

    tick();
});

