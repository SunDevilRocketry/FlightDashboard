function initGauges() {
    $('gauge').each((index, element) => {
        let $el = $(element);
        let arc = $el.attr('arc');
        let size = $el.attr('size');
        let thickness = $el.attr('thickness');
        let color = $el.attr('color');
        let data = $el.attr('data');
        let unit = $el.attr('unit');
        let title = $el.attr('title');
        let min = $el.attr('min');
        let max = $el.attr('max');

        let canvas = $("<canvas></canvas>");
        canvas.addClass("gauge");
        canvas.data('arc', arc);
        canvas.data('size', size);
        canvas.data('thickness', thickness);
        canvas.data('color', color);
        canvas.data('data', data);
        canvas.data('unit', unit);
        canvas.data('title', title);
        canvas.data('min', min);
        canvas.data('max', max);

        $el.append(canvas);
    });
}

function _drawGauges(data) {
    data = JSON.parse(data);
    $('canvas.gauge').each((index, element) => {
        let $gauge = $(element);
        let arc = parseFloat($gauge.data('arc'));
        let size = parseFloat($gauge.data('size'));
        let thickness = parseFloat($gauge.data('thickness'));
        let color = $gauge.data('color');
        let dataPoint = $gauge.data('data');
        let unit = $gauge.data('unit');
        let title = $gauge.data('title');

        let min = $gauge.data('min');
        min = min === undefined ? 0 : min;
        let max = $gauge.data('max');
        max = max === undefined ? 100 : max;
        let val = data[dataPoint];

        let ctx = element.getContext("2d");
        let height = element.clientHeight;
        let width = element.clientWidth;
        element.height = height;
        element.width = width;

        ctx.reset();

        ctx.translate(width / 2, height / 2);

        let mindim = Math.min(height, width);
        let radius = (mindim/2)*size;
        let start_angle = 0;
        let end_angle = 2*Math.PI*arc;
        let ir = radius*(1 - thickness);
        let mr = radius*(1 - thickness/2);
        let end_radius = radius*(thickness/2);

        start_angle += (1.5 - arc)*Math.PI;
        end_angle += (1.5 - arc)*Math.PI;

        // gauge fill
        let num_val = val === undefined ? 0 : Math.round(val*10)/10
        let fill_percent = Math.min(Math.max(num_val, min), max) / (max - min);
        let fill_end = start_angle - (start_angle - end_angle)*fill_percent;
        const gradient = ctx.createConicGradient(0.5*Math.PI, 0, 0);
        const start_gradient = (1 - arc)/2;
        const stop_gradient = arc + start_gradient;
        gradient.addColorStop(0, "green");
        gradient.addColorStop(start_gradient, "green")
        gradient.addColorStop(start_gradient + 0.5*arc, "yellow");
        gradient.addColorStop(start_gradient + 0.8*arc, "orange");
        gradient.addColorStop(stop_gradient, "red");
        gradient.addColorStop(1, "red");
        ctx.beginPath();
        ctx.arc(0, 0, radius, start_angle, fill_end);
        ctx.arc(mr*Math.cos(fill_end), mr*Math.sin(fill_end), end_radius, fill_end, fill_end + Math.PI);
        ctx.arc(0, 0, ir, fill_end, start_angle, true);
        ctx.arc(mr*Math.cos(start_angle), mr*Math.sin(start_angle), end_radius, start_angle + Math.PI, start_angle);
        ctx.fillStyle = gradient;
        ctx.fill();

        // gauge outline
        // do outline after fill so outline is consistent width
        ctx.beginPath();
        ctx.arc(0, 0, radius, start_angle, end_angle);
        ctx.arc(mr*Math.cos(end_angle), mr*Math.sin(end_angle), end_radius, end_angle, end_angle + Math.PI);
        ctx.arc(0, 0, ir, end_angle, start_angle, true);
        ctx.arc(mr*Math.cos(start_angle), mr*Math.sin(start_angle), end_radius, start_angle + Math.PI, start_angle);
        ctx.strokeStyle = "black";
        ctx.lineWidth = mindim/100;
        ctx.stroke();

        // write value
        let str_val = val === undefined ? '##' : (Math.round(val*10)/10).toString();
        ctx.fillStyle = "black";
        ctx.font = (mindim/5).toString() + "px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(str_val, 0, mindim/20);

        // write unit
        ctx.font = (mindim/8).toString() + "px sans-serif";
        ctx.fillText(unit, 0, mindim/5);

        // write title
        ctx.font = (mindim/6).toString() + "px sans-serif";
        ctx.fillText(title, 0, mindim/2)
    });
}

function drawGauges() {
    eel.get_gauge_data()((data) => {
        _drawGauges(data);
    });
}
