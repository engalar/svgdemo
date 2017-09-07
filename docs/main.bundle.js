webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/animated-canvas-logo/animated-canvas-logo.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\r\n  display: block;\r\n}\r\ncanvas {\r\n  display: block;\r\n  margin: 0 auto;\r\n}\r\n\r\n.controls {\r\n  text-align: center;\r\n  margin-bottom: .5em;\r\n\r\n}\r\n.controls.button {\r\n  padding: 1em 2em;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/animated-canvas-logo/animated-canvas-logo.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Canvas Animations</h1>\r\n\r\n<p>When we want to animate things with canvas, we need to draw every frame because of the immediate-mode rendering model. We can do this using <code>requestAnimationFrame()</code>, for which we can set up a loop using component lifecycle hooks.</p>\r\n\r\n<p>Our application data will need to have some notion of time for this to work, e.g. to draw intermediate frames, we need to know about the timing of the animation relative to the time of the current frame: When it was started, when it should end.</p>\r\n\r\n<div class=\"controls\">\r\n  <button (click)=\"toggleSimulation()\">\r\n    {{ running ? 'Stop simulation' : 'Start simulation' }}\r\n  </button>\r\n</div>\r\n\r\n<canvas #canvas width=\"800\" height=\"500\">\r\n</canvas>\r\n"

/***/ }),

/***/ "../../../../../src/app/animated-canvas-logo/animated-canvas-logo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimatedCanvasLogoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_boids__ = __webpack_require__("../../../../boids/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_boids___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_boids__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MAX_AGE = 3000;
var AnimatedCanvasLogoComponent = (function () {
    function AnimatedCanvasLogoComponent(ngZone, elRef, renderer) {
        this.ngZone = ngZone;
        this.elRef = elRef;
        this.renderer = renderer;
        this.flock = __WEBPACK_IMPORTED_MODULE_1_boids___default()({
            boids: 200,
            speedLimit: 4,
            accelerationLimit: 1,
            separationDistance: 60,
            alignmentDistance: 180,
            cohesionDistance: 180,
            separationForce: 0.15,
            alignmentForce: 0.25,
            cohesionForce: 0.1,
            attractors: [[200, 250, 1000, 0.3], [600, 250, 1000, 0.3]]
        });
    }
    AnimatedCanvasLogoComponent.prototype.ngOnInit = function () {
        this.onResize();
        // Make the flock visible by ticking a few times
        for (var i = 0; i < 50; i++) {
            this.flock.tick();
        }
        // Paint once to make things visible
        this.paint(false);
    };
    AnimatedCanvasLogoComponent.prototype.ngOnDestroy = function () {
        this.running = false;
    };
    AnimatedCanvasLogoComponent.prototype.onResize = function () {
        // Make sure canvas width doesn't exceed available width and
        // preserve its aspect ratio.
        var width = Math.min(800, this.elRef.nativeElement.offsetWidth);
        var height = width / 800 * 500;
        this.renderer.setElementStyle(this.canvasRef.nativeElement, 'width', width + "px");
        this.renderer.setElementStyle(this.canvasRef.nativeElement, 'height', height + "px");
    };
    AnimatedCanvasLogoComponent.prototype.toggleSimulation = function () {
        var _this = this;
        this.running = !this.running;
        if (this.running) {
            this.ngZone.runOutsideAngular(function () { return _this.paint(true); });
        }
    };
    AnimatedCanvasLogoComponent.prototype.paint = function (loop) {
        var _this = this;
        if (loop === void 0) { loop = true; }
        // Paint current frame
        var ctx = this.canvasRef.nativeElement.getContext('2d');
        // Background
        ctx.fillStyle = 'rgb(221, 0, 49)';
        ctx.fillRect(0, 0, 800, 500);
        // Advance flock
        this.flock.tick();
        // Draw flock
        ctx.beginPath();
        ctx.fillStyle = "rgb(255,255,255)";
        for (var _i = 0, _a = this.flock.boids; _i < _a.length; _i++) {
            var _b = _a[_i], x = _b[0], y = _b[1], speedX = _b[2], speedY = _b[3];
            var angle = Math.atan2(speedY, speedX) + 0.5 * Math.PI;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.scale(0.4, 0.4);
            this.paintA(ctx);
            ctx.restore();
        }
        ;
        // Schedule next
        if (loop && this.running) {
            requestAnimationFrame(function () { return _this.paint(loop); });
        }
    };
    AnimatedCanvasLogoComponent.prototype.paintA = function (ctx) {
        ctx.beginPath();
        ctx.moveTo(125 - 125, 52.1 - 125);
        ctx.lineTo(66.8 - 125, 182.6 - 125);
        ctx.lineTo(88.5 - 125, 182.6 - 125);
        ctx.lineTo(100.2 - 125, 153.4 - 125);
        ctx.lineTo(149.6 - 125, 153.4 - 125);
        ctx.lineTo(162.6 - 125, 182.6 - 125);
        ctx.lineTo(181.3 - 125, 182.6 - 125);
        ctx.lineTo(125 - 125, 52.1 - 125);
        ctx.moveTo(152 - 125, 135.4 - 125);
        ctx.lineTo(108 - 125, 135.4 - 125);
        ctx.lineTo(125 - 125, 94.5 - 125);
        ctx.lineTo(142 - 125, 135.4 - 125);
        ctx.fill();
    };
    return AnimatedCanvasLogoComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('canvas'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object)
], AnimatedCanvasLogoComponent.prototype, "canvasRef", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* HostListener */])('window:resize'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnimatedCanvasLogoComponent.prototype, "onResize", null);
AnimatedCanvasLogoComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-animated-canvas-logo',
        template: __webpack_require__("../../../../../src/app/animated-canvas-logo/animated-canvas-logo.component.html"),
        styles: [__webpack_require__("../../../../../src/app/animated-canvas-logo/animated-canvas-logo.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* NgZone */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Renderer */]) === "function" && _d || Object])
], AnimatedCanvasLogoComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=animated-canvas-logo.component.js.map

/***/ }),

/***/ "../../../../../src/app/animated-logo-css/animated-logo-css.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@-webkit-keyframes oscillate-enlarge {\r\n  from { -webkit-transform: scale(1); transform: scale(1) }\r\n  to { -webkit-transform: scale(8); transform: scale(8)}\r\n}\r\n\r\n@keyframes oscillate-enlarge {\r\n  from { -webkit-transform: scale(1); transform: scale(1) }\r\n  to { -webkit-transform: scale(8); transform: scale(8)}\r\n}\r\n\r\n@-webkit-keyframes oscillate-reduce {\r\n  from { -webkit-transform: scale(1); transform: scale(1) }\r\n  to { -webkit-transform: scale(0.125); transform: scale(0.125)}\r\n}\r\n\r\n@keyframes oscillate-reduce {\r\n  from { -webkit-transform: scale(1); transform: scale(1) }\r\n  to { -webkit-transform: scale(0.125); transform: scale(0.125)}\r\n}\r\n\r\n.group {\r\n  -webkit-animation: oscillate-enlarge 3s ease-in-out 0s infinite alternate;\r\n          animation: oscillate-enlarge 3s ease-in-out 0s infinite alternate;\r\n  -webkit-transform-origin: 125px 115px;\r\n          transform-origin: 125px 115px;\r\n}\r\n.shield {\r\n  -webkit-animation: oscillate-reduce 3.2s ease-in-out 0s infinite alternate-reverse;\r\n          animation: oscillate-reduce 3.2s ease-in-out 0s infinite alternate-reverse;\r\n  -webkit-transform-origin: 125px 115px;\r\n          transform-origin: 125px 115px;\r\n}\r\n.a {\r\n  -webkit-animation: oscillate-reduce 3.1s ease-in-out 0s infinite alternate;\r\n          animation: oscillate-reduce 3.1s ease-in-out 0s infinite alternate;\r\n  -webkit-transform-origin: 125px 115px;\r\n          transform-origin: 125px 115px;\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/animated-logo-css/animated-logo-css.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>SVG Animated With CSS</h2>\r\n\r\n<p>You can animate basic SVG attributes and transforms with CSS just like you can HTML. But you can only animate those things that are CSS styleable, or so-called <a href=\"https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute#Presentation_attributes\">presentation attributes</a> like strokes, fills. Not regular attributes like x, y, or points.</p>\r\n\r\n<svg xmlns:svg=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 250 250\">\r\n  <svg:g class=\"group\">\r\n    <svg:polygon class=\"shield\" points=\"125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2\" />\r\n    <svg:path class=\"a\" d=\"M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h0h21.7h0L125,52.1L125,52.1L125,52.1L125,52.1\r\n      L125,52.1z M142,135.4H108l17-40.9L142,135.4z\"/>\r\n  </svg:g>\r\n</svg>\r\n\r\n<svg xmlns:svg=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 250 250\">\r\n  <svg:g >\r\n    <svg:polygon  points=\"125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2\" />\r\n    <svg:path [attr.fill]=\"fill\" (mouseenter)=\"mouseenter()\" (mouseleave)=\"mouseleave()\"  d=\"M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h0h21.7h0L125,52.1L125,52.1L125,52.1L125,52.1\r\n      L125,52.1z M142,135.4H108l17-40.9L142,135.4z\"/>\r\n  </svg:g>\r\n</svg>\r\n"

/***/ }),

/***/ "../../../../../src/app/animated-logo-css/animated-logo-css.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimatedLogoCssComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AnimatedLogoCssComponent = (function () {
    function AnimatedLogoCssComponent() {
        this.fill = 'blue';
    }
    AnimatedLogoCssComponent.prototype.mouseenter = function () {
        this.fill = 'red';
        console.log('enter');
    };
    AnimatedLogoCssComponent.prototype.mouseleave = function () {
        this.fill = 'blue';
    };
    return AnimatedLogoCssComponent;
}());
AnimatedLogoCssComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-animated-logo-css',
        template: __webpack_require__("../../../../../src/app/animated-logo-css/animated-logo-css.component.html"),
        styles: [__webpack_require__("../../../../../src/app/logo.css"), __webpack_require__("../../../../../src/app/animated-logo-css/animated-logo-css.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AnimatedLogoCssComponent);

//# sourceMappingURL=animated-logo-css.component.js.map

/***/ }),

/***/ "../../../../../src/app/animated-logo-gsap/animated-logo-gsap.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/animated-logo-gsap/animated-logo-gsap.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>SVG Animated With GSAP</h2>\r\n\r\n<p>With the Greensock library we can unlock a whole number of advanced animation features that aren't available via CSS or Web Animations (which is what ngAnimate uses).</p>\r\n\r\n<p>For example, we can morph shapes, as we do here with the polygon points.</p>\r\n\r\n\r\n<svg xmlns:svg=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 250 250\">\r\n  <svg:polygon #left class=\"left\" points=\"125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2\" />\r\n  <svg:polygon #right class=\"right\" points=\"125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2 125,30\" />\r\n  <svg:path class=\"a\" d=\"M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h0h21.7h0L125,52.1L125,52.1L125,52.1L125,52.1\r\n    L125,52.1z M142,135.4H108l17-40.9L142,135.4z\"/>\r\n</svg>\r\n"

/***/ }),

/***/ "../../../../../src/app/animated-logo-gsap/animated-logo-gsap.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimatedLogoGsapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gsap__ = __webpack_require__("../../../../gsap/TweenMax.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gsap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_gsap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AnimatedLogoGsapComponent = (function () {
    function AnimatedLogoGsapComponent() {
    }
    AnimatedLogoGsapComponent.prototype.ngOnInit = function () {
        __WEBPACK_IMPORTED_MODULE_0_gsap__["TweenMax"].to(this.left.nativeElement, 1, {
            attr: {
                points: '125,30 125,30 125,30 31.9,30 31.9,230 125,230 125,230 125,230 203.9,186.3 218.1,63.2'
            },
            repeat: -1,
            yoyo: true,
            ease: __WEBPACK_IMPORTED_MODULE_0_gsap__["Cubic"].easeInOut
        });
        __WEBPACK_IMPORTED_MODULE_0_gsap__["TweenMax"].to(this.right.nativeElement, 1, {
            attr: {
                points: '125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 218.1,230 218.1,30 125,30'
            },
            repeat: -1,
            yoyo: true,
            ease: __WEBPACK_IMPORTED_MODULE_0_gsap__["Cubic"].easeInOut
        });
    };
    return AnimatedLogoGsapComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_17" /* ViewChild */])('left'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ElementRef */]) === "function" && _a || Object)
], AnimatedLogoGsapComponent.prototype, "left", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_17" /* ViewChild */])('right'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ElementRef */]) === "function" && _b || Object)
], AnimatedLogoGsapComponent.prototype, "right", void 0);
AnimatedLogoGsapComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["o" /* Component */])({
        selector: 'app-animated-logo-gsap',
        template: __webpack_require__("../../../../../src/app/animated-logo-gsap/animated-logo-gsap.component.html"),
        styles: [__webpack_require__("../../../../../src/app/logo.css"), __webpack_require__("../../../../../src/app/animated-logo-gsap/animated-logo-gsap.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AnimatedLogoGsapComponent);

var _a, _b;
//# sourceMappingURL=animated-logo-gsap.component.js.map

/***/ }),

/***/ "../../../../../src/app/animated-logo-nganimate/animated-logo-nganimate.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".a {\r\n  cursor: pointer;\r\n  -webkit-transform-origin: 125px 115px;\r\n          transform-origin: 125px 115px;\r\n\r\n  &:hover {\r\n    fill: #f3f3f3;\r\n  }\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/animated-logo-nganimate/animated-logo-nganimate.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>SVG Animated With NgAnimate</h2>\r\n\r\n<p>ngAnimate is implemented on top of the Web Animations API, which itself is designed to work with SVG (it is, in fact, designed to unify HTML/CSS animations with the deprected SMIL standard). This means we can use ngAnimate with SVG without any special preparations.</p>\r\n\r\n<p>With ngAnimate it is easier to connect animations to what's going on in the application: Events, state changes, etc.</p>\r\n\r\n<p>Here we have an animation attached to a state, which is changed by clicking the 'a'.</p>\r\n\r\n<svg xmlns:svg=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 250 250\">\r\n  <svg:polygon class=\"left\" points=\"125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2\" />\r\n  <svg:polygon class=\"right\" points=\"125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2 125,30\" />\r\n  <svg:path class=\"a\"\r\n        (click)=\"toggleAState()\"\r\n        (mouseout)=\"mouseouthandle()\"\r\n        (mouseenter)=\"mouseenterhandle()\"\r\n        [@aState]=\"aState\"\r\n        d=\"M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h0h21.7h0L125,52.1L125,52.1L125,52.1L125,52.1\r\n    L125,52.1z M142,135.4H108l17-40.9L142,135.4z\"/>\r\n</svg>\r\n"

/***/ }),

/***/ "../../../../../src/app/animated-logo-nganimate/animated-logo-nganimate.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimatedLogoNganimateComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AnimatedLogoNganimateComponent = (function () {
    function AnimatedLogoNganimateComponent() {
        this.aState = 'small';
    }
    AnimatedLogoNganimateComponent.prototype.toggleAState = function () {
        this.aState = this.aState === 'small' ? 'large' : 'small';
    };
    AnimatedLogoNganimateComponent.prototype.mouseouthandle = function () {
        this.aState = 'small';
        console.log('out');
    };
    AnimatedLogoNganimateComponent.prototype.mouseenterhandle = function () {
        this.aState = 'over';
        console.log('enter');
    };
    return AnimatedLogoNganimateComponent;
}());
AnimatedLogoNganimateComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-animated-logo-nganimate',
        template: __webpack_require__("../../../../../src/app/animated-logo-nganimate/animated-logo-nganimate.component.html"),
        styles: [__webpack_require__("../../../../../src/app/logo.css"), __webpack_require__("../../../../../src/app/animated-logo-nganimate/animated-logo-nganimate.component.css")],
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_37" /* trigger */])('aState', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* state */])('small', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ transform: 'scale(1)' })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* state */])('large', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ transform: 'scale(4.2)' })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* state */])('over', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ fill: 'red' })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_36" /* transition */])('* => over', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* animate */])('5s ease', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* keyframes */])([
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ fill: 'blue', offset: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ fill: 'green', offset: 0.3 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ fill: 'red', offset: 0.6 }),
                ]))),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_36" /* transition */])('over => *', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* animate */])('5s ease', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* keyframes */])([
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ fill: 'red', offset: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ fill: 'green', offset: 0.3 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ fill: 'white', offset: 0.6 }),
                ]))),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_36" /* transition */])('small => large', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* animate */])('1s ease', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* keyframes */])([
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ transform: 'scale(1)', offset: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ transform: 'scale(0.7) rotate(15deg)', offset: 0.15 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ transform: 'scale(1)', offset: 0.3 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ transform: 'scale(4.2)', offset: 1 })
                ]))),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_36" /* transition */])('large => small', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* animate */])('1s ease', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* keyframes */])([
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ transform: 'scale(4.2)', offset: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ transform: 'scale(5) rotate(-15deg)', offset: 0.15 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ transform: 'scale(4.2)', offset: 0.3 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ transform: 'scale(1)', offset: 1 })
                ])))
            ])
        ]
    })
], AnimatedLogoNganimateComponent);

//# sourceMappingURL=animated-logo-nganimate.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animated_canvas_logo_animated_canvas_logo_component__ = __webpack_require__("../../../../../src/app/animated-canvas-logo/animated-canvas-logo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animated_logo_css_animated_logo_css_component__ = __webpack_require__("../../../../../src/app/animated-logo-css/animated-logo-css.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__animated_logo_nganimate_animated_logo_nganimate_component__ = __webpack_require__("../../../../../src/app/animated-logo-nganimate/animated-logo-nganimate.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__animated_logo_gsap_animated_logo_gsap_component__ = __webpack_require__("../../../../../src/app/animated-logo-gsap/animated-logo-gsap.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__basic_canvas_logo_basic_canvas_logo_component__ = __webpack_require__("../../../../../src/app/basic-canvas-logo/basic-canvas-logo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__basic_logo_basic_logo_component__ = __webpack_require__("../../../../../src/app/basic-logo/basic-logo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__logo_with_bindings_logo_with_bindings_component__ = __webpack_require__("../../../../../src/app/logo-with-bindings/logo-with-bindings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__rectangle_rectangle_component__ = __webpack_require__("../../../../../src/app/rectangle/rectangle.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__checkbox_checkbox_component__ = __webpack_require__("../../../../../src/app/checkbox/checkbox.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var routes = [
    { path: 'svgdemo/svg/basic', component: __WEBPACK_IMPORTED_MODULE_7__basic_logo_basic_logo_component__["a" /* BasicLogoComponent */] },
    { path: 'svgdemo/svg/bindings', component: __WEBPACK_IMPORTED_MODULE_8__logo_with_bindings_logo_with_bindings_component__["a" /* LogoWithBindingsComponent */] },
    { path: 'svgdemo/svg/css-animation', component: __WEBPACK_IMPORTED_MODULE_3__animated_logo_css_animated_logo_css_component__["a" /* AnimatedLogoCssComponent */] },
    { path: 'svgdemo/svg/ng-animation', component: __WEBPACK_IMPORTED_MODULE_4__animated_logo_nganimate_animated_logo_nganimate_component__["a" /* AnimatedLogoNganimateComponent */] },
    { path: 'svgdemo/svg/gsap-animation', component: __WEBPACK_IMPORTED_MODULE_5__animated_logo_gsap_animated_logo_gsap_component__["a" /* AnimatedLogoGsapComponent */] },
    { path: 'svgdemo/canvas/basic', component: __WEBPACK_IMPORTED_MODULE_6__basic_canvas_logo_basic_canvas_logo_component__["a" /* BasicCanvasLogoComponent */] },
    { path: 'svgdemo/canvas/animated', component: __WEBPACK_IMPORTED_MODULE_2__animated_canvas_logo_animated_canvas_logo_component__["a" /* AnimatedCanvasLogoComponent */] },
    { path: 'svgdemo/engalar/drawroi', component: __WEBPACK_IMPORTED_MODULE_9__rectangle_rectangle_component__["a" /* RectangleComponent */] },
    { path: 'svgdemo/engalar/UI', component: __WEBPACK_IMPORTED_MODULE_10__checkbox_checkbox_component__["a" /* CheckboxComponent */] },
    // {path: '', redirectTo: 'engalar/drawroi', pathMatch: 'full'},
    { path: '', redirectTo: 'svgdemo/svg/components', pathMatch: 'full' },
    { path: 'svgdemo', redirectTo: 'svgdemo/svg/components', pathMatch: 'full' },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]
        ]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<ul class=\"nav\">\n  <li class=\"nav-item\">\n    <a routerLink=\"svgdemo/svg/components\" class=\"nav-link active\" href=\"#\">Cascad render</a>\n  </li>\n  <li class=\"nav-item\">\n    <a routerLink=\"svgdemo/engalar/drawroi\" class=\"nav-link\" href=\"#\">Draw Roi</a>\n  </li>\n  <li class=\"nav-item\">\n    <a routerLink=\"svgdemo/engalar/UI\" class=\"nav-link\" href=\"#\">UI</a>\n  </li>\n</ul>\n<div class=\"container\">\n  <router-outlet>\n  </router-outlet>\n</div>\n<app-profile></app-profile>\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export provideClient */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_apollo_client__ = __webpack_require__("../../../../apollo-client/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_apollo_angular__ = __webpack_require__("../../../../apollo-angular/build/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_animated_canvas_logo_animated_canvas_logo_component__ = __webpack_require__("../../../../../src/app/animated-canvas-logo/animated-canvas-logo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_basic_logo_basic_logo_component__ = __webpack_require__("../../../../../src/app/basic-logo/basic-logo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_logo_with_bindings_logo_with_bindings_component__ = __webpack_require__("../../../../../src/app/logo-with-bindings/logo-with-bindings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_animated_logo_css_animated_logo_css_component__ = __webpack_require__("../../../../../src/app/animated-logo-css/animated-logo-css.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_animated_logo_gsap_animated_logo_gsap_component__ = __webpack_require__("../../../../../src/app/animated-logo-gsap/animated-logo-gsap.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_basic_canvas_logo_basic_canvas_logo_component__ = __webpack_require__("../../../../../src/app/basic-canvas-logo/basic-canvas-logo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_animated_logo_nganimate_animated_logo_nganimate_component__ = __webpack_require__("../../../../../src/app/animated-logo-nganimate/animated-logo-nganimate.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_app_changing_canvas_logo_changing_canvas_logo_module__ = __webpack_require__("../../../../../src/app/changing-canvas-logo/changing-canvas-logo.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_logo_with_components_logo_with_components_module__ = __webpack_require__("../../../../../src/app/logo-with-components/logo-with-components.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__rectangle_rectangle_component__ = __webpack_require__("../../../../../src/app/rectangle/rectangle.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__profile_profile_component__ = __webpack_require__("../../../../../src/app/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular4_drag_drop__ = __webpack_require__("../../../../angular4-drag-drop/angular4-drag-drop.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__checkbox_checkbox_component__ = __webpack_require__("../../../../../src/app/checkbox/checkbox.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























// by default, this client will send queries to `/graphql` (relative to the URL of your app)
var client = new __WEBPACK_IMPORTED_MODULE_3_apollo_client__["a" /* ApolloClient */]({
    networkInterface: Object(__WEBPACK_IMPORTED_MODULE_3_apollo_client__["b" /* createNetworkInterface */])({
        uri: 'http://localhost:9977/graphql'
    }),
});
function provideClient() {
    return client;
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_8_app_basic_logo_basic_logo_component__["a" /* BasicLogoComponent */],
            __WEBPACK_IMPORTED_MODULE_9_app_logo_with_bindings_logo_with_bindings_component__["a" /* LogoWithBindingsComponent */],
            __WEBPACK_IMPORTED_MODULE_10_app_animated_logo_css_animated_logo_css_component__["a" /* AnimatedLogoCssComponent */],
            __WEBPACK_IMPORTED_MODULE_13_app_animated_logo_nganimate_animated_logo_nganimate_component__["a" /* AnimatedLogoNganimateComponent */],
            __WEBPACK_IMPORTED_MODULE_11_app_animated_logo_gsap_animated_logo_gsap_component__["a" /* AnimatedLogoGsapComponent */],
            __WEBPACK_IMPORTED_MODULE_12_app_basic_canvas_logo_basic_canvas_logo_component__["a" /* BasicCanvasLogoComponent */],
            __WEBPACK_IMPORTED_MODULE_7_app_animated_canvas_logo_animated_canvas_logo_component__["a" /* AnimatedCanvasLogoComponent */],
            __WEBPACK_IMPORTED_MODULE_16__rectangle_rectangle_component__["a" /* RectangleComponent */],
            __WEBPACK_IMPORTED_MODULE_17__profile_profile_component__["a" /* ProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_21__checkbox_checkbox_component__["a" /* CheckboxComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_6_app_app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_15_app_logo_with_components_logo_with_components_module__["a" /* LogoWithComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_14_app_changing_canvas_logo_changing_canvas_logo_module__["a" /* ChangingCanvasLogoModule */],
            __WEBPACK_IMPORTED_MODULE_4_apollo_angular__["b" /* ApolloModule */].forRoot(provideClient),
            __WEBPACK_IMPORTED_MODULE_18_angular4_drag_drop__["a" /* DragDropDirectiveModule */],
            __WEBPACK_IMPORTED_MODULE_19__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_22__angular_forms__["c" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_20__angular_material__["a" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_20__angular_material__["b" /* MdCheckboxModule */],
            __WEBPACK_IMPORTED_MODULE_20__angular_material__["d" /* MdSnackBarModule */],
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/basic-canvas-logo/basic-canvas-logo.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "canvas {\r\n  width: 500px;\r\n  height: 500px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/basic-canvas-logo/basic-canvas-logo.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>Basic Canvas Drawing</h2>\r\n\r\n<p>We can make a canvas, inject it to our component class as a <code>@ViewChild</code>, and then draw on it using the native canvas API.</p>\r\n\r\n\r\n<canvas #canvas width=\"500\" height=\"500\">\r\n</canvas>\r\n"

/***/ }),

/***/ "../../../../../src/app/basic-canvas-logo/basic-canvas-logo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasicCanvasLogoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BasicCanvasLogoComponent = (function () {
    function BasicCanvasLogoComponent() {
    }
    BasicCanvasLogoComponent.prototype.ngOnInit = function () {
        var ctx = this.canvasRef.nativeElement.getContext('2d');
        // Draw the clip path that will mask everything else
        // that we'll draw later.
        ctx.beginPath();
        ctx.moveTo(250, 60);
        ctx.lineTo(63.8, 126.4);
        ctx.lineTo(92.2, 372.6);
        ctx.lineTo(250, 460);
        ctx.lineTo(407.8, 372.6);
        ctx.lineTo(436.2, 126.4);
        ctx.moveTo(250, 104.2);
        ctx.lineTo(133.6, 365.2);
        ctx.lineTo(177, 365.2);
        ctx.lineTo(200.4, 306.8);
        ctx.lineTo(299.2, 306.8);
        ctx.lineTo(325.2, 365.2);
        ctx.lineTo(362.6, 365.2);
        ctx.lineTo(250, 104.2);
        ctx.moveTo(304, 270.8);
        ctx.lineTo(216, 270.8);
        ctx.lineTo(250, 189);
        ctx.lineTo(284, 270.8);
        ctx.clip('evenodd');
        // Draw 50,000 circles at random points
        ctx.beginPath();
        ctx.fillStyle = '#DD0031';
        for (var i = 0; i < 50000; i++) {
            var x = Math.random() * 500;
            var y = Math.random() * 500;
            ctx.moveTo(x, y);
            ctx.arc(x, y, 1, 0, Math.PI * 2);
        }
        ctx.fill();
    };
    return BasicCanvasLogoComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('canvas'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object)
], BasicCanvasLogoComponent.prototype, "canvasRef", void 0);
BasicCanvasLogoComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-basic-canvas-logo',
        template: __webpack_require__("../../../../../src/app/basic-canvas-logo/basic-canvas-logo.component.html"),
        styles: [__webpack_require__("../../../../../src/app/basic-canvas-logo/basic-canvas-logo.component.css")]
    }),
    __metadata("design:paramtypes", [])
], BasicCanvasLogoComponent);

var _a;
//# sourceMappingURL=basic-canvas-logo.component.js.map

/***/ }),

/***/ "../../../../../src/app/basic-logo/basic-logo.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/basic-logo/basic-logo.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>Basic SVG support</h2>\r\n\r\n<p>You can just put an <code>&lt;svg&gt;</code> tag in a component and go to town. You can also style the SVG stuff using component styles.</p>\r\n\r\n<svg  xmlns:svg=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 250 250\">\r\n  <svg:polygon class=\"left\" points=\"125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2\" />\r\n  <svg:polygon class=\"right\" points=\"125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2 125,30\" />\r\n  <svg:path class=\"a\" d=\"M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h0h21.7h0L125,52.1L125,52.1L125,52.1L125,52.1\r\n      L125,52.1z M142,135.4H108l17-40.9L142,135.4z\"/>\r\n</svg>\r\n"

/***/ }),

/***/ "../../../../../src/app/basic-logo/basic-logo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasicLogoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var BasicLogoComponent = (function () {
    function BasicLogoComponent() {
    }
    return BasicLogoComponent;
}());
BasicLogoComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-basic-logo',
        template: __webpack_require__("../../../../../src/app/basic-logo/basic-logo.component.html"),
        styles: [__webpack_require__("../../../../../src/app/logo.css"), __webpack_require__("../../../../../src/app/basic-logo/basic-logo.component.css")]
    })
], BasicLogoComponent);

//# sourceMappingURL=basic-logo.component.js.map

/***/ }),

/***/ "../../../../../src/app/changing-canvas-logo/canvas-logo.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "canvas {\r\n  display: block;\r\n  width: 500px;\r\n  height: 500px;\r\n  margin: 0 auto;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/changing-canvas-logo/canvas-logo.component.html":
/***/ (function(module, exports) {

module.exports = "<canvas #canvas width=\"500\" height=\"500\">\r\n</canvas>\r\n"

/***/ }),

/***/ "../../../../../src/app/changing-canvas-logo/canvas-logo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CanvasLogoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CanvasLogoComponent = (function () {
    function CanvasLogoComponent() {
    }
    CanvasLogoComponent.prototype.ngOnChanges = function () {
        var ctx = this.canvasRef.nativeElement.getContext('2d');
        // Clear any previous content.
        ctx.clearRect(0, 0, 500, 500);
        // Draw the clip path that will mask everything else
        // that we'll draw later.
        ctx.beginPath();
        ctx.moveTo(250, 60);
        ctx.lineTo(63.8, 126.4);
        ctx.lineTo(92.2, 372.6);
        ctx.lineTo(250, 460);
        ctx.lineTo(407.8, 372.6);
        ctx.lineTo(436.2, 126.4);
        ctx.moveTo(250, 104.2);
        ctx.lineTo(133.6, 365.2);
        ctx.lineTo(177, 365.2);
        ctx.lineTo(200.4, 306.8);
        ctx.lineTo(299.2, 306.8);
        ctx.lineTo(325.2, 365.2);
        ctx.lineTo(362.6, 365.2);
        ctx.lineTo(250, 104.2);
        ctx.moveTo(304, 270.8);
        ctx.lineTo(216, 270.8);
        ctx.lineTo(250, 189);
        ctx.lineTo(284, 270.8);
        ctx.clip('evenodd');
        // Draw the points given as input
        ctx.beginPath();
        ctx.fillStyle = '#DD0031';
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var _b = _a[_i], x = _b.x, y = _b.y;
            ctx.moveTo(x, y);
            ctx.rect(x, y, 1, 1);
        }
        ctx.fill();
    };
    return CanvasLogoComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Array)
], CanvasLogoComponent.prototype, "particles", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('canvas'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object)
], CanvasLogoComponent.prototype, "canvasRef", void 0);
CanvasLogoComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-canvas-logo',
        template: __webpack_require__("../../../../../src/app/changing-canvas-logo/canvas-logo.component.html"),
        styles: [__webpack_require__("../../../../../src/app/changing-canvas-logo/canvas-logo.component.css")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectionStrategy */].OnPush
    })
], CanvasLogoComponent);

var _a;
//# sourceMappingURL=canvas-logo.component.js.map

/***/ }),

/***/ "../../../../../src/app/changing-canvas-logo/changing-canvas-logo.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".controls {\r\n  text-align: center;\r\n  button {\r\n    padding: 1em 2em;\r\n  }\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/changing-canvas-logo/changing-canvas-logo.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>Drawing Changing Data</h2>\r\n\r\n<p>Often the data you want to put on a canvas changes over time. In that case you need to redraw every time it changes.</p>\r\n<p>One good approach is to rely on the <code>OnChanges</code> lifecycle hook. It'll be called when the component inputs change and you can redraw based on that. Note that you'll need to use an immutable convention for the data for the <code>onChanges</code> hook to activate.</p>\r\n<div class=\"controls\">\r\n  <button (click)=\"toggleChanging()\">\r\n    {{ isChanging() ? 'Stop Changes' : 'Start Changes' }}\r\n  </button>\r\n</div>\r\n<app-canvas-logo [particles]=particles>\r\n</app-canvas-logo>\r\n"

/***/ }),

/***/ "../../../../../src/app/changing-canvas-logo/changing-canvas-logo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangingCanvasLogoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ChangingCanvasLogoComponent = (function () {
    function ChangingCanvasLogoComponent() {
        this.particles = [];
    }
    ChangingCanvasLogoComponent.prototype.ngOnInit = function () {
        this.updateParticles();
    };
    ChangingCanvasLogoComponent.prototype.ngOnDestroy = function () {
        if (this.isChanging()) {
            clearInterval(this.intervalId);
        }
    };
    ChangingCanvasLogoComponent.prototype.isChanging = function () {
        return !!this.intervalId;
    };
    ChangingCanvasLogoComponent.prototype.toggleChanging = function () {
        var _this = this;
        if (this.isChanging()) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        else {
            this.intervalId = setInterval(function () { return _this.updateParticles(); }, 100);
        }
    };
    ChangingCanvasLogoComponent.prototype.updateParticles = function () {
        this.particles = [];
        for (var i = 0; i < 50000; i++) {
            this.particles.push({
                x: Math.random() * 500,
                y: Math.random() * 500
            });
        }
    };
    return ChangingCanvasLogoComponent;
}());
ChangingCanvasLogoComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-changing-canvas-logo',
        template: __webpack_require__("../../../../../src/app/changing-canvas-logo/changing-canvas-logo.component.html"),
        styles: [__webpack_require__("../../../../../src/app/changing-canvas-logo/changing-canvas-logo.component.css")]
    })
], ChangingCanvasLogoComponent);

//# sourceMappingURL=changing-canvas-logo.component.js.map

/***/ }),

/***/ "../../../../../src/app/changing-canvas-logo/changing-canvas-logo.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangingCanvasLogoModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__changing_canvas_logo_component__ = __webpack_require__("../../../../../src/app/changing-canvas-logo/changing-canvas-logo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__canvas_logo_component__ = __webpack_require__("../../../../../src/app/changing-canvas-logo/canvas-logo.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    { path: 'canvas/changes', component: __WEBPACK_IMPORTED_MODULE_3__changing_canvas_logo_component__["a" /* ChangingCanvasLogoComponent */] }
];
var ChangingCanvasLogoModule = (function () {
    function ChangingCanvasLogoModule() {
    }
    return ChangingCanvasLogoModule;
}());
ChangingCanvasLogoModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forChild(routes)
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__changing_canvas_logo_component__["a" /* ChangingCanvasLogoComponent */],
            __WEBPACK_IMPORTED_MODULE_4__canvas_logo_component__["a" /* CanvasLogoComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__changing_canvas_logo_component__["a" /* ChangingCanvasLogoComponent */]
        ],
        providers: []
    })
], ChangingCanvasLogoModule);

//# sourceMappingURL=changing-canvas-logo.module.js.map

/***/ }),

/***/ "../../../../../src/app/checkbox/checkbox.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/checkbox/checkbox.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"example-section\">\n  <md-checkbox class=\"example-margin\" [(ngModel)]=\"checked\">Checked</md-checkbox>\n  <md-checkbox class=\"example-margin\" [(ngModel)]=\"indeterminate\">Indeterminate</md-checkbox>\n  <md-button-toggle>click me</md-button-toggle>\n  <md-radio-button></md-radio-button>\n\n  <h3>Basic Buttons</h3>\n  <div class=\"button-row\">\n    <button md-button>Basic</button>\n    <button md-button color=\"primary\">Primary</button>\n    <button md-button color=\"accent\">Accent</button>\n    <button md-button color=\"warn\">Warn</button>\n    <button md-button disabled>Disabled</button>\n    <a md-button routerLink=\".\">Link</a>\n  </div>\n\n  <h3>Raised Buttons</h3>\n  <div class=\"button-row\">\n    <button md-raised-button>Basic</button>\n    <button md-raised-button color=\"primary\">Primary</button>\n    <button md-raised-button color=\"accent\">Accent</button>\n    <button md-raised-button color=\"warn\">Warn</button>\n    <button md-raised-button disabled>Disabled</button>\n    <a md-raised-button routerLink=\".\">Link</a>\n  </div>\n\n  <h3>Icon Buttons</h3>\n  <div class=\"button-row\">\n    <button md-icon-button>\n      <md-icon class=\"md-24\" aria-label=\"Example icon-button with a heart icon\">favorite</md-icon>\n    </button>\n    <button md-icon-button color=\"primary\">\n      <md-icon class=\"md-24\" aria-label=\"Example icon-button with a heart icon\">favorite</md-icon>\n    </button>\n    <button md-icon-button color=\"accent\">\n      <md-icon class=\"md-24\" aria-label=\"Example icon-button with a heart icon\">favorite</md-icon>\n    </button>\n    <button md-icon-button color=\"warn\">\n      <md-icon class=\"md-24\" aria-label=\"Example icon-button with a heart icon\">favorite</md-icon>\n    </button>\n    <button md-icon-button disabled>\n      <md-icon class=\"md-24\" aria-label=\"Example icon-button with a heart icon\">favorite</md-icon>\n    </button>\n  </div>\n\n  <h3>Fab Buttons</h3>\n  <div class=\"button-row\">\n    <button md-fab>Basic</button>\n    <button md-fab color=\"primary\">Primary</button>\n    <button md-fab color=\"accent\">Accent</button>\n    <button md-fab color=\"warn\">Warn</button>\n    <button md-fab disabled>Disabled</button>\n    <button md-fab>\n      <md-icon class=\"md-24\" aria-label=\"Example icon-button with a heart icon\">favorite</md-icon>\n    </button>\n    <a md-fab routerLink=\".\">Link</a>\n  </div>\n\n  <h3>Mini Fab Buttons</h3>\n  <div class=\"button-row\">\n    <button md-mini-fab>Basic</button>\n    <button md-mini-fab color=\"primary\">Primary</button>\n    <button md-mini-fab color=\"accent\">Accent</button>\n    <button md-mini-fab color=\"warn\">Warn</button>\n    <button md-mini-fab disabled>Disabled</button>\n    <button md-mini-fab>\n      <md-icon class=\"md-24\" aria-label=\"Example icon-button with a heart icon\">favorite</md-icon>\n    </button>\n    <a md-mini-fab routerLink=\".\">Link</a>\n  </div>\n\n\n  <button md-button (click)=\"openSnackBar()\" aria-label=\"Show an example snack-bar\">\n    Pizza party\n  </button>\n</section>\n"

/***/ }),

/***/ "../../../../../src/app/checkbox/checkbox.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckboxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CheckboxComponent = (function () {
    function CheckboxComponent(snackBar) {
        this.snackBar = snackBar;
        this.checked = false;
        this._indeterminate = false;
        this.align = 'start';
        this.disabled = false;
    }
    Object.defineProperty(CheckboxComponent.prototype, "indeterminate", {
        get: function () {
            return this._indeterminate;
        },
        set: function (value) {
            this._indeterminate = value;
        },
        enumerable: true,
        configurable: true
    });
    CheckboxComponent.prototype.ngOnInit = function () {
    };
    CheckboxComponent.prototype.openSnackBar = function () {
        this.snackBar.open('🍕🍕🍕🍕🍕 Pizza party!!! 🍕🍕🍕🍕🍕', null, {
            duration: 500,
        });
    };
    return CheckboxComponent;
}());
CheckboxComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-checkbox',
        template: __webpack_require__("../../../../../src/app/checkbox/checkbox.component.html"),
        styles: [__webpack_require__("../../../../../src/app/checkbox/checkbox.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdSnackBar */]) === "function" && _a || Object])
], CheckboxComponent);

var _a;
//# sourceMappingURL=checkbox.component.js.map

/***/ }),

/***/ "../../../../../src/app/logo-with-bindings/logo-with-bindings.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "svg {\r\n  width: 250px;\r\n  height: 250px;\r\n}\r\n\r\n// There are Firefox issues if anything but the base SVG element\r\n// reacts to mouse events.\r\ncircle, polygon, path {\r\n  pointer-events: none;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/logo-with-bindings/logo-with-bindings.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>SVG Data & Event Binding</h2>\r\n\r\n<p>You can use regular <code>[dataBinding]</code> syntax with SVG elements, but since SVG attributes generally aren't present in DOM nodes as writable properties, you need to use the <code>attr.</code> prefix to set them: <code>[attr.path]</code>.\r\n\r\n<p>Event handlers work as you'd expect with <code>(event)</code></p>\r\n\r\n<svg xmlns:svg=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 250 250\"\r\n     (mousemove)=\"setCircleLocation($event)\">\r\n  <svg:defs>\r\n    <svg:clipPath id=\"clip\">\r\n      <svg:circle [attr.cx]=\"circle[0]\" [attr.cy]=\"circle[1]\" r=\"100\" />\r\n    </svg:clipPath>\r\n  </svg:defs>\r\n  <svg:g clip-path=\"url(#clip)\">\r\n    <svg:polygon class=\"left\" points=\"125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2\" />\r\n    <svg:polygon class=\"right\" points=\"125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2 125,30\" />\r\n    <svg:path class=\"a\" d=\"M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h0h21.7h0L125,52.1L125,52.1L125,52.1L125,52.1\r\n      L125,52.1z M142,135.4H108l17-40.9L142,135.4z\"/>\r\n  </svg:g>\r\n</svg>\r\n"

/***/ }),

/***/ "../../../../../src/app/logo-with-bindings/logo-with-bindings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoWithBindingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LogoWithBindingsComponent = (function () {
    function LogoWithBindingsComponent() {
        this.circle = [0, 0];
    }
    LogoWithBindingsComponent.prototype.setCircleLocation = function (evt) {
        this.circle = [evt.offsetX, evt.offsetY];
    };
    return LogoWithBindingsComponent;
}());
LogoWithBindingsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-logo-with-bindings',
        template: __webpack_require__("../../../../../src/app/logo-with-bindings/logo-with-bindings.component.html"),
        styles: [__webpack_require__("../../../../../src/app/logo.css"), __webpack_require__("../../../../../src/app/logo-with-bindings/logo-with-bindings.component.css")]
    })
], LogoWithBindingsComponent);

//# sourceMappingURL=logo-with-bindings.component.js.map

/***/ }),

/***/ "../../../../../src/app/logo-with-components/logo-a.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoAComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__svg_service_service__ = __webpack_require__("../../../../../src/app/svg-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LogoAComponent = (function () {
    function LogoAComponent() {
        this.hc = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    // constructor(private changeDetectorRef: ChangeDetectorRef) {
    // }
    // @ViewChild('rect')
    // set rect(value: ElementRef) {
    //   if (value) {
    //     value.nativeElement['BoxComponent'] = this;
    //   }
    // }
    // ngAfterViewInit() {
    //   this.changeDetectorRef.detach();
    // }
    // update() {
    //   this.changeDetectorRef.detectChanges();
    // }
    LogoAComponent.prototype.mouseover = function (event) {
        this.select.emit(this.svg);
        this.hc = true;
        console.log(this.svg, 'logo-a');
    };
    LogoAComponent.prototype.mouseout = function (event) {
        this.select.emit(null);
        this.hc = false;
    };
    return LogoAComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__svg_service_service__["a" /* Svg */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__svg_service_service__["a" /* Svg */]) === "function" && _a || Object)
], LogoAComponent.prototype, "svg", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]) === "function" && _b || Object)
], LogoAComponent.prototype, "select", void 0);
LogoAComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: '[box]',
        template: "\n    <svg:polygon *ngIf=\"svg.type==='polygon'\" #rect [attr.dataId]=\"svg.id\"\n                 [attr.stroke]=\"svg.fill\" [attr.points]=\"svg.points\"\n                 [ngClass]=\"{'left-over':hc,'left-out':!hc}\"\n                 (mouseover)=\"mouseover($event)\"\n                 (mouseout)=\"mouseout($event)\"\n    />\n    <svg:path *ngIf=\"svg.type==='path'\" #rect [attr.dataId]=\"svg.id\"\n                 [attr.stroke]=\"svg.fill\" [attr.d]=\"svg.points\"\n                 [ngClass]=\"{'left-over':hc,'left-out':!hc}\"\n                 (mouseover)=\"mouseover($event)\"\n                 (mouseout)=\"mouseout($event)\"\n    />\n  ",
        styles: [__webpack_require__("../../../../../src/app/logo.css")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectionStrategy */].OnPush
    })
], LogoAComponent);

var _a, _b;
//# sourceMappingURL=logo-a.component.js.map

/***/ }),

/***/ "../../../../../src/app/logo-with-components/logo-with-components.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/logo-with-components/logo-with-components.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-md-5\" style=\"position: relative\">\r\n\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.0\" viewBox=\"0 0 8014.99998211861 8065.000060796734\" style=\"position: absolute\"><rect id=\"backgroundrect\" width=\"100%\" height=\"100%\" x=\"0\" y=\"0\" fill=\"none\" stroke=\"none\"/>\r\n\r\n      <g class=\"currentLayer\" style=\"\"><title>Layer 1</title><path d=\"M2880.442858824963,7644.118849018459 c-23.84760242027208,-11.4907720504012 -393.1241126250913,-165.33944228077277 -820.2129923336004,-342.1696566119467 l-776.8537152058329,-321.10324118621116 l-39.746004033786804,-38.30257350133732 c-51.308477934524774,-49.15496932671622 -82.38262654275809,-88.09591905307585 -132.96844985848674,-165.97781850579503 c-228.3588595395751,-349.8301713122142 -521.7566347708012,-1069.280176912334 -849.1191770854454,-2081.744869797683 c-82.38262654275809,-256.62724245896 -166.93321694190456,-529.2138905434772 -166.93321694190456,-540.7046625938785 c0,-15.959405625557215 80.21466268636973,-77.24352322769693 149.5895060907976,-115.54609672903423 c244.25726115308984,-132.782254804636 630.877482209016,-276.4169054346509 981.3649723251358,-364.5128244877269 c78.76935344877747,-19.78966297569095 192.2261285997689,-35.749068601248155 257.26504429142,-35.749068601248155 c57.08971488489377,0 67.92953416683562,7.6605147002674645 65.76157031044724,47.23984065164936 c-1.4453092375922476,40.85607840142647 17.34371085110697,102.77857222858849 51.308477934524774,162.7859373806836 l30.351493989437195,54.90035535191682 l2.1679638563883716,-66.391127402318 c2.8906184751844943,-88.09591905307585 -6.503891569165113,-125.1217401043686 -44.80458636535967,-174.2767094310848 c-67.20687954803951,-86.81916660303126 -93.94510044349607,-157.6789275805053 -93.94510044349607,-247.68997530864797 c0,-74.6900183276078 10.839819281941853,-107.2472058037445 72.98811649840849,-225.98518365789022 c62.87095183526276,-119.37635407916798 79.4920080675736,-162.14756115566132 96.11306429988446,-251.52023265878177 c7.949200806757361,-41.49445462644876 20.23432932629146,-96.39480997836561 28.183530133048823,-122.56823520427943 l13.730437757126348,-47.87821687667165 l-34.68742170221394,-111.71583937890051 c-19.511674707495338,-61.284117602139716 -43.35927712776741,-141.71952195494805 -54.19909640970927,-178.7453430062408 c-10.839819281941853,-37.02582105129273 -31.796803227029436,-101.50181977854388 -46.97255022174804,-143.63465063001493 c-15.175746994718596,-42.13283085147105 -29.62883937064107,-95.11805752832103 -31.796803227029436,-118.0996016291234 c-6.503891569165113,-54.90035535191682 5.058582331572865,-137.25088837979203 33.242112464621684,-238.11433193331365 l23.124947801475955,-81.07378057783066 l-21.679638563883707,-21.066415425735524 c-85.27324501794259,-80.43540435280838 -119.2380121013604,-153.21029400534928 -96.83571891868057,-206.1955206821992 c4.335927712776742,-9.57564337533433 33.96476708341781,-52.98522667684995 65.76157031044724,-96.39480997836561 l58.535024122486014,-78.5202756777415 l-36.8553855586023,-73.4132658775632 c-20.23432932629146,-40.21770217640419 -41.191313271379045,-88.73429527809812 -46.97255022174804,-107.2472058037445 c-14.453092375922472,-48.51659310169394 -25.292911657864327,-1124.1805322642504 -11.562473900737977,-1152.9074623902536 c6.503891569165113,-14.682653175512643 15.175746994718596,-20.428039200713233 33.96476708341781,-23.61992032582468 c14.453092375922472,-2.553504900089155 188.61285550578827,0.6383762250222905 388.06553029351835,6.383762250222888 c677.8500324307639,20.428039200713233 810.0958276704546,22.981544100802388 1297.8876953578376,26.811801450936123 c630.1548275902197,5.745386025200599 974.1384261371746,-3.83025735013373 1289.9384945510806,-35.749068601248155 c411.9131327137905,-41.49445462644876 778.2990244434251,-45.96308820160478 1275.485402175158,-15.959405625557215 c85.27324501794259,5.107009800178311 200.8979840253224,12.129148275423486 256.54238967262387,15.959405625557215 c138.02703219005963,8.29889092528975 234.86275110874018,9.57564337533433 258.7103535290123,3.83025735013373 c13.730437757126348,-3.83025735013373 25.292911657864327,-1.9151286750668661 39.023349414990676,5.745386025200599 l18.789020088699214,10.852395825378908 l-4.335927712776742,144.91140308005953 c-2.8906184751844943,79.1586519027638 -7.949200806757361,223.43167875780102 -12.285128519534103,319.82648873616654 c-10.11716466314573,246.41322285860343 0,406.0072791141755 31.796803227029436,515.8079898180094 c16.621056232310842,56.17710780196141 8.671855425553485,79.1586519027638 -60.70298797887439,164.06268983072817 c-22.402293182679834,28.088553900980695 -46.97255022174804,61.284117602139716 -54.92175102850539,73.4132658775632 c-18.789020088699214,32.55718747613671 -16.621056232310842,82.98890925289751 6.503891569165113,139.16601705485897 c50.58582331572865,121.92985897925713 77.32404421118522,247.68997530864797 82.38262654275809,387.49436858852926 c5.781236950368989,170.44645208095105 -15.175746994718596,277.69365788469554 -110.56615667580694,558.5791968945025 c-28.906184751844943,84.2656617029421 -33.96476708341781,109.16233447881136 -36.8553855586023,169.8080758559288 l-3.613273093980618,70.22138475245178 l62.87095183526276,82.35053302787524 c79.4920080675736,102.77857222858849 98.28102815627282,139.16601705485897 103.33961048784569,195.34312485682034 c4.335927712776742,53.62360290187225 -4.335927712776742,84.2656617029421 -50.58582331572865,181.29884790632994 c-20.23432932629146,42.13283085147105 -41.91396789017518,99.58669110347707 -48.417859459340285,127.67524500445772 c-6.503891569165113,28.088553900980695 -13.730437757126348,54.261979126894545 -16.621056232310842,57.45386025200598 c-2.1679638563883716,3.83025735013373 -19.511674707495338,51.0700980017831 -38.300694796194556,105.33207712867762 c-40.46865865258292,116.18447295405653 -46.24989560295191,169.8080758559288 -33.242112464621684,298.1216970854088 c13.730437757126348,126.39849255441315 10.839819281941853,125.76011632939088 67.20687954803951,4.46863357515602 c26.738220895456575,-58.73061270205057 53.47644179091315,-109.80071070383364 58.535024122486014,-112.35421560392278 c15.175746994718596,-8.29889092528975 58.535024122486014,-5.745386025200599 158.9840161351472,10.852395825378908 c294.8430844688184,47.87821687667165 583.1822773684718,151.29516533028243 973.4157715183786,349.19179508719185 c93.22244582469995,47.23984065164936 191.50347398097273,96.39480997836561 218.24169487642934,109.80071070383364 c31.796803227029436,15.321029400534929 50.58582331572865,28.72693012600299 52.75378717211703,37.66419727631502 c4.335927712776742,14.044276950490348 -105.50757434423406,407.2840315642202 -180.6636546990309,649.2286208476677 c-229.08151415837116,737.9629161257659 -440.09666284683925,1262.708173094087 -669.9008316240065,1669.3538284332844 c-122.12863057654492,215.77116405753358 -228.3588595395751,360.04419091257085 -334.58908850260525,452.60874354080266 l-65.03891569165114,57.45386025200598 l-831.0528116155422,340.25452793687987 c-456.7177190791502,187.04423393153058 -837.5567031847074,340.25452793687987 -846.2285586102607,340.25452793687987 c-8.671855425553485,0 -52.75378717211703,-12.767524500445775 -98.28102815627282,-28.088553900980695 c-136.58172295246735,-46.60146442662707 -287.6165382808572,-81.07378057783066 -456.7177190791502,-103.41694845361071 c-99.00368277506892,-13.405900725468063 -417.6943696641594,-19.15128675066866 -536.9323817655198,-9.57564337533433 c-207.40187559448745,16.5977818505795 -474.78408454905315,67.02950362734032 -645.3305745849384,121.92985897925713 c-45.527240984155796,14.682653175512643 -91.05448196831159,27.45017767595841 -101.1716466314573,28.72693012600299 c-10.839819281941853,1.276752450044578 -36.13273093980618,-6.383762250222888 -61.4256425976705,-19.15128675066866 zm-77.32404421118522,-151.29516533028243 c4.335927712776742,-15.321029400534929 5.781236950368989,-29.365306351025286 2.8906184751844943,-31.28043502609215 c-4.335927712776742,-3.191881125111445 -1404.8405789396643,-588.5828794705502 -1430.1334905975286,-597.5201466208624 c-9.394510044349609,-3.191881125111445 -26.01556627666045,56.17710780196141 -18.06636546990309,63.199246277206576 c2.8906184751844943,2.553504900089155 221.13231335161387,93.84130507827642 485.62390383099506,203.6420157821101 c264.4915904793813,109.16233447881136 583.1822773684718,241.30621305842507 708.2015264202012,293.6530635102528 c125.0192490517294,51.70847422680536 231.24947801475955,94.47968130329872 235.5854057275363,94.47968130329872 c4.335927712776742,0.6383762250222905 11.562473900737977,-11.4907720504012 15.898401613514718,-26.173425225913835 zm2873.9974189521845,-282.1622914598516 c381.56163872435326,-157.040551355483 695.916397900667,-287.26930126002986 698.8070163758514,-289.82280616011906 c2.8906184751844943,-2.553504900089155 2.8906184751844943,-16.5977818505795 0,-31.28043502609215 l-5.058582331572865,-26.173425225913835 l-719.0413457021431,300.0368257604757 c-395.2920764814796,164.7010660557505 -721.2093095585315,301.3135782105202 -723.3772734149198,303.8670831106094 c-2.1679638563883716,2.553504900089155 -1.4453092375922476,14.044276950490348 2.1679638563883716,25.53504900089155 c6.503891569165113,20.428039200713233 6.503891569165113,20.428039200713233 29.62883937064107,11.4907720504012 c13.007783138330225,-5.107009800178311 335.31174312140143,-137.25088837979203 716.8733818457547,-293.6530635102528 zm-2561.8106236322583,219.6014214076673 c270.99548204854636,-67.02950362734032 548.4948556662578,-97.67156242841017 844.0605947538725,-95.11805752832103 c246.42522500947814,2.553504900089155 449.49117289118885,31.28043502609215 654.725084629288,92.56455262823187 c52.0311325533209,15.321029400534929 94.6677550622922,26.811801450936123 96.11306429988446,25.53504900089155 c0.7226546187961252,-0.6383762250222905 -5.058582331572865,-14.044276950490348 -14.453092375922472,-30.003682576047566 c-14.453092375922472,-24.896672775869266 -20.23432932629146,-29.365306351025286 -62.87095183526276,-42.13283085147105 c-26.01556627666045,-7.6605147002674645 -69.37484340442788,-19.15128675066866 -97.5583735374767,-24.896672775869266 c-27.460875514252695,-5.745386025200599 -53.47644179091315,-12.129148275423486 -57.812369503689894,-14.044276950490348 c-3.613273093980618,-1.9151286750668661 -18.06636546990309,-4.46863357515602 -31.796803227029436,-5.745386025200599 c-13.730437757126348,-1.276752450044578 -28.906184751844943,-5.107009800178311 -33.242112464621684,-8.29889092528975 c-5.058582331572865,-3.83025735013373 -10.11716466314573,-4.46863357515602 -12.285128519534103,-2.553504900089155 c-2.1679638563883716,1.9151286750668661 -16.621056232310842,0.6383762250222905 -31.796803227029436,-3.191881125111445 c-32.51945784582557,-7.022138475245174 -209.56983945087583,-24.896672775869266 -299.1790121815952,-29.365306351025286 c-158.9840161351472,-8.937267150312039 -351.9327993537122,0.6383762250222905 -563.6706026609763,26.811801450936123 c-45.527240984155796,5.745386025200599 -89.60917273071934,10.852395825378908 -97.5583735374767,11.4907720504012 c-7.949200806757361,0.6383762250222905 -23.84760242027208,3.191881125111445 -36.13273093980618,5.745386025200599 c-11.562473900737977,2.553504900089155 -36.13273093980618,7.022138475245174 -54.19909640970927,10.214019600356618 c-117.79270286376816,21.704791650757816 -223.30027720800217,47.23984065164936 -268.10486357336185,65.11437495227342 c-21.679638563883707,8.29889092528975 -43.35927712776741,47.23984065164936 -22.402293182679834,40.21770217640419 c6.503891569165113,-1.9151286750668661 46.24989560295191,-12.129148275423486 88.16386349312705,-22.3431678757801 zm2525.6778926924517,-302.59033066056486 l722.6546187961236,-301.9519544355424 l-1.4453092375922476,-31.28043502609215 c-3.613273093980618,-51.70847422680536 -36.8553855586023,-222.15492630775648 -67.92953416683562,-340.8929041619021 c-27.460875514252695,-104.05532467863306 -52.0311325533209,-224.70843120784556 -72.26546187961236,-349.19179508719185 l-7.949200806757361,-52.98522667684995 l-971.2478076619901,0 l-971.2478076619901,0 l0,-67.02950362734032 c0,-63.199246277206576 -1.4453092375922476,-68.94463230240719 -17.34371085110697,-82.98890925289751 c-17.34371085110697,-15.321029400534929 -17.34371085110697,-15.321029400534929 -2.1679638563883716,-14.044276950490348 c14.453092375922472,1.276752450044578 15.898401613514718,-1.9151286750668661 18.06636546990309,-41.49445462644876 l2.1679638563883716,-43.40958330151563 l324.4719238394594,0 c285.4485744244688,0 324.4719238394594,-1.276752450044578 320.85865074547894,-9.57564337533433 c-2.8906184751844943,-5.107009800178311 -0.7226546187961252,-9.57564337533433 3.613273093980618,-9.57564337533433 c5.058582331572865,0 10.11716466314573,4.46863357515602 12.285128519534103,9.57564337533433 c4.335927712776742,8.937267150312039 75.87873497359297,9.57564337533433 625.096245258647,9.57564337533433 l620.7603175458702,-0.6383762250222905 l-0.7226546187961252,-17.236158075601804 c-0.7226546187961252,-33.83393992618131 -18.06636546990309,-179.3837192312631 -20.95698394508759,-182.5756003563745 c-6.503891569165113,-5.107009800178311 -134.41375909607902,-14.044276950490348 -152.4801245659821,-9.57564337533433 c-9.394510044349609,1.9151286750668661 -24.570257039068206,0.6383762250222905 -33.96476708341781,-2.553504900089155 c-11.562473900737977,-4.46863357515602 -20.95698394508759,-3.83025735013373 -33.96476708341781,1.9151286750668661 c-13.730437757126348,6.383762250222888 -22.402293182679834,7.022138475245174 -33.96476708341781,1.276752450044578 c-27.460875514252695,-11.4907720504012 -91.05448196831159,-15.321029400534929 -117.07004824497203,-7.022138475245174 c-19.511674707495338,6.383762250222888 -27.460875514252695,5.745386025200599 -46.97255022174804,-3.83025735013373 c-20.95698394508759,-8.937267150312039 -22.402293182679834,-12.129148275423486 -14.453092375922472,-19.78966297569095 c8.671855425553485,-7.022138475245174 15.175746994718596,-7.022138475245174 38.300694796194556,-1.276752450044578 c22.402293182679834,6.383762250222888 28.906184751844943,6.383762250222888 31.796803227029436,0 c4.335927712776742,-11.4907720504012 31.074148608233312,-9.57564337533433 41.91396789017518,3.83025735013373 c8.671855425553485,10.214019600356618 10.11716466314573,10.214019600356618 26.01556627666045,-3.191881125111445 c20.23432932629146,-17.236158075601804 36.13273093980618,-18.512910525646365 49.14051407813641,-5.107009800178311 c7.226546187961236,7.6605147002674645 11.562473900737977,8.29889092528975 27.460875514252695,0.6383762250222905 c13.730437757126348,-6.383762250222888 23.124947801475955,-6.383762250222888 38.300694796194556,-1.9151286750668661 c15.175746994718596,5.107009800178311 24.570257039068206,5.107009800178311 38.300694796194556,-1.9151286750668661 c13.007783138330225,-5.745386025200599 20.95698394508759,-6.383762250222888 27.460875514252695,-1.9151286750668661 c5.058582331572865,3.83025735013373 33.242112464621684,7.022138475245174 62.87095183526276,7.022138475245174 l52.75378717211703,0.6383762250222905 l-4.335927712776742,-19.78966297569095 c-2.1679638563883716,-10.852395825378908 -4.335927712776742,-30.642058801069858 -4.335927712776742,-44.6863357515602 c0,-21.704791650757816 -2.1679638563883716,-24.896672775869266 -12.285128519534103,-21.066415425735524 c-20.23432932629146,6.383762250222888 -81.65997192396196,8.937267150312039 -85.27324501794259,2.553504900089155 c-7.226546187961236,-8.937267150312039 23.124947801475955,-18.512910525646365 60.70298797887439,-18.512910525646365 c39.023349414990676,0 42.63662250897129,-3.83025735013373 32.51945784582557,-37.02582105129273 c-4.335927712776742,-13.405900725468063 -8.671855425553485,-14.682653175512643 -49.14051407813641,-14.044276950490348 c-23.84760242027208,0.6383762250222905 -59.25767874128214,-0.6383762250222905 -77.32404421118522,-3.191881125111445 c-21.679638563883707,-3.191881125111445 -35.41007632101006,-1.9151286750668661 -38.300694796194556,1.9151286750668661 c-5.058582331572865,7.6605147002674645 -26.01556627666045,3.191881125111445 -26.01556627666045,-5.107009800178311 c0,-9.57564337533433 39.023349414990676,-17.874534300624077 57.812369503689894,-11.4907720504012 c11.562473900737977,3.83025735013373 33.242112464621684,3.191881125111445 59.25767874128214,-0.6383762250222905 c22.402293182679834,-3.191881125111445 46.97255022174804,-4.46863357515602 55.64440564730152,-2.553504900089155 c13.730437757126348,3.191881125111445 15.175746994718596,0.6383762250222905 15.175746994718596,-26.811801450936123 c0,-25.53504900089155 -2.1679638563883716,-29.365306351025286 -12.285128519534103,-26.173425225913835 c-7.226546187961236,1.9151286750668661 -33.96476708341781,3.83025735013373 -59.98033336007826,3.83025735013373 c-26.01556627666045,-0.6383762250222905 -60.70298797887439,-0.6383762250222905 -77.32404421118522,-0.6383762250222905 c-17.34371085110697,0 -39.746004033786804,-3.83025735013373 -50.58582331572865,-8.937267150312039 c-23.84760242027208,-10.852395825378908 -25.292911657864327,-10.852395825378908 30.351493989437195,-9.57564337533433 c81.65997192396196,1.9151286750668661 158.9840161351472,-0.6383762250222905 163.31994384792392,-5.107009800178311 c2.8906184751844943,-2.553504900089155 3.613273093980618,-19.78966297569095 1.4453092375922476,-38.30257350133732 l-4.335927712776742,-34.47231615120359 l-40.46865865258292,3.83025735013373 c-22.402293182679834,1.9151286750668661 -71.54280726081625,4.46863357515602 -109.12084743821467,5.745386025200599 c-37.57804017739843,1.276752450044578 -74.43342573600076,4.46863357515602 -81.65997192396196,7.022138475245174 c-6.503891569165113,3.191881125111445 -16.621056232310842,2.553504900089155 -21.679638563883707,-1.276752450044578 c-13.730437757126348,-9.57564337533433 -90.33182734951545,-14.044276950490348 -114.17942976978755,-6.383762250222888 c-16.621056232310842,5.107009800178311 -26.738220895456575,4.46863357515602 -39.023349414990676,-1.276752450044578 c-9.394510044349609,-4.46863357515602 -27.460875514252695,-6.383762250222888 -41.191313271379045,-5.107009800178311 c-13.007783138330225,1.9151286750668661 -31.074148608233312,1.276752450044578 -39.746004033786804,-1.9151286750668661 c-9.394510044349609,-3.191881125111445 -25.292911657864327,-2.553504900089155 -37.57804017739843,1.276752450044578 c-15.898401613514718,5.107009800178311 -26.01556627666045,4.46863357515602 -42.63662250897129,-3.191881125111445 c-18.789020088699214,-8.29889092528975 -21.679638563883707,-8.29889092528975 -32.51945784582557,0.6383762250222905 c-9.394510044349609,8.29889092528975 -15.175746994718596,8.937267150312039 -31.796803227029436,3.191881125111445 c-10.839819281941853,-4.46863357515602 -31.796803227029436,-7.6605147002674645 -45.527240984155796,-7.6605147002674645 c-13.730437757126348,0 -34.68742170221394,0 -46.97255022174804,0 c-11.562473900737977,0 -62.148297216466624,0 -112.01146591339916,0 c-49.86316869693254,0.6383762250222905 -111.28881129460304,-0.6383762250222905 -137.3043775712635,-3.191881125111445 c-26.01556627666045,-1.9151286750668661 -58.535024122486014,-4.46863357515602 -72.26546187961236,-5.745386025200599 c-28.183530133048823,-1.9151286750668661 -61.4256425976705,-15.321029400534929 -54.19909640970927,-21.704791650757816 c7.226546187961236,-6.383762250222888 125.74190367052552,-9.57564337533433 216.79638563883708,-5.745386025200599 c28.183530133048823,1.276752450044578 58.535024122486014,0 68.65218878563175,-1.9151286750668661 c10.11716466314573,-2.553504900089155 25.292911657864327,-1.276752450044578 34.68742170221394,1.9151286750668661 c10.839819281941853,4.46863357515602 21.679638563883707,4.46863357515602 33.96476708341781,-0.6383762250222905 c15.175746994718596,-6.383762250222888 21.679638563883707,-5.745386025200599 36.13273093980618,2.553504900089155 c11.562473900737977,6.383762250222888 20.95698394508759,8.29889092528975 30.351493989437195,3.83025735013373 c15.175746994718596,-6.383762250222888 115.62473900737977,-5.107009800178311 133.69110447728286,1.276752450044578 c6.503891569165113,2.553504900089155 18.789020088699214,1.276752450044578 27.460875514252695,-2.553504900089155 c12.285128519534103,-5.745386025200599 20.95698394508759,-5.745386025200599 36.8553855586023,0.6383762250222905 c16.621056232310842,5.745386025200599 26.01556627666045,5.745386025200599 40.46865865258292,0 c16.621056232310842,-6.383762250222888 22.402293182679834,-5.745386025200599 39.023349414990676,5.107009800178311 c25.292911657864327,16.5977818505795 26.738220895456575,16.5977818505795 47.695204840544164,-0.6383762250222905 c14.453092375922472,-11.4907720504012 19.511674707495338,-12.767524500445775 30.351493989437195,-7.022138475245174 c10.839819281941853,5.745386025200599 19.511674707495338,5.745386025200599 36.8553855586023,0 c19.511674707495338,-6.383762250222888 23.84760242027208,-6.383762250222888 31.796803227029436,3.191881125111445 c8.671855425553485,10.852395825378908 11.562473900737977,10.852395825378908 31.796803227029436,1.276752450044578 c13.007783138330225,-5.107009800178311 26.738220895456575,-7.6605147002674645 31.796803227029436,-5.107009800178311 c4.335927712776742,2.553504900089155 39.746004033786804,5.745386025200599 77.32404421118522,6.383762250222888 c38.300694796194556,1.276752450044578 80.21466268636973,3.83025735013373 93.22244582469995,5.745386025200599 c23.124947801475955,3.83025735013373 23.124947801475955,3.83025735013373 23.124947801475955,-22.3431678757801 c0,-23.61992032582468 -1.4453092375922476,-25.53504900089155 -20.95698394508759,-25.53504900089155 c-11.562473900737977,0 -22.402293182679834,-3.83025735013373 -25.292911657864327,-9.57564337533433 c-2.8906184751844943,-7.6605147002674645 2.1679638563883716,-9.57564337533433 20.95698394508759,-9.57564337533433 l25.292911657864327,0 l0,-60.00736515209513 l0,-60.645741377117425 l-19.511674707495338,-1.9151286750668661 c-10.11716466314573,-1.276752450044578 -20.23432932629146,-5.745386025200599 -22.402293182679834,-10.852395825378908 c-2.1679638563883716,-6.383762250222888 2.1679638563883716,-7.022138475245174 19.511674707495338,-3.83025735013373 c19.511674707495338,3.83025735013373 22.402293182679834,2.553504900089155 22.402293182679834,-8.937267150312039 c0,-9.57564337533433 -5.058582331572865,-13.405900725468063 -15.898401613514718,-14.044276950490348 c-15.898401613514718,-1.276752450044578 -15.898401613514718,-1.276752450044578 -1.4453092375922476,-3.83025735013373 c13.730437757126348,-2.553504900089155 15.898401613514718,-8.29889092528975 19.511674707495338,-61.284117602139716 c2.8906184751844943,-42.13283085147105 2.1679638563883716,-60.00736515209513 -4.335927712776742,-63.199246277206576 c-6.503891569165113,-3.83025735013373 -6.503891569165113,-5.107009800178311 0.7226546187961252,-5.107009800178311 c14.453092375922472,0 11.562473900737977,-55.53873157693912 -3.613273093980618,-63.199246277206576 c-11.562473900737977,-5.745386025200599 -11.562473900737977,-6.383762250222888 3.613273093980618,-7.022138475245174 c13.007783138330225,0 15.898401613514718,-3.83025735013373 15.898401613514718,-19.15128675066866 c0,-18.512910525646365 -9.394510044349609,-25.53504900089155 -18.06636546990309,-12.767524500445775 c-2.1679638563883716,3.83025735013373 -18.06636546990309,6.383762250222888 -34.68742170221394,6.383762250222888 c-16.621056232310842,0 -55.64440564730152,0.6383762250222905 -85.99589963673873,1.9151286750668661 c-41.91396789017518,1.9151286750668661 -56.367060266097646,0.6383762250222905 -59.25767874128214,-5.745386025200599 c-5.058582331572865,-12.129148275423486 -18.789020088699214,-11.4907720504012 -29.62883937064107,1.9151286750668661 c-7.949200806757361,8.937267150312039 -11.562473900737977,9.57564337533433 -31.796803227029436,1.9151286750668661 c-19.511674707495338,-7.022138475245174 -24.570257039068206,-6.383762250222888 -36.13273093980618,2.553504900089155 c-15.898401613514718,12.767524500445775 -21.679638563883707,12.767524500445775 -38.300694796194556,-0.6383762250222905 c-11.562473900737977,-8.937267150312039 -16.621056232310842,-9.57564337533433 -38.300694796194556,-2.553504900089155 c-13.730437757126348,4.46863357515602 -28.906184751844943,5.745386025200599 -33.96476708341781,3.191881125111445 c-14.453092375922472,-7.6605147002674645 -108.39819281941854,-8.29889092528975 -122.851285195341,-0.6383762250222905 c-8.671855425553485,5.107009800178311 -17.34371085110697,4.46863357515602 -31.074148608233312,-1.9151286750668661 c-13.730437757126348,-6.383762250222888 -23.84760242027208,-7.022138475245174 -38.300694796194556,-2.553504900089155 c-15.175746994718596,5.107009800178311 -24.570257039068206,3.83025735013373 -42.63662250897129,-5.745386025200599 c-13.007783138330225,-6.383762250222888 -21.679638563883707,-14.682653175512643 -19.511674707495338,-17.874534300624077 c5.781236950368989,-8.937267150312039 18.789020088699214,-7.022138475245174 28.906184751844943,5.745386025200599 c8.671855425553485,10.214019600356618 10.11716466314573,10.214019600356618 30.351493989437195,0 c18.06636546990309,-9.57564337533433 23.124947801475955,-10.214019600356618 29.62883937064107,-2.553504900089155 c10.839819281941853,10.852395825378908 105.50757434423406,6.383762250222888 129.35517676450615,-6.383762250222888 c12.285128519534103,-7.022138475245174 19.511674707495338,-7.6605147002674645 31.074148608233312,-1.9151286750668661 c8.671855425553485,3.83025735013373 26.01556627666045,5.107009800178311 39.023349414990676,3.191881125111445 c13.007783138330225,-2.553504900089155 31.796803227029436,-0.6383762250222905 41.91396789017518,3.191881125111445 c14.453092375922472,5.745386025200599 21.679638563883707,5.107009800178311 36.13273093980618,-3.83025735013373 c18.06636546990309,-10.214019600356618 20.23432932629146,-10.214019600356618 40.46865865258292,0.6383762250222905 c17.34371085110697,8.937267150312039 23.84760242027208,9.57564337533433 32.51945784582557,3.191881125111445 c7.949200806757361,-5.745386025200599 14.453092375922472,-6.383762250222888 25.292911657864327,-0.6383762250222905 c7.949200806757361,3.83025735013373 23.124947801475955,5.107009800178311 32.51945784582557,2.553504900089155 c10.11716466314573,-1.9151286750668661 51.308477934524774,-4.46863357515602 91.77713658710768,-4.46863357515602 l73.7107711172046,-1.276752450044578 l13.730437757126348,-70.22138475245178 c7.226546187961236,-38.30257350133732 21.679638563883707,-95.7564337533433 32.51945784582557,-127.67524500445772 c13.730437757126348,-38.30257350133732 19.511674707495338,-70.22138475245178 19.511674707495338,-95.7564337533433 c-0.7226546187961252,-21.066415425735524 -20.95698394508759,-130.22874990454685 -44.80458636535967,-242.5829655084697 c-89.60917273071934,-418.136427389599 -105.50757434423406,-598.1585228458846 -62.87095183526276,-705.4057286496289 c5.781236950368989,-14.682653175512643 10.839819281941853,-33.83393992618131 10.839819281941853,-42.13283085147105 c0,-7.6605147002674645 13.007783138330225,-47.23984065164936 28.183530133048823,-86.81916660303126 c15.898401613514718,-39.5793259513819 33.96476708341781,-90.01104772814271 40.46865865258292,-112.35421560392278 c5.781236950368989,-21.704791650757816 27.460875514252695,-73.4132658775632 46.97255022174804,-114.90772050401196 c44.80458636535967,-93.84130507827642 52.75378717211703,-125.76011632939088 43.35927712776741,-164.7010660557505 c-10.839819281941853,-42.13283085147105 -24.570257039068206,-63.199246277206576 -122.851285195341,-187.68261015655284 c-111.28881129460304,-139.8043932798812 -125.0192490517294,-155.12542268041614 -249.31584348466262,-268.1180145093613 c-154.64808842237045,-139.8043932798812 -229.80416877716735,-238.75270815833596 -250.7611527222549,-326.21025098638955 c-7.226546187961236,-31.91881125111443 -6.503891569165113,-38.30257350133732 3.613273093980618,-52.98522667684995 c8.671855425553485,-11.4907720504012 18.789020088699214,-16.5977818505795 33.96476708341781,-16.5977818505795 c26.01556627666045,0 39.746004033786804,17.236158075601804 46.24989560295191,56.17710780196141 c11.562473900737977,68.30625607738487 86.71855425553483,161.509184930639 253.6517711974394,314.081102710966 c63.59360645405887,58.092236477028266 117.07004824497203,105.9704533536999 119.96066672015652,107.2472058037445 c2.1679638563883716,0.6383762250222905 6.503891569165113,-13.405900725468063 9.394510044349609,-31.28043502609215 c2.8906184751844943,-17.874534300624077 20.23432932629146,-77.88189945271922 38.300694796194556,-132.782254804636 c89.60917273071934,-270.03314318442807 105.50757434423406,-343.4464090619913 105.50757434423406,-492.1880694921846 c0,-243.85971795851427 -96.83571891868057,-505.5939702176526 -287.6165382808572,-778.18061830217 c-31.074148608233312,-44.6863357515602 -39.746004033786804,-62.5608700521843 -36.8553855586023,-74.05164210258546 c5.781236950368989,-19.15128675066866 28.906184751844943,-31.28043502609215 51.308477934524774,-26.173425225913835 c20.23432932629146,4.46863357515602 72.26546187961236,75.96677077765236 145.97623299681698,199.17338220695413 l46.97255022174804,79.79702812778608 l15.175746994718596,-21.066415425735524 c7.949200806757361,-11.4907720504012 28.183530133048823,-37.02582105129273 45.527240984155796,-56.815484026983704 c54.92175102850539,-63.199246277206576 57.812369503689894,-71.49813720249631 39.746004033786804,-134.05900725468064 c-23.84760242027208,-86.81916660303126 -31.796803227029436,-204.9187682321547 -28.183530133048823,-431.54232811506716 c2.8906184751844943,-204.9187682321547 2.8906184751844943,-206.1955206821992 -11.562473900737977,-206.83389690722143 c-8.671855425553485,0 -33.242112464621684,-1.276752450044578 -54.92175102850539,-2.553504900089155 c-21.679638563883707,-0.6383762250222905 -78.76935344877747,-3.83025735013373 -126.46455828932163,-5.745386025200599 c-48.417859459340285,-2.553504900089155 -101.89430125025343,-5.745386025200599 -119.2380121013604,-7.022138475245174 c-33.96476708341781,-3.191881125111445 -104.0622651066418,-7.6605147002674645 -209.56983945087583,-12.767524500445775 c-33.96476708341781,-1.9151286750668661 -83.82793578035036,-4.46863357515602 -112.01146591339916,-6.383762250222888 c-184.99958241180764,-10.852395825378908 -618.5923536894818,-15.321029400534929 -747.9475304539881,-7.022138475245174 c-220.4096587328177,14.044276950490348 -276.7767189989154,18.512910525646365 -354.1007632101006,26.811801450936123 c-46.24989560295191,5.107009800178311 -93.22244582469995,9.57564337533433 -126.46455828932163,12.129148275423486 c-15.898401613514718,1.276752450044578 -48.417859459340285,3.83025735013373 -72.26546187961236,5.745386025200599 c-190.05816474338053,15.959405625557215 -380.11632948676106,19.78966297569095 -924.9979120590382,19.78966297569095 c-567.2838757549571,0 -876.5800525996979,-5.107009800178311 -1513.9614263778785,-25.53504900089155 c-61.4256425976705,-1.9151286750668661 -156.0933976599627,-4.46863357515602 -209.56983945087583,-5.107009800178311 l-97.5583735374767,-1.276752450044578 l0.7226546187961252,22.3431678757801 c0,12.129148275423486 2.8906184751844943,194.06637240677577 5.781236950368989,403.4537742140864 c5.781236950368989,428.3504469899557 0.7226546187961252,388.13274481355154 65.76157031044724,514.5312373679646 c27.460875514252695,53.62360290187225 33.242112464621684,70.22138475245178 29.62883937064107,88.09591905307585 c-2.8906184751844943,11.4907720504012 -31.074148608233312,56.17710780196141 -62.87095183526276,98.94831487845471 c-72.98811649840849,97.67156242841017 -73.7107711172046,98.94831487845471 -56.367060266097646,132.782254804636 c17.34371085110697,35.11069237622589 57.08971488489377,79.79702812778608 64.316261072855,72.77488965254089 c3.613273093980618,-2.553504900089155 20.23432932629146,-38.30257350133732 38.300694796194556,-78.5202756777415 c65.03891569165114,-147.46490798014867 211.73780330726424,-430.2655756650226 341.09298007177034,-657.5275117729575 c77.32404421118522,-135.97413592974752 126.46455828932163,-208.7490255822884 143.8082691404286,-214.494411607489 c5.781236950368989,-1.9151286750668661 23.124947801475955,0 39.746004033786804,3.83025735013373 c23.84760242027208,5.745386025200599 29.62883937064107,9.57564337533433 29.62883937064107,21.704791650757816 c0,8.29889092528975 -6.503891569165113,21.704791650757816 -15.175746994718596,30.003682576047566 c-36.13273093980618,36.387444826270446 -140.19499604644798,215.1327878325113 -281.83530133048816,483.25080234187254 c-118.51535748256428,223.43167875780102 -181.38630931782703,356.85230978745926 -229.80416877716735,484.5275547919171 c-55.64440564730152,146.8265317551264 -69.37484340442788,204.2803920071324 -69.37484340442788,292.3763110602082 c0,63.83762250222886 2.1679638563883716,76.60514700267464 26.01556627666045,140.44276950490357 c14.453092375922472,38.94094972635961 43.35927712776741,127.67524500445772 64.316261072855,197.89662975690942 c20.95698394508759,70.22138475245178 39.746004033786804,130.22874990454685 41.91396789017518,132.782254804636 c1.4453092375922476,3.191881125111445 13.007783138330225,-10.214019600356618 26.01556627666045,-30.003682576047566 c35.41007632101006,-56.17710780196141 82.38262654275809,-109.80071070383364 135.1364137148751,-153.21029400534928 c52.0311325533209,-43.40958330151563 174.88241774866194,-118.73797785414568 194.39409245615724,-118.73797785414568 c21.679638563883707,0 43.35927712776741,19.15128675066866 43.35927712776741,38.30257350133732 c0,16.5977818505795 -7.949200806757361,23.61992032582468 -70.82015264202012,59.368988927072856 c-78.76935344877747,46.60146442662707 -153.9254338035743,108.52395825378909 -195.8394016937495,162.7859373806836 c-37.57804017739843,49.15496932671622 -78.04669882998135,121.92985897925713 -91.05448196831159,162.7859373806836 c-5.781236950368989,17.874534300624077 -15.175746994718596,44.6863357515602 -20.95698394508759,58.73061270205057 c-5.781236950368989,14.044276950490348 -17.34371085110697,63.199246277206576 -25.292911657864327,108.52395825378909 c-18.789020088699214,98.94831487845471 -41.91396789017518,162.14756115566132 -104.78491972543792,282.1622914598516 c-52.75378717211703,99.58669110347707 -69.37484340442788,147.46490798014867 -69.37484340442788,197.89662975690942 c0,71.49813720249631 23.84760242027208,131.50550235459147 84.55059039914644,213.85603538246673 c20.23432932629146,27.45017767595841 41.191313271379045,64.47599872725118 46.24989560295191,82.98890925289751 c15.898401613514718,52.98522667684995 11.562473900737977,187.04423393153058 -11.562473900737977,356.2139335624369 c-25.292911657864327,188.95936260659744 -28.906184751844943,365.7895769377713 -7.949200806757361,420.051556064666 c7.226546187961236,18.512910525646365 15.175746994718596,47.23984065164936 17.34371085110697,63.83762250222886 l5.058582331572865,30.003682576047566 l797.0880445321243,1.9151286750668661 l796.3653899133283,1.276752450044578 l0,47.87821687667165 l0,47.87821687667165 l47.695204840544164,0 c41.191313271379045,0 46.97255022174804,1.276752450044578 44.80458636535967,10.852395825378908 c-1.4453092375922476,6.383762250222888 -11.562473900737977,15.321029400534929 -23.124947801475955,20.428039200713233 c-17.34371085110697,7.022138475245174 -23.84760242027208,7.022138475245174 -39.746004033786804,0 c-10.11716466314573,-4.46863357515602 -20.95698394508759,-9.57564337533433 -23.84760242027208,-10.852395825378908 c-3.613273093980618,-1.276752450044578 -5.781236950368989,5.107009800178311 -5.781236950368989,14.044276950490348 c0,12.767524500445775 3.613273093980618,16.5977818505795 16.621056232310842,17.236158075601804 l15.898401613514718,1.276752450044578 l-15.898401613514718,2.553504900089155 c-23.84760242027208,3.83025735013373 -21.679638563883707,23.61992032582468 3.613273093980618,26.173425225913835 c45.527240984155796,4.46863357515602 187.167546268196,1.9151286750668661 203.78860250050687,-3.83025735013373 c20.23432932629146,-6.383762250222888 65.03891569165114,1.9151286750668661 65.03891569165114,11.4907720504012 c0,3.83025735013373 -20.23432932629146,6.383762250222888 -44.80458636535967,7.022138475245174 c-47.695204840544164,0.6383762250222905 -102.61695586904955,3.191881125111445 -121.40597595774877,6.383762250222888 c-5.781236950368989,0.6383762250222905 -36.13273093980618,-0.6383762250222905 -66.48422492924337,-3.191881125111445 c-54.19909640970927,-4.46863357515602 -56.367060266097646,-4.46863357515602 -56.367060266097646,8.29889092528975 c0,8.29889092528975 5.058582331572865,13.405900725468063 13.007783138330225,13.405900725468063 c11.562473900737977,0.6383762250222905 11.562473900737977,0.6383762250222905 0,7.022138475245174 c-7.949200806757361,3.83025735013373 -13.007783138330225,14.044276950490348 -13.007783138330225,24.896672775869266 c0,22.981544100802388 -20.95698394508759,30.642058801069858 -46.24989560295191,15.959405625557215 c-14.453092375922472,-8.29889092528975 -33.96476708341781,-10.214019600356618 -104.0622651066418,-8.29889092528975 c-47.695204840544164,1.276752450044578 -83.82793578035036,3.83025735013373 -79.4920080675736,5.745386025200599 c3.613273093980618,1.9151286750668661 1.4453092375922476,5.745386025200599 -5.781236950368989,8.29889092528975 c-15.175746994718596,5.107009800178311 -60.70298797887439,-1.9151286750668661 -60.70298797887439,-9.57564337533433 c0,-3.191881125111445 -6.503891569165113,-5.745386025200599 -15.175746994718596,-5.745386025200599 c-9.394510044349609,0 -13.007783138330225,2.553504900089155 -9.394510044349609,7.6605147002674645 c3.613273093980618,5.107009800178311 0,5.745386025200599 -12.285128519534103,1.276752450044578 c-26.01556627666045,-8.29889092528975 -591.8541327940253,-10.852395825378908 -591.8541327940253,-2.553504900089155 c0,4.46863357515602 -4.335927712776742,5.107009800178311 -13.007783138330225,0.6383762250222905 c-15.898401613514718,-7.6605147002674645 -641.7173014909579,-9.57564337533433 -646.7758838225308,-2.553504900089155 c-2.1679638563883716,3.191881125111445 -6.503891569165113,35.749068601248155 -8.671855425553485,72.77488965254089 c-5.058582331572865,67.02950362734032 -5.058582331572865,67.66787985236262 11.562473900737977,72.77488965254089 l17.34371085110697,5.107009800178311 l-19.511674707495338,2.553504900089155 c-18.06636546990309,2.553504900089155 -20.23432932629146,5.107009800178311 -20.23432932629146,28.088553900980695 c0,17.236158075601804 2.8906184751844943,24.896672775869266 10.11716466314573,24.896672775869266 c5.781236950368989,0 13.007783138330225,3.191881125111445 15.898401613514718,7.6605147002674645 c3.613273093980618,5.107009800178311 0,5.745386025200599 -10.11716466314573,3.83025735013373 c-8.671855425553485,-2.553504900089155 -17.34371085110697,-1.9151286750668661 -18.789020088699214,0 c-1.4453092375922476,2.553504900089155 -5.058582331572865,30.642058801069858 -7.226546187961236,62.5608700521843 l-5.058582331572865,58.73061270205057 l18.789020088699214,3.83025735013373 c10.11716466314573,2.553504900089155 16.621056232310842,7.022138475245174 13.730437757126348,10.852395825378908 c-2.1679638563883716,3.83025735013373 -11.562473900737977,5.107009800178311 -20.95698394508759,3.191881125111445 c-15.175746994718596,-3.191881125111445 -16.621056232310842,-1.276752450044578 -20.95698394508759,40.85607840142647 c-2.8906184751844943,24.896672775869266 -2.8906184751844943,47.23984065164936 -0.7226546187961252,51.0700980017831 c2.1679638563883716,3.191881125111445 1.4453092375922476,6.383762250222888 -2.1679638563883716,6.383762250222888 c-3.613273093980618,0 -10.839819281941853,33.83393992618131 -15.898401613514718,75.32839455263004 c-5.058582331572865,40.85607840142647 -9.394510044349609,75.96677077765236 -10.11716466314573,77.88189945271922 c-1.4453092375922476,6.383762250222888 41.191313271379045,7.022138475245174 62.148297216466624,0.6383762250222905 c15.898401613514718,-5.107009800178311 26.01556627666045,-4.46863357515602 40.46865865258292,1.9151286750668661 c20.23432932629146,8.937267150312039 109.84350205701078,9.57564337533433 132.24579523969064,1.276752450044578 c7.226546187961236,-2.553504900089155 14.453092375922472,-1.9151286750668661 16.621056232310842,1.9151286750668661 c8.671855425553485,12.129148275423486 -28.906184751844943,15.321029400534929 -140.91765066524408,14.044276950490348 l-113.45677515099139,-1.276752450044578 l-4.335927712776742,30.642058801069858 c-2.8906184751844943,16.5977818505795 -7.226546187961236,40.21770217640419 -9.394510044349609,51.0700980017831 l-3.613273093980618,21.066415425735524 l96.11306429988446,-1.276752450044578 c133.69110447728286,-0.6383762250222905 152.4801245659821,0 147.4215422344092,7.6605147002674645 c-2.8906184751844943,3.83025735013373 -52.75378717211703,6.383762250222888 -127.18721290811774,6.383762250222888 c-114.17942976978755,0 -122.12863057654492,0.6383762250222905 -122.12863057654492,12.129148275423486 c0,6.383762250222888 -2.1679638563883716,24.25829655084697 -4.335927712776742,40.21770217640419 l-4.335927712776742,28.72693012600299 l78.04669882998135,1.9151286750668661 c43.35927712776741,1.276752450044578 85.27324501794259,1.276752450044578 93.22244582469995,1.276752450044578 c100.4489920126612,-5.107009800178311 126.46455828932163,-5.107009800178311 145.97623299681698,0 c15.175746994718596,3.83025735013373 28.183530133048823,3.83025735013373 36.8553855586023,-0.6383762250222905 c9.394510044349609,-4.46863357515602 22.402293182679834,-4.46863357515602 37.57804017739843,-0.6383762250222905 c14.453092375922472,3.83025735013373 28.183530133048823,3.83025735013373 36.13273093980618,0 c8.671855425553485,-3.83025735013373 20.95698394508759,-3.83025735013373 34.68742170221394,0.6383762250222905 c17.34371085110697,5.107009800178311 26.738220895456575,4.46863357515602 44.80458636535967,-3.83025735013373 c17.34371085110697,-8.29889092528975 25.292911657864327,-8.937267150312039 33.242112464621684,-2.553504900089155 c5.781236950368989,4.46863357515602 19.511674707495338,5.745386025200599 36.13273093980618,3.191881125111445 c15.898401613514718,-3.191881125111445 29.62883937064107,-1.9151286750668661 36.13273093980618,3.191881125111445 c7.949200806757361,5.745386025200599 15.175746994718596,5.745386025200599 31.796803227029436,-0.6383762250222905 c12.285128519534103,-4.46863357515602 41.91396789017518,-7.6605147002674645 67.20687954803951,-7.022138475245174 c127.90986752691389,2.553504900089155 183.55427317421535,5.107009800178311 190.78081936217663,8.937267150312039 c5.058582331572865,2.553504900089155 24.570257039068206,4.46863357515602 43.35927712776741,3.83025735013373 c18.789020088699214,-0.6383762250222905 45.527240984155796,0.6383762250222905 58.535024122486014,3.83025735013373 c18.789020088699214,3.83025735013373 23.124947801475955,3.191881125111445 23.124947801475955,-5.745386025200599 c0,-15.321029400534929 16.621056232310842,-12.129148275423486 26.01556627666045,4.46863357515602 c7.226546187961236,14.044276950490348 5.781236950368989,14.682653175512643 -14.453092375922472,15.959405625557215 c-12.285128519534103,0 -41.91396789017518,1.9151286750668661 -65.76157031044724,3.83025735013373 c-23.84760242027208,1.9151286750668661 -73.7107711172046,3.83025735013373 -110.56615667580694,4.46863357515602 c-36.8553855586023,0.6383762250222905 -68.65218878563175,3.83025735013373 -70.82015264202012,7.022138475245174 c-2.1679638563883716,3.191881125111445 -14.453092375922472,3.83025735013373 -26.738220895456575,1.9151286750668661 c-13.007783138330225,-2.553504900089155 -31.074148608233312,-1.276752450044578 -41.191313271379045,1.9151286750668661 c-13.007783138330225,4.46863357515602 -23.84760242027208,3.83025735013373 -38.300694796194556,-3.191881125111445 c-15.175746994718596,-6.383762250222888 -23.124947801475955,-7.022138475245174 -34.68742170221394,-1.276752450044578 c-11.562473900737977,5.107009800178311 -20.23432932629146,5.107009800178311 -32.51945784582557,0 c-13.730437757126348,-5.107009800178311 -23.124947801475955,-4.46863357515602 -42.63662250897129,3.83025735013373 c-20.23432932629146,8.29889092528975 -28.183530133048823,8.937267150312039 -43.35927712776741,3.191881125111445 c-13.007783138330225,-5.745386025200599 -22.402293182679834,-5.745386025200599 -36.13273093980618,0 c-12.285128519534103,5.107009800178311 -23.124947801475955,5.107009800178311 -37.57804017739843,0 c-10.839819281941853,-3.83025735013373 -41.191313271379045,-5.745386025200599 -67.20687954803951,-4.46863357515602 c-26.01556627666045,1.276752450044578 -127.18721290811774,3.191881125111445 -225.46824106439058,3.191881125111445 l-179.21834546143867,0.6383762250222905 l0,15.321029400534929 c0,38.30257350133732 -120.68332133895264,639.6529774723331 -200.8979840253224,999.697168384904 l-20.23432932629146,93.84130507827642 l43.35927712776741,18.512910525646365 c151.75746994718594,66.391127402318 1397.6140327517028,582.8374934453494 1404.8405789396643,582.8374934453494 c5.058582331572865,0 8.671855425553485,-3.83025735013373 8.671855425553485,-7.6605147002674645 c0,-15.959405625557215 86.71855425553483,-165.97781850579503 127.18721290811774,-220.8781738577119 c161.1519799915356,-218.32466895762272 383.7296025807417,-356.85230978745926 659.7836669608608,-409.8375364643094 c249.31584348466262,-48.51659310169394 534.0417632903353,-23.61992032582468 742.1662935036189,63.199246277206576 c106.9528835818263,44.6863357515602 177.0503816050503,89.3726715031204 267.3822089545657,169.1696996309065 c113.45677515099139,99.58669110347707 205.95656635689525,229.17706478300158 259.4330081478084,363.23607203768233 c10.839819281941853,26.811801450936123 21.679638563883707,49.15496932671622 24.570257039068206,48.51659310169394 c2.1679638563883716,0 329.53050617103236,-135.97413592974752 726.9905465089004,-301.9519544355424 zm-2559.6426597758696,254.7121137838931 c17.34371085110697,-5.107009800178311 37.57804017739843,-10.214019600356618 45.527240984155796,-11.4907720504012 c7.226546187961236,-1.276752450044578 18.789020088699214,-4.46863357515602 24.570257039068206,-6.383762250222888 c13.007783138330225,-5.107009800178311 158.2613615163511,-34.47231615120359 173.43710851106965,-35.749068601248155 c5.781236950368989,0 27.460875514252695,-3.191881125111445 46.97255022174804,-6.383762250222888 c203.0659478817107,-36.387444826270446 455.2724098415579,-52.98522667684995 690.1351609502982,-45.96308820160478 c65.76157031044724,1.9151286750668661 259.4330081478084,19.15128675066866 274.608755142527,24.25829655084697 c5.781236950368989,1.9151286750668661 13.007783138330225,3.83025735013373 15.898401613514718,3.191881125111445 c2.1679638563883716,-0.6383762250222905 26.738220895456575,3.191881125111445 54.19909640970927,8.937267150312039 c26.738220895456575,5.107009800178311 63.59360645405887,12.129148275423486 81.65997192396196,15.321029400534929 c33.242112464621684,5.745386025200599 144.53092375922472,33.83393992618131 169.1011807982929,42.13283085147105 c12.285128519534103,4.46863357515602 10.839819281941853,-0.6383762250222905 -9.394510044349609,-33.195563701159 c-67.92953416683562,-107.2472058037445 -189.3355101245844,-227.90031233295701 -288.33919289965326,-285.354172584963 c-157.53870689755493,-92.56455262823187 -320.1359961266828,-131.50550235459147 -521.7566347708012,-123.84498765432399 c-298.4563575627991,10.852395825378908 -527.5378717211702,111.07746315387824 -686.5218878563174,298.7600733104312 c-36.8553855586023,43.40958330151563 -114.17942976978755,165.33944228077277 -105.50757434423406,165.33944228077277 c2.1679638563883716,0 18.06636546990309,-4.46863357515602 35.41007632101006,-9.57564337533433 zm1524.801245659821,-277.69365788469554 c36.8553855586023,-17.874534300624077 41.191313271379045,-21.704791650757816 32.51945784582557,-30.003682576047566 c-9.394510044349609,-7.6605147002674645 -17.34371085110697,-5.107009800178311 -61.4256425976705,17.236158075601804 c-53.47644179091315,26.811801450936123 -59.98033336007826,29.365306351025286 -59.98033336007826,19.15128675066866 c0,-3.191881125111445 20.95698394508759,-15.959405625557215 46.97255022174804,-28.72693012600299 c26.01556627666045,-12.767524500445775 46.97255022174804,-25.53504900089155 46.97255022174804,-28.088553900980695 c0,-2.553504900089155 -5.781236950368989,-9.57564337533433 -13.007783138330225,-15.321029400534929 c-12.285128519534103,-10.214019600356618 -15.898401613514718,-8.937267150312039 -62.148297216466624,22.3431678757801 l-48.417859459340285,32.55718747613671 l27.460875514252695,24.896672775869266 c22.402293182679834,20.428039200713233 28.183530133048823,22.981544100802388 37.57804017739843,15.321029400534929 c6.503891569165113,-4.46863357515602 30.351493989437195,-17.874534300624077 53.47644179091315,-29.365306351025286 zm-119.96066672015652,-83.6272854779198 c44.08193174656353,-31.28043502609215 45.527240984155796,-33.195563701159 33.96476708341781,-44.6863357515602 c-12.285128519534103,-12.129148275423486 -13.007783138330225,-11.4907720504012 -36.8553855586023,3.83025735013373 c-13.007783138330225,8.937267150312039 -34.68742170221394,22.981544100802388 -47.695204840544164,31.91881125111443 c-13.730437757126348,8.937267150312039 -26.738220895456575,15.959405625557215 -28.906184751844943,15.959405625557215 c-13.730437757126348,0 -0.7226546187961252,-14.044276950490348 39.746004033786804,-41.49445462644876 l44.08193174656353,-30.003682576047566 l-17.34371085110697,-12.129148275423486 c-18.06636546990309,-12.129148275423486 -167.65587156070072,-82.35053302787524 -175.60507236745804,-82.35053302787524 c-2.1679638563883716,0 -4.335927712776742,3.83025735013373 -4.335927712776742,8.29889092528975 c0,3.83025735013373 -11.562473900737977,23.61992032582468 -25.292911657864327,42.77120707649334 c-22.402293182679834,31.91881125111443 -23.84760242027208,35.749068601248155 -13.007783138330225,42.77120707649334 c10.11716466314573,7.022138475245174 15.175746994718596,3.83025735013373 36.8553855586023,-22.3431678757801 c13.007783138330225,-16.5977818505795 26.738220895456575,-33.83393992618131 29.62883937064107,-38.94094972635961 c3.613273093980618,-4.46863357515602 9.394510044349609,-7.6605147002674645 14.453092375922472,-6.383762250222888 c4.335927712776742,1.276752450044578 -3.613273093980618,18.512910525646365 -20.95698394508759,40.85607840142647 c-26.738220895456575,35.11069237622589 -28.183530133048823,38.94094972635961 -16.621056232310842,46.60146442662707 c19.511674707495338,12.767524500445775 26.01556627666045,9.57564337533433 56.367060266097646,-30.642058801069858 c15.898401613514718,-21.066415425735524 31.074148608233312,-38.30257350133732 34.68742170221394,-38.30257350133732 c10.839819281941853,0 4.335927712776742,15.321029400534929 -18.789020088699214,44.04795952653792 c-35.41007632101006,44.04795952653792 -35.41007632101006,44.04795952653792 -20.23432932629146,51.70847422680536 c13.007783138330225,5.745386025200599 18.06636546990309,1.9151286750668661 45.527240984155796,-31.91881125111443 c28.906184751844943,-36.387444826270446 41.91396789017518,-46.60146442662707 41.91396789017518,-31.91881125111443 c0,3.83025735013373 -13.730437757126348,22.981544100802388 -29.62883937064107,42.13283085147105 c-16.621056232310842,19.15128675066866 -28.183530133048823,36.387444826270446 -26.01556627666045,38.30257350133732 c5.781236950368989,5.745386025200599 51.308477934524774,33.83393992618131 54.92175102850539,34.47231615120359 c1.4453092375922476,0 23.124947801475955,-14.682653175512643 49.14051407813641,-32.55718747613671 zm2078.354683657651,-263.6493809342052 c260.8783173854006,-318.5497362861221 544.1589279534811,-936.4979221076975 818.0450284772121,-1781.7080440372079 c64.316261072855,-200.4501346569987 179.94100008023477,-584.1142458953942 175.60507236745804,-586.6677507954832 c-0.7226546187961252,-0.6383762250222905 -13.730437757126348,-8.29889092528975 -27.460875514252695,-17.236158075601804 c-13.730437757126348,-8.937267150312039 -28.183530133048823,-17.874534300624077 -32.51945784582557,-19.15128675066866 c-3.613273093980618,-1.276752450044578 -26.01556627666045,-12.767524500445775 -49.14051407813641,-24.896672775869266 c-23.84760242027208,-12.129148275423486 -52.75378717211703,-28.088553900980695 -65.03891569165114,-34.47231615120359 c-13.007783138330225,-6.383762250222888 -37.57804017739843,-19.15128675066866 -55.64440564730152,-28.088553900980695 c-18.06636546990309,-8.937267150312039 -33.96476708341781,-17.874534300624077 -36.13273093980618,-19.78966297569095 c-2.1679638563883716,-1.9151286750668661 -28.183530133048823,-14.682653175512643 -57.812369503689894,-28.088553900980695 c-29.62883937064107,-12.767524500445775 -107.67553820062241,-48.51659310169394 -173.43710851106965,-77.88189945271922 c-65.76157031044724,-30.003682576047566 -121.40597595774877,-54.261979126894545 -124.29659443293325,-54.261979126894545 c-2.8906184751844943,0 -28.906184751844943,-9.57564337533433 -57.812369503689894,-21.704791650757816 c-28.906184751844943,-12.129148275423486 -75.15608035479686,-29.365306351025286 -103.33961048784569,-38.94094972635961 c-27.460875514252695,-9.57564337533433 -53.47644179091315,-19.15128675066866 -57.812369503689894,-21.066415425735524 c-3.613273093980618,-2.553504900089155 -10.11716466314573,-4.46863357515602 -14.453092375922472,-5.107009800178311 c-3.613273093980618,-0.6383762250222905 -16.621056232310842,-4.46863357515602 -28.906184751844943,-8.937267150312039 c-11.562473900737977,-3.83025735013373 -23.124947801475955,-7.6605147002674645 -25.292911657864327,-7.6605147002674645 c-2.1679638563883716,0 -29.62883937064107,-8.29889092528975 -61.4256425976705,-17.874534300624077 c-64.316261072855,-19.78966297569095 -197.28471093134175,-49.79334555173853 -248.5931888658665,-55.53873157693912 c-18.06636546990309,-1.9151286750668661 -38.300694796194556,-5.745386025200599 -44.80458636535967,-8.937267150312039 c-5.781236950368989,-2.553504900089155 -15.175746994718596,-2.553504900089155 -20.23432932629146,0 c-13.007783138330225,7.022138475245174 -51.308477934524774,88.73429527809812 -51.308477934524774,109.16233447881136 c0,8.937267150312039 15.898401613514718,90.64942395316497 35.41007632101006,181.93722413135225 c56.367060266097646,263.01100470918294 56.367060266097646,263.01100470918294 38.300694796194556,307.6973404607432 c-22.402293182679834,52.98522667684995 -42.63662250897129,134.05900725468064 -55.64440564730152,221.51655008273417 c-12.285128519534103,86.81916660303126 -26.738220895456575,358.12906223750394 -21.679638563883707,415.5829224895099 c1.4453092375922476,21.066415425735524 5.058582331572865,96.39480997836561 7.226546187961236,167.8929471808619 c10.839819281941853,352.3836762123034 75.87873497359297,850.3171317296883 147.4215422344092,1124.8189084892726 c31.074148608233312,120.65310652921254 59.25767874128214,259.1807473590492 72.98811649840849,360.682567137593 c5.058582331572865,35.11069237622589 10.11716466314573,68.30625607738487 12.285128519534103,73.4132658775632 c3.613273093980618,10.852395825378908 43.35927712776741,-28.72693012600299 105.50757434423406,-104.69370090365534 zm-5238.523331653099,-96.39480997836561 c250.7611527222549,-1129.2875420644289 359.88200016046954,-1962.3685157185162 281.1126467116921,-2149.412749650046 c-18.06636546990309,-44.04795952653792 -20.95698394508759,-218.32466895762272 -5.781236950368989,-368.34308183786055 l13.007783138330225,-125.1217401043686 l-40.46865865258292,-54.90035535191682 l-39.746004033786804,-54.90035535191682 l-49.14051407813641,5.745386025200599 c-54.92175102850539,5.107009800178311 -70.09749802322399,7.6605147002674645 -118.51535748256428,16.5977818505795 c-71.54280726081625,13.405900725468063 -141.64030528404024,28.72693012600299 -155.37074304116658,33.83393992618131 c-7.949200806757361,3.191881125111445 -40.46865865258292,12.767524500445775 -72.26546187961236,22.3431678757801 c-58.535024122486014,16.5977818505795 -133.69110447728286,40.85607840142647 -174.88241774866194,57.45386025200598 c-12.285128519534103,5.107009800178311 -24.570257039068206,8.937267150312039 -27.460875514252695,8.937267150312039 c-2.8906184751844943,0 -29.62883937064107,10.214019600356618 -59.98033336007826,23.61992032582468 c-31.074148608233312,12.767524500445775 -59.98033336007826,22.981544100802388 -64.316261072855,22.981544100802388 c-5.058582331572865,0 -9.394510044349609,2.553504900089155 -9.394510044349609,4.46863357515602 c0,2.553504900089155 -10.839819281941853,8.29889092528975 -23.124947801475955,12.767524500445775 c-36.13273093980618,12.129148275423486 -146.6988876156131,60.645741377117425 -165.4879077043123,72.77488965254089 c-9.394510044349609,5.745386025200599 -22.402293182679834,10.214019600356618 -29.62883937064107,10.214019600356618 c-7.226546187961236,0 -13.007783138330225,2.553504900089155 -13.007783138330225,5.745386025200599 c0,3.191881125111445 -10.839819281941853,8.937267150312039 -23.124947801475955,13.405900725468063 c-13.007783138330225,5.107009800178311 -28.183530133048823,11.4907720504012 -33.96476708341781,15.321029400534929 c-10.839819281941853,7.6605147002674645 -108.39819281941854,56.17710780196141 -138.02703219005963,68.94463230240719 c-10.11716466314573,3.83025735013373 -23.124947801475955,10.852395825378908 -28.906184751844943,15.321029400534929 c-5.781236950368989,4.46863357515602 -18.789020088699214,12.129148275423486 -28.906184751844943,16.5977818505795 c-56.367060266097646,27.45017767595841 -72.26546187961236,38.94094972635961 -68.65218878563175,49.15496932671622 c1.4453092375922476,5.745386025200599 27.460875514252695,86.18079037800898 57.08971488489377,179.3837192312631 c229.08151415837116,720.0883818251417 474.06142993025713,1379.5310222731657 659.7836669608608,1774.0475293369404 c99.72633739386508,211.9409067073998 213.18311254485647,411.11428891435395 282.55795594928435,494.7415743922738 c22.402293182679834,27.45017767595841 26.738220895456575,30.003682576047566 31.796803227029436,19.15128675066866 c2.8906184751844943,-6.383762250222888 23.124947801475955,-92.56455262823187 44.80458636535967,-190.87449128166432 zm6218.442994740644,-2328.1580926562865 c-15.898401613514718,-10.214019600356618 -29.62883937064107,-17.874534300624077 -31.796803227029436,-17.874534300624077 c-1.4453092375922476,0 -20.95698394508759,-9.57564337533433 -41.91396789017518,-21.704791650757816 c-38.300694796194556,-21.704791650757816 -62.87095183526276,-34.47231615120359 -127.90986752691389,-67.02950362734032 c-18.06636546990309,-8.29889092528975 -33.96476708341781,-17.236158075601804 -36.13273093980618,-19.15128675066866 c-6.503891569165113,-7.022138475245174 -338.2023615965858,-154.48704645539385 -373.61243791759586,-166.61619473081734 c-13.007783138330225,-4.46863357515602 -23.84760242027208,-10.214019600356618 -23.84760242027208,-12.767524500445775 c0,-1.9151286750668661 -4.335927712776742,-4.46863357515602 -8.671855425553485,-4.46863357515602 c-5.058582331572865,0 -23.84760242027208,-5.745386025200599 -41.91396789017518,-12.767524500445775 c-18.06636546990309,-7.022138475245174 -52.0311325533209,-19.15128675066866 -75.87873497359297,-27.45017767595841 c-23.84760242027208,-8.29889092528975 -46.24989560295191,-17.236158075601804 -50.58582331572865,-20.428039200713233 c-3.613273093980618,-2.553504900089155 -10.839819281941853,-5.107009800178311 -15.175746994718596,-5.107009800178311 c-5.058582331572865,0 -18.06636546990309,-3.191881125111445 -29.62883937064107,-7.6605147002674645 c-23.124947801475955,-8.29889092528975 -20.23432932629146,-7.6605147002674645 -50.58582331572865,-14.044276950490348 c-13.007783138330225,-2.553504900089155 -23.84760242027208,-7.6605147002674645 -23.84760242027208,-10.852395825378908 c0,-3.83025735013373 -2.8906184751844943,-5.107009800178311 -7.226546187961236,-2.553504900089155 c-3.613273093980618,1.9151286750668661 -18.789020088699214,-0.6383762250222905 -33.242112464621684,-6.383762250222888 c-14.453092375922472,-5.107009800178311 -30.351493989437195,-9.57564337533433 -36.13273093980618,-9.57564337533433 c-5.058582331572865,0 -18.06636546990309,-3.191881125111445 -29.62883937064107,-7.6605147002674645 c-10.839819281941853,-3.83025735013373 -23.124947801475955,-7.6605147002674645 -27.460875514252695,-7.6605147002674645 c-28.183530133048823,-3.191881125111445 -154.64808842237045,-25.53504900089155 -167.65587156070072,-30.003682576047566 c-11.562473900737977,-3.83025735013373 -19.511674707495338,-2.553504900089155 -27.460875514252695,4.46863357515602 c-16.621056232310842,14.682653175512643 -8.671855425553485,19.15128675066866 39.023349414990676,23.61992032582468 c43.35927712776741,4.46863357515602 192.94878321856498,33.83393992618131 206.67922097569138,41.49445462644876 c3.613273093980618,1.9151286750668661 11.562473900737977,4.46863357515602 18.06636546990309,4.46863357515602 c10.839819281941853,1.276752450044578 123.57393981413715,34.47231615120359 158.9840161351472,46.60146442662707 c10.11716466314573,3.83025735013373 36.13273093980618,12.767524500445775 57.812369503689894,20.428039200713233 c41.91396789017518,14.682653175512643 75.87873497359297,27.45017767595841 112.01146591339916,41.49445462644876 c64.316261072855,24.25829655084697 296.28839370641066,127.03686877943547 298.4563575627991,131.50550235459147 c1.4453092375922476,3.191881125111445 8.671855425553485,5.745386025200599 15.175746994718596,5.745386025200599 c7.226546187961236,0 21.679638563883707,5.745386025200599 31.796803227029436,12.767524500445775 c10.11716466314573,7.022138475245174 20.23432932629146,12.767524500445775 23.124947801475955,12.767524500445775 c2.8906184751844943,0 37.57804017739843,16.5977818505795 77.32404421118522,37.02582105129273 c39.746004033786804,19.78966297569095 85.27324501794259,42.77120707649334 101.89430125025343,51.0700980017831 c16.621056232310842,7.6605147002674645 31.796803227029436,16.5977818505795 33.96476708341781,19.15128675066866 c2.1679638563883716,2.553504900089155 11.562473900737977,8.29889092528975 21.679638563883707,12.767524500445775 c26.01556627666045,11.4907720504012 67.20687954803951,33.195563701159 75.87873497359297,40.21770217640419 c4.335927712776742,3.83025735013373 8.671855425553485,1.9151286750668661 11.562473900737977,-5.107009800178311 c2.8906184751844943,-8.29889092528975 -3.613273093980618,-15.959405625557215 -23.124947801475955,-28.72693012600299 zm-7272.796083564188,7.6605147002674645 c12.285128519534103,-5.107009800178311 23.124947801475955,-11.4907720504012 25.292911657864327,-13.405900725468063 c2.1679638563883716,-2.553504900089155 17.34371085110697,-10.852395825378908 34.68742170221394,-19.15128675066866 c16.621056232310842,-8.29889092528975 42.63662250897129,-21.704791650757816 57.812369503689894,-29.365306351025286 c32.51945784582557,-17.236158075601804 59.98033336007826,-30.642058801069858 131.52314062089448,-65.11437495227342 c68.65218878563175,-33.195563701159 315.80006841390605,-141.71952195494805 327.362542314644,-143.63465063001493 c4.335927712776742,-1.276752450044578 31.074148608233312,-10.852395825378908 57.812369503689894,-21.704791650757816 c27.460875514252695,-11.4907720504012 53.47644179091315,-20.428039200713233 58.535024122486014,-20.428039200713233 c5.058582331572865,0 11.562473900737977,-2.553504900089155 15.898401613514718,-6.383762250222888 c5.781236950368989,-5.107009800178311 148.86685147200149,-52.98522667684995 172.71445389227355,-57.45386025200598 c4.335927712776742,-0.6383762250222905 14.453092375922472,-3.83025735013373 23.84760242027208,-7.022138475245174 c9.394510044349609,-3.191881125111445 22.402293182679834,-5.745386025200599 29.62883937064107,-5.745386025200599 c6.503891569165113,0 15.175746994718596,-2.553504900089155 19.511674707495338,-6.383762250222888 c3.613273093980618,-3.191881125111445 16.621056232310842,-7.022138475245174 28.906184751844943,-8.29889092528975 c11.562473900737977,-1.276752450044578 24.570257039068206,-3.83025735013373 28.183530133048823,-5.745386025200599 c12.285128519534103,-6.383762250222888 86.71855425553483,-19.15128675066866 180.6636546990309,-31.28043502609215 c31.796803227029436,-3.83025735013373 58.535024122486014,-7.6605147002674645 59.98033336007826,-8.937267150312039 c0.7226546187961252,-0.6383762250222905 0,-5.745386025200599 -2.1679638563883716,-10.852395825378908 c-3.613273093980618,-8.29889092528975 -13.730437757126348,-8.29889092528975 -78.04669882998135,-0.6383762250222905 c-40.46865865258292,4.46863357515602 -101.1716466314573,14.044276950490348 -135.1364137148751,21.066415425735524 c-33.96476708341781,7.6605147002674645 -69.37484340442788,15.321029400534929 -79.4920080675736,16.5977818505795 c-10.11716466314573,1.9151286750668661 -24.570257039068206,5.745386025200599 -32.51945784582557,8.937267150312039 c-7.949200806757361,2.553504900089155 -45.527240984155796,14.044276950490348 -83.10528116155422,25.53504900089155 c-90.33182734951545,26.811801450936123 -186.4448916493999,60.00736515209513 -252.92911657864326,87.45754282805355 c-29.62883937064107,12.767524500445775 -57.08971488489377,22.981544100802388 -61.4256425976705,23.61992032582468 c-12.285128519534103,1.9151286750668661 -237.75336958392464,102.1401960035662 -247.8705342470704,110.43908692885594 c-4.335927712776742,3.83025735013373 -15.175746994718596,9.57564337533433 -23.124947801475955,11.4907720504012 c-7.949200806757361,2.553504900089155 -36.13273093980618,15.321029400534929 -62.148297216466624,29.365306351025286 c-26.01556627666045,14.044276950490348 -54.19909640970927,28.088553900980695 -62.87095183526276,31.91881125111443 c-8.671855425553485,3.83025735013373 -28.183530133048823,12.767524500445775 -42.63662250897129,20.428039200713233 c-113.45677515099139,59.368988927072856 -121.40597595774877,64.47599872725118 -121.40597595774877,76.60514700267464 c0,6.383762250222888 2.1679638563883716,10.852395825378908 5.781236950368989,9.57564337533433 c2.8906184751844943,-1.276752450044578 15.175746994718596,-6.383762250222888 26.738220895456575,-11.4907720504012 zm7327.717834592696,-90.64942395316497 c13.007783138330225,-45.32471197658251 18.789020088699214,-78.5202756777415 14.453092375922472,-79.79702812778608 c-4.335927712776742,-1.276752450044578 -86.71855425553483,-42.13283085147105 -184.2769277930115,-91.28780017818727 c-365.6632371108386,-185.12910525646373 -583.1822773684718,-270.67151940945047 -834.6660847095229,-328.76375588647875 c-93.22244582469995,-21.704791650757816 -203.0659478817107,-41.49445462644876 -227.63620492077894,-41.49445462644876 c-9.394510044349609,0 -20.23432932629146,16.5977818505795 -42.63662250897129,65.75275117729574 c-16.621056232310842,35.749068601248155 -29.62883937064107,67.02950362734032 -29.62883937064107,68.94463230240719 c0,1.9151286750668661 18.789020088699214,5.745386025200599 41.91396789017518,7.6605147002674645 c41.191313271379045,3.191881125111445 192.94878321856498,33.83393992618131 207.40187559448745,41.49445462644876 c3.613273093980618,1.9151286750668661 11.562473900737977,4.46863357515602 18.06636546990309,4.46863357515602 c12.285128519534103,1.276752450044578 119.2380121013604,33.195563701159 180.6636546990309,54.261979126894545 c21.679638563883707,7.6605147002674645 53.47644179091315,17.874534300624077 70.09749802322399,23.61992032582468 c17.34371085110697,5.107009800178311 32.51945784582557,12.129148275423486 35.41007632101006,15.321029400534929 c2.1679638563883716,3.191881125111445 8.671855425553485,5.745386025200599 14.453092375922472,5.745386025200599 c5.781236950368989,0 46.97255022174804,15.321029400534929 91.77713658710768,33.83393992618131 c44.80458636535967,18.512910525646365 88.88651811192324,37.66419727631502 99.00368277506892,41.49445462644876 c10.11716466314573,4.46863357515602 23.124947801475955,10.214019600356618 28.906184751844943,12.767524500445775 c22.402293182679834,11.4907720504012 55.64440564730152,26.173425225913835 110.56615667580694,49.79334555173853 c30.351493989437195,13.405900725468063 55.64440564730152,26.811801450936123 55.64440564730152,29.365306351025286 c0,2.553504900089155 3.613273093980618,5.107009800178311 7.949200806757361,5.107009800178311 c7.226546187961236,0 150.3121607095937,68.94463230240719 158.2613615163511,76.60514700267464 c2.1679638563883716,1.9151286750668661 15.898401613514718,8.937267150312039 31.074148608233312,15.321029400534929 c14.453092375922472,7.022138475245174 26.738220895456575,14.682653175512643 26.738220895456575,17.874534300624077 c0,2.553504900089155 2.1679638563883716,4.46863357515602 5.781236950368989,3.83025735013373 c5.058582331572865,-1.276752450044578 38.300694796194556,13.405900725468063 44.80458636535967,19.78966297569095 c4.335927712776742,5.107009800178311 45.527240984155796,25.53504900089155 51.308477934524774,26.173425225913835 c2.1679638563883716,0 13.007783138330225,-35.11069237622589 24.570257039068206,-77.88189945271922 zm-7342.170926968616,52.34685045182767 c12.285128519534103,-5.107009800178311 23.124947801475955,-11.4907720504012 25.292911657864327,-13.405900725468063 c2.1679638563883716,-2.553504900089155 17.34371085110697,-10.852395825378908 34.68742170221394,-19.15128675066866 c16.621056232310842,-8.29889092528975 41.91396789017518,-21.066415425735524 54.92175102850539,-28.088553900980695 c13.730437757126348,-7.022138475245174 46.97255022174804,-23.61992032582468 74.43342573600076,-37.02582105129273 c26.738220895456575,-13.405900725468063 57.08971488489377,-28.72693012600299 67.20687954803951,-33.83393992618131 c44.08193174656353,-22.981544100802388 313.6321045575176,-138.52764082983663 322.3039599830712,-138.52764082983663 c5.781236950368989,0 10.11716466314573,-2.553504900089155 10.11716466314573,-5.107009800178311 c0,-2.553504900089155 7.226546187961236,-7.022138475245174 16.621056232310842,-9.57564337533433 c8.671855425553485,-1.9151286750668661 30.351493989437195,-9.57564337533433 48.417859459340285,-16.5977818505795 c17.34371085110697,-7.022138475245174 35.41007632101006,-13.405900725468063 39.746004033786804,-14.044276950490348 c3.613273093980618,-0.6383762250222905 10.839819281941853,-2.553504900089155 14.453092375922472,-5.107009800178311 c12.285128519534103,-6.383762250222888 163.31994384792392,-56.17710780196141 168.37852617949682,-54.90035535191682 c2.8906184751844943,0.6383762250222905 14.453092375922472,-2.553504900089155 25.292911657864327,-6.383762250222888 c11.562473900737977,-4.46863357515602 26.01556627666045,-7.6605147002674645 33.242112464621684,-7.6605147002674645 c6.503891569165113,0 15.175746994718596,-2.553504900089155 19.511674707495338,-6.383762250222888 c3.613273093980618,-3.191881125111445 16.621056232310842,-7.022138475245174 28.906184751844943,-8.29889092528975 c11.562473900737977,-1.276752450044578 24.570257039068206,-3.83025735013373 28.906184751844943,-6.383762250222888 c10.11716466314573,-5.107009800178311 140.91765066524408,-28.088553900980695 192.94878321856498,-33.195563701159 c22.402293182679834,-2.553504900089155 41.191313271379045,-7.022138475245174 41.191313271379045,-9.57564337533433 c0,-2.553504900089155 -6.503891569165113,-20.428039200713233 -13.730437757126348,-40.21770217640419 c-7.949200806757361,-19.78966297569095 -16.621056232310842,-49.15496932671622 -19.511674707495338,-65.75275117729574 l-5.058582331572865,-30.003682576047566 l-57.08971488489377,4.46863357515602 c-242.81195191549753,17.874534300624077 -945.2322413853298,267.47963828433893 -1177.2043740188853,418.136427389599 l-47.695204840544164,31.28043502609215 l22.402293182679834,74.05164210258546 c12.285128519534103,40.85607840142647 23.84760242027208,73.4132658775632 26.01556627666045,72.13651342751864 c2.1679638563883716,-0.6383762250222905 13.730437757126348,-5.745386025200599 25.292911657864327,-10.852395825378908 zm3699.9916482361527,-3814.297944508174 c274.608755142527,-7.6605147002674645 393.8467672438874,-15.321029400534929 607.0298797887438,-38.30257350133732 c109.12084743821467,-11.4907720504012 171.2691446546813,-16.5977818505795 260.15566276660456,-20.428039200713233 c133.69110447728286,-6.383762250222888 588.2408597000447,-6.383762250222888 711.8147995141816,-0.6383762250222905 c173.43710851106965,8.29889092528975 332.42112464621687,17.236158075601804 383.00694796194546,21.704791650757816 c52.0311325533209,4.46863357515602 103.33961048784569,7.022138475245174 237.03071496512857,12.129148275423486 c98.28102815627282,4.46863357515602 109.84350205701078,3.83025735013373 109.84350205701078,-5.745386025200599 c0,-7.022138475245174 -6.503891569165113,-10.214019600356618 -23.124947801475955,-10.214019600356618 c-49.14051407813641,-0.6383762250222905 -198.73002016893395,-6.383762250222888 -237.03071496512857,-9.57564337533433 c-39.023349414990676,-3.191881125111445 -80.21466268636973,-5.745386025200599 -213.18311254485647,-12.767524500445775 c-35.41007632101006,-2.553504900089155 -79.4920080675736,-5.107009800178311 -97.5583735374767,-6.383762250222888 c-18.06636546990309,-1.9151286750668661 -78.04669882998135,-4.46863357515602 -133.69110447728286,-7.022138475245174 c-55.64440564730152,-1.9151286750668661 -128.63252214571,-4.46863357515602 -162.5972892291278,-5.745386025200599 c-81.65997192396196,-3.191881125111445 -384.4522571995378,-3.191881125111445 -466.8348837422959,0 c-169.1011807982929,7.022138475245174 -222.57762258920607,10.852395825378908 -443.7099359408199,31.91881125111443 c-179.21834546143867,17.236158075601804 -229.08151415837116,21.066415425735524 -357.71403630408116,25.53504900089155 c-47.695204840544164,1.9151286750668661 -132.24579523969064,5.107009800178311 -187.89020088699215,7.022138475245174 c-263.7689358605851,11.4907720504012 -1104.938912139273,4.46863357515602 -1701.851627264871,-13.405900725468063 c-53.47644179091315,-1.9151286750668661 -148.14419685320533,-4.46863357515602 -209.56983945087583,-5.745386025200599 c-143.8082691404286,-3.83025735013373 -383.7296025807417,-10.852395825378908 -397.4600403378679,-11.4907720504012 c-29.62883937064107,-1.9151286750668661 -57.812369503689894,1.9151286750668661 -57.812369503689894,7.022138475245174 c0,10.214019600356618 33.96476708341781,12.129148275423486 422.75295199573236,22.981544100802388 c63.59360645405887,1.9151286750668661 171.2691446546813,4.46863357515602 238.4760242027208,6.383762250222888 c67.92953416683562,1.9151286750668661 173.43710851106965,5.107009800178311 234.86275110874018,6.383762250222888 c61.4256425976705,1.9151286750668661 198.00736555013785,4.46863357515602 302.7922852755758,6.383762250222888 c105.50757434423406,1.9151286750668661 192.2261285997689,3.83025735013373 192.94878321856498,5.107009800178311 c3.613273093980618,3.191881125111445 853.455104798222,-0.6383762250222905 989.3141731318932,-5.107009800178311 zm-149.5895060907976,-31.91881125111443 c315.80006841390605,-6.383762250222888 434.31542589647023,-12.767524500445775 633.7681006842002,-31.91881125111443 c87.44120887433097,-8.29889092528975 165.4879077043123,-15.959405625557215 173.43710851106965,-15.959405625557215 c18.789020088699214,-0.6383762250222905 70.09749802322399,-4.46863357515602 115.62473900737977,-8.937267150312039 c200.8979840253224,-19.15128675066866 627.2642091150352,-16.5977818505795 1018.9430125025344,5.745386025200599 c31.796803227029436,1.276752450044578 87.44120887433097,4.46863357515602 122.851285195341,6.383762250222888 c36.13273093980618,1.9151286750668661 76.6013895923891,5.107009800178311 90.33182734951545,6.383762250222888 c47.695204840544164,5.107009800178311 184.2769277930115,10.852395825378908 241.36664267790528,10.852395825378908 c39.023349414990676,0 58.535024122486014,-3.191881125111445 62.87095183526276,-8.937267150312039 c3.613273093980618,-4.46863357515602 6.503891569165113,-30.003682576047566 6.503891569165113,-56.815484026983704 c0,-26.811801450936123 2.1679638563883716,-70.22138475245178 4.335927712776742,-96.39480997836561 l5.058582331572865,-47.87821687667165 l-104.0622651066418,-3.83025735013373 c-57.08971488489377,-2.553504900089155 -193.67143783736114,-10.214019600356618 -302.7922852755758,-17.236158075601804 c-333.14377926501294,-21.066415425735524 -559.3346749481997,-27.45017767595841 -791.3068075817555,-23.61992032582468 c-234.14009648994406,4.46863357515602 -308.5735222259447,8.937267150312039 -563.6706026609763,33.195563701159 c-240.64398805910918,22.981544100802388 -343.2609439281587,28.088553900980695 -707.4788718014051,35.749068601248155 c-420.584988139344,8.29889092528975 -1123.7279322279724,-1.276752450044578 -1890.4644827706595,-26.173425225913835 c-105.50757434423406,-3.191881125111445 -225.46824106439058,-6.383762250222888 -267.3822089545657,-7.022138475245174 l-75.87873497359297,-1.276752450044578 l-2.1679638563883716,106.6088295787222 l-1.4453092375922476,105.9704533536999 l23.124947801475955,0 c13.007783138330225,0 59.98033336007826,1.276752450044578 103.33961048784569,3.191881125111445 c44.08193174656353,1.276752450044578 139.47234142765186,4.46863357515602 213.18311254485647,6.383762250222888 c73.7107711172046,1.9151286750668661 171.2691446546813,5.107009800178311 216.79638563883708,6.383762250222888 c167.65587156070072,6.383762250222888 557.8893657106074,14.682653175512643 892.4784542132127,19.15128675066866 c138.74968680885576,2.553504900089155 252.92911657864326,4.46863357515602 253.6517711974394,5.107009800178311 c2.8906184751844943,2.553504900089155 334.58908850260525,-0.6383762250222905 528.9831809587625,-5.107009800178311 z\" id=\"svg_1\" class=\"\" transform=\"rotate(-180 3901.2551269531255,3880.8454589843745) \"/></g></svg>\r\n\r\n    <svg style=\"position: absolute\" xmlns:svg=\"http://www.w3.org/2000/svg\"\r\n         viewBox=\"0 0 8014.99998211861 8065.000060796734\" >\r\n      <svg:g box *ngFor=\"let svg of svgs\" [svg]=\"svg\" (select)=\"onselect($event)\">\r\n      </svg:g>\r\n    </svg>\r\n  </div>\r\n  <div class=\"col-md-5\">\r\n    id={{ selectedSvg?selectedSvg.id:''}} fill={{ selectedSvg?selectedSvg.fill:''}}\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/logo-with-components/logo-with-components.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoWithComponentsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__svg_service_service__ = __webpack_require__("../../../../../src/app/svg-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LogoWithComponentsComponent = (function () {
    function LogoWithComponentsComponent(svgService) {
        this.svgService = svgService;
        this.hc = false;
    }
    LogoWithComponentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.svgService.getSvgs().then(function (svgs) { return _this.svgs = svgs; });
    };
    LogoWithComponentsComponent.prototype.onselect = function (event) {
        this.selectedSvg = event;
    };
    LogoWithComponentsComponent.prototype.mouseout = function (event) {
        console.log(event);
        this.hc = false;
    };
    LogoWithComponentsComponent.prototype.mouseover = function (event) {
        this.hc = true;
    };
    return LogoWithComponentsComponent;
}());
LogoWithComponentsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-logo-with-components',
        template: __webpack_require__("../../../../../src/app/logo-with-components/logo-with-components.component.html"),
        styles: [__webpack_require__("../../../../../src/app/logo.css"), __webpack_require__("../../../../../src/app/logo-with-components/logo-with-components.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__svg_service_service__["b" /* SvgServiceService */]],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__svg_service_service__["b" /* SvgServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__svg_service_service__["b" /* SvgServiceService */]) === "function" && _a || Object])
], LogoWithComponentsComponent);

var _a;
//# sourceMappingURL=logo-with-components.component.js.map

/***/ }),

/***/ "../../../../../src/app/logo-with-components/logo-with-components.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoWithComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logo_with_components_component__ = __webpack_require__("../../../../../src/app/logo-with-components/logo-with-components.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logo_a_component__ = __webpack_require__("../../../../../src/app/logo-with-components/logo-a.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__svg_ng_for_directive__ = __webpack_require__("../../../../../src/app/svg-ng-for.directive.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    { path: 'svgdemo/svg/components', component: __WEBPACK_IMPORTED_MODULE_3__logo_with_components_component__["a" /* LogoWithComponentsComponent */] }
];
var LogoWithComponentsModule = (function () {
    function LogoWithComponentsModule() {
    }
    return LogoWithComponentsModule;
}());
LogoWithComponentsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forChild(routes)
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__logo_with_components_component__["a" /* LogoWithComponentsComponent */],
            __WEBPACK_IMPORTED_MODULE_4__logo_a_component__["a" /* LogoAComponent */],
            __WEBPACK_IMPORTED_MODULE_5__svg_ng_for_directive__["a" /* SvgNgForDirective */],
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__logo_with_components_component__["a" /* LogoWithComponentsComponent */]
        ],
        providers: []
    })
], LogoWithComponentsModule);

//# sourceMappingURL=logo-with-components.module.js.map

/***/ }),

/***/ "../../../../../src/app/logo.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "svg {\r\n  display: block;\r\n  max-width: 300px;\r\n  margin: 0 auto;\r\n}\r\n.left, .shield {\r\n  fill:#DD0031;\r\n}\r\n.left-over{\r\n  stroke-width: 150px;\r\n  fill-opacity: 0;\r\n}\r\n.left-out{\r\n  fill-opacity: 0;\r\n  stroke-width: 0;\r\n}\r\n.right {\r\n  fill:#C3002F;\r\n}\r\n.a {\r\n  fill:#FFFFFF;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/profile/profile.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".highlight{\r\n  background-color: red;\r\n}\r\n\r\n.drophl{\r\n  background-color: #169E5D;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  profile-component works!  {{ ' id='+id+' address='+address}}\n\n</p>\n<h2>loading {{loading?'onloading':'success'}}</h2>\n<h2 [dragDirective]='id' [dragHightlight]=\"'highlight'\" (startDrag)=\"startDrag($event)\">drag me</h2>\n<h2 dropDirective\n    [dropHighlight]=\"'drophl'\"\n    (dropEvent)=\"onDrop($event)\" (dragenterEvent)=\"dragenterEvent($event)\">drop me</h2>\n<input type=\"file\" #fileInput placeholder=\"Upload file...\" />\n<button type=\"button\" (click)=\"upload()\">Upload</button>\n"

/***/ }),

/***/ "../../../../../src/app/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_angular__ = __webpack_require__("../../../../apollo-angular/build/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_tag__ = __webpack_require__("../../../../graphql-tag/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_tag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_graphql_tag__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// We use the gql tag to parse our query string into a query document
var CurrentUserForProfile = (_a = ["\n  query CurrentUserForProfile {\n    owner(id: 1) {\n    id\n    address\n  }\n  }\n"], _a.raw = ["\n  query CurrentUserForProfile {\n    owner(id: 1) {\n    id\n    address\n  }\n  }\n"], __WEBPACK_IMPORTED_MODULE_2_graphql_tag___default()(_a));
var ProfileComponent = (function () {
    function ProfileComponent(apollo, http) {
        this.apollo = apollo;
        this.http = http;
        this.id = 3;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.apollo.watchQuery({
            query: CurrentUserForProfile
        }).subscribe(function (respon) {
            var data = respon.data;
            _this.loading = respon.loading;
            _this.id = data.owner.id;
            _this.address = data.owner.address;
        });
    };
    ProfileComponent.prototype.startDrag = function (event) {
        console.log(event);
    };
    ProfileComponent.prototype.onDrop = function (event) {
        console.log(event);
    };
    ProfileComponent.prototype.dragenterEvent = function (event) {
        console.log(event);
    };
    ProfileComponent.prototype.upload = function () {
        var fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            var formData = new FormData();
            formData.append('image', fileBrowser.files[0]);
            this.http
                .post('/api/items/add', formData, {
                headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'my-auth-token'),
            })
                .subscribe(function (data) { return console.log(data); });
        }
    };
    return ProfileComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('fileInput'),
    __metadata("design:type", Object)
], ProfileComponent.prototype, "fileInput", void 0);
ProfileComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-profile',
        template: __webpack_require__("../../../../../src/app/profile/profile.component.html"),
        styles: [__webpack_require__("../../../../../src/app/profile/profile.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_apollo_angular__["a" /* Apollo */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_apollo_angular__["a" /* Apollo */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]) === "function" && _c || Object])
], ProfileComponent);

var _b, _c;
var _a;
//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/rectangle/rectangle.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".cp {\r\n  stroke: #101099;\r\n  stroke-width: 2;\r\n  fill: rgba(0, 0, 255, 0.78);\r\n\r\n  /* width: 10px;\r\n  height: 10px; */\r\n}\r\n\r\n.cr {\r\n  stroke: #169E5D;\r\n  stroke-width: 1;\r\n  fill: rgba(17, 191, 64, 0.78);\r\n  fill-opacity: 0.4;\r\n}\r\n\r\nsvg {\r\n  border: 1px solid;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/rectangle/rectangle.component.html":
/***/ (function(module, exports) {

module.exports = "<svg (mousemove)=\"mousemove($event)\"\r\n     (mousewheel)=\"scroll($event)\"\r\n     (zoom)=\"zoom($event)\"\r\n     (mouseover)=\"mouseover($event)\"\r\n     [attr.width]=\"rectangeWidth\" [attr.height]=\"rectangeHeight\" [attr.viewBox]=\"viewBox\"\r\n     preserveAspectRatio=\"none\"\r\n     xmlns:svg=\"http://www.w3.org/2000/svg\">\r\n  <svg:polygon points=\"125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2\" />\r\n  <svg:polygon points=\"125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2 125,30\" />\r\n  <svg:path d=\"M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h0h21.7h0L125,52.1L125,52.1L125,52.1L125,52.1\r\n      L125,52.1z M142,135.4H108l17-40.9L142,135.4z\" />\r\n  <g>\r\n    <!--region-->\r\n    <rect class=\"cr\" [attr.width]=\"x\" [attr.height]=\"y\" [attr.x]=\"0\" [attr.y]=\"0\" />\r\n\r\n    <!--left top-->\r\n    <rect class=\"cp\" width=\"10\" height=\"10\"  [attr.x]=\"-5\" [attr.y]=\"-5\" />\r\n    <!--right top-->\r\n    <rect class=\"cp\" width=\"10\" height=\"10\"  [attr.x]=\"x-5\" [attr.y]=\"-5\" />\r\n    <!--right bottom-->\r\n    <rect class=\"cp\" width=\"10\" height=\"10\"  [attr.x]=\"x-5\" [attr.y]=\"y-5\" />\r\n    <!--left bottom-->\r\n    <rect class=\"cp\" width=\"10\" height=\"10\"  [attr.x]=\"-5\" [attr.y]=\"y-5\" />\r\n  </g>\r\n</svg>\r\n"

/***/ }),

/***/ "../../../../../src/app/rectangle/rectangle.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RectangleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RectangleComponent = (function () {
    function RectangleComponent() {
        this.y = 0;
        this.x = 0;
        this.sc = 1;
        /**
         * viewBox x scale
         * @type {number}
         */
        this.viewBoxScX = 0.5;
        /**
         * viewBox y scale
         * @type {number}
         */
        this.viewBoxScY = 1;
        this.viewBoxX = 0;
        this.viewBoxY = 0;
        this.rectangeWidth = 400;
        this.rectangeHeight = 300;
    }
    RectangleComponent.prototype.ngOnInit = function () {
        this.viewBox = this.viewBoxX + " " + this.viewBoxY + " " + this.viewBoxScX * this.rectangeWidth + " " + this.viewBoxScY * this.rectangeHeight;
    };
    RectangleComponent.prototype.mouseover = function (event) {
    };
    RectangleComponent.prototype.mousemove = function (event) {
        this.x = Math.max(0, this.viewBoxX + event.offsetX * this.viewBoxScX);
        this.y = Math.max(0, this.viewBoxY + event.offsetY * this.viewBoxScY);
    };
    RectangleComponent.prototype.zoom = function (event) {
        // console.log(event);
    };
    RectangleComponent.prototype.scroll = function (event) {
        var actCursorX = this.viewBoxScX * event.x;
        var actCursorY = this.viewBoxScY * event.y;
        this.viewBoxScX = Math.max(0.2, (event.wheelDelta / 120 * 0.2 + this.viewBoxScX));
        this.viewBoxScX = Math.min(6, this.viewBoxScX);
        this.viewBoxScY = Math.max(0.2, (event.wheelDelta / 120 * 0.2 + this.viewBoxScY));
        this.viewBoxScY = Math.min(6, this.viewBoxScY);
        console.log(this.viewBoxScX);
        this.viewBoxX = actCursorX - this.viewBoxScX * this.rectangeWidth * 0.5;
        this.viewBoxY = actCursorY - this.viewBoxScY * this.rectangeHeight * 0.5;
        this.viewBox = this.viewBoxX + " " + this.viewBoxY + " " + this.viewBoxScX * this.rectangeWidth + " " + this.viewBoxScY * this.rectangeHeight;
    };
    return RectangleComponent;
}());
RectangleComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-rectangle',
        template: __webpack_require__("../../../../../src/app/rectangle/rectangle.component.html"),
        styles: [__webpack_require__("../../../../../src/app/rectangle/rectangle.component.css")]
    }),
    __metadata("design:paramtypes", [])
], RectangleComponent);

//# sourceMappingURL=rectangle.component.js.map

/***/ }),

/***/ "../../../../../src/app/svg-ng-for.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SvgNgForRow */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SvgNgForDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SvgNgForRow = (function () {
    function SvgNgForRow($implicit, index) {
        this.$implicit = $implicit;
        this.index = index;
    }
    Object.defineProperty(SvgNgForRow.prototype, "even", {
        get: function () {
            return this.index % 2 === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SvgNgForRow.prototype, "odd", {
        get: function () {
            return !this.even;
        },
        enumerable: true,
        configurable: true
    });
    return SvgNgForRow;
}());

var SvgNgForDirective = (function () {
    function SvgNgForDirective(_viewContainer, _template) {
        this._viewContainer = _viewContainer;
        this._template = _template;
    }
    Object.defineProperty(SvgNgForDirective.prototype, "ngForTemplate", {
        set: function (value) {
            if (value) {
                this._template = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    SvgNgForDirective.prototype.ngDoCheck = function () {
        var oldLen = this._viewContainer.length;
        var newLen = this.svgNgForOf.length;
        var minLen = Math.min(oldLen, newLen);
        // update existing rows
        for (var i = 0; i < minLen; i++) {
            var row = this.svgNgForOf[i];
            var viewRef = this._viewContainer.get(i);
            viewRef.context.$implicit = row;
        }
        // add missing rows
        for (var i = oldLen; i < newLen; i++) {
            var row = this.svgNgForOf[i];
            this._viewContainer.createEmbeddedView(this._template, new SvgNgForRow(row, i));
        }
        // remove superfluous rows
        for (var i = oldLen - 1; i >= newLen; i--) {
            this._viewContainer.remove(i);
        }
    };
    return SvgNgForDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Array)
], SvgNgForDirective.prototype, "svgNgForOf", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* TemplateRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* TemplateRef */]) === "function" && _a || Object),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* TemplateRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* TemplateRef */]) === "function" && _b || Object])
], SvgNgForDirective.prototype, "ngForTemplate", null);
SvgNgForDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Directive */])({ selector: '[svgNgFor][svgNgForOf]' }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewContainerRef */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* TemplateRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* TemplateRef */]) === "function" && _d || Object])
], SvgNgForDirective);

var _a, _b, _c, _d;
//# sourceMappingURL=svg-ng-for.directive.js.map

/***/ }),

/***/ "../../../../../src/app/svg-service.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Svg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SvgServiceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Svg = (function () {
    function Svg(id, points, fill, type) {
        this.type = 'polygon';
        this._id = id;
        this.points = points;
        this.fill = fill;
        this.type = type;
    }
    Object.defineProperty(Svg.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    return Svg;
}());

var SvgServiceService = (function () {
    function SvgServiceService() {
    }
    SvgServiceService.prototype.getSvgs = function () {
        return Promise.resolve([
            // new Svg(0, '125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2', 'red', 'path'),
            // new Svg(1, '125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2 125,30', 'green', 'path'),
            new Svg(0, 'M 2967.4997346848477 193.99992161989942 C 2967.4997346848477 193.99992161989942 3307.4997042864825 773.999869763863 3307.4997042864825 773.999869763863 C 3307.4997042864825 773.999869763863 4127.499630972777 893.999859035028 4127.499630972777 893.999859035028 C 4127.499630972777 893.999859035028 4627.499586269297 593.9998858571157 4620 580 C 4627.499586269297 593.9998858571157 4807.499570176043 193.99992161989942 4800 180 C 4807.499570176043 193.99992161989942 2967.4997346848477 193.99992161989942 2967.4997346848477 193.99992161989942 z', 'red', 'path'),
            new Svg(1, 'M 6547.499414607934 853.9998626113063 C 6547.499414607934 853.9998626113063 7647.49931626028 3533.9996230006554 7647.49931626028 3533.9996230006554 C 7647.49931626028 3533.9996230006554 6967.499377057012 3973.9995836615935 6967.499377057012 3973.9995836615935 C 6967.499377057012 3973.9995836615935 6247.499441430023 3993.999581873454 6247.499441430023 3993.999581873454 C 6247.499441430023 3993.999581873454 6107.499453946996 2993.999671280413 6107.499453946996 2993.999671280413 C 6107.499453946996 2993.999671280413 6247.499441430023 1553.9998000264347 6240 1540 C 6247.499441430023 1553.9998000264347 6547.499414607934 853.9998626113063 6547.499414607934 853.9998626113063 z', 'green', 'path'),
        ]);
    };
    return SvgServiceService;
}());
SvgServiceService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], SvgServiceService);

//# sourceMappingURL=svg-service.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__("../../../../../src/polyfills.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");






if (__WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_24" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../../src/polyfills.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_web_animations_js__ = __webpack_require__("../../../../web-animations-js/web-animations.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_web_animations_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_web_animations_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_reflect__ = __webpack_require__("../../../../core-js/es6/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es7_reflect__ = __webpack_require__("../../../../core-js/es7/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_zone_js_dist_zone__ = __webpack_require__("../../../../zone.js/dist/zone.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_zone_js_dist_zone__);
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/weak-map';
// import 'core-js/es6/set';
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** IE10 and IE11 requires the following to support `@angular/animation`. */
 // Run `npm install --save web-animations-js`.
/** Evergreen browsers require these. **/


/** ALL Firefox browsers require the following to support `@angular/animation`. **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run `npm install --save intl`.
/**
 * Need to import at least one locale-data with intl.
 */
// import 'intl/locale-data/jsonp/en';
//# sourceMappingURL=polyfills.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map
