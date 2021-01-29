/*
 * @Date: 2021-01-29 16:58:13
 * @LastEditors: cyf
 * @LastEditTime: 2021-01-29 21:07:15
 * @FilePath: \cyf-cloud.front\src\components\vp\canvasUtil\Canvas.js
 * @Description: What is mind? No matter. What is matter? Nevermind.
 */

CanvasRenderingContext2D.prototype.fillTextCenterX = function( text, x, y ) {
    var ctx = this;
    var metrics = ctx.measureText( text );
    ctx.fillText( text, x - metrics.width / 2, y )
}

CanvasRenderingContext2D.prototype.fillTextCenter = function( text, x, y ) {
    var ctx = this;
    var metrics = ctx.measureText( text );
    var h = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    ctx.fillText( text, x - metrics.width / 2, y + h / 2 )
}

CanvasRenderingContext2D.prototype.fillTextCenterY = function ( text, x, y ) {
    var ctx = this;
    var metrics = ctx.measureText( text );
    var h = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    ctx.fillText( text, x, y + h / 2 )
}

CanvasRenderingContext2D.prototype.getTextWidth = function( text ) {
    var ctx = this;
    var metrics = ctx.measureText( text );
    return metrics.width
}

CanvasRenderingContext2D.prototype.drawLine = function( x, y, x2, y2, lineWidth = 1 ) {
    var ctx = this;
    ctx.lineWidth = lineWidth
    ctx.beginPath();
    ctx.moveTo( x, y );
    ctx.lineTo( x2, y2 );
    ctx.stroke();
}

CanvasRenderingContext2D.prototype.r = function( num ) {
    return num
}

CanvasRenderingContext2D.prototype.fillTextVerticalRaw = function( text, x, y, a = -Math.PI / 2 ) {
    var ctx = this;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate( a );
    ctx.textAlign = text;
    ctx.fillText(text, 0, 0 );
    ctx.restore();
}

/**
* @author zhangxinxu(.com)
* @licence MIT
* @description http://www.zhangxinxu.com/wordpress/?p=7362
*/
CanvasRenderingContext2D.prototype.fillTextVertical = function (text, x, y) {
    var context = this;
    var arrText = text.split('');
    var arrWidth = arrText.map(function (letter) {
        return context.measureText(letter).width;
    });
    var align = context.textAlign;
    var baseline = context.textBaseline;
    if (align == 'left') {
        x = x + Math.max.apply(null, arrWidth) / 2;
    } else if (align == 'right') {
        x = x - Math.max.apply(null, arrWidth) / 2;
    }
    if (baseline == 'bottom' || baseline == 'alphabetic' || baseline == 'ideographic') {
        y = y - arrWidth[0] / 2;
    } else if (baseline == 'top' || baseline == 'hanging') {
        y = y + arrWidth[0] / 2;
    }
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    // 开始逐字绘制
    arrText.forEach(function (letter, index) {
        // 确定下一个字符的纵坐标位置
        var letterWidth = arrWidth[index];
        // 是否需要旋转判断
        var code = letter.charCodeAt(0);
        if (code <= 256) {
            context.translate(x, y);
            // 英文字符，旋转90°
            context.rotate(90 * Math.PI / 180);
            context.translate(-x, -y);
        } else if (index > 0 && text.charCodeAt(index - 1) < 256) {
            // y修正
            y = y + arrWidth[index - 1] / 2;
        }
        context.fillText(letter, x, y);
        // 旋转坐标系还原成初始态
        context.setTransform(1, 0, 0, 1, 0, 0);
        // 确定下一个字符的纵坐标位置
        letterWidth = arrWidth[index];
        y = y + letterWidth;
    });
    // 水平垂直对齐方式还原
    context.textAlign = align;
    context.textBaseline = baseline;
};

function Init() {
    console.log( "cc canvas util")
}

export default {
    Init
}