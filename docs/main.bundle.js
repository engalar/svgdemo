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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewChild */])('canvas'),
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
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* NgZone */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */]) === "function" && _d || Object])
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
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_16" /* ViewChild */])('left'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ElementRef */]) === "function" && _a || Object)
], AnimatedLogoGsapComponent.prototype, "left", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_16" /* ViewChild */])('right'),
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
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* trigger */])('aState', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_32" /* state */])('small', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ transform: 'scale(1)' })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_32" /* state */])('large', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ transform: 'scale(4.2)' })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_32" /* state */])('over', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ fill: 'red' })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* transition */])('* => over', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* animate */])('5s ease', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* keyframes */])([
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ fill: 'blue', offset: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ fill: 'green', offset: 0.3 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ fill: 'red', offset: 0.6 }),
                ]))),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* transition */])('over => *', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* animate */])('5s ease', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* keyframes */])([
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ fill: 'red', offset: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ fill: 'green', offset: 0.3 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ fill: 'white', offset: 0.6 }),
                ]))),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* transition */])('small => large', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* animate */])('1s ease', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* keyframes */])([
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ transform: 'scale(1)', offset: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ transform: 'scale(0.7) rotate(15deg)', offset: 0.15 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ transform: 'scale(1)', offset: 0.3 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ transform: 'scale(4.2)', offset: 1 })
                ]))),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* transition */])('large => small', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* animate */])('1s ease', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* keyframes */])([
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ transform: 'scale(4.2)', offset: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ transform: 'scale(5) rotate(-15deg)', offset: 0.15 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ transform: 'scale(4.2)', offset: 0.3 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_33" /* style */])({ transform: 'scale(1)', offset: 1 })
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
    // {path: '', redirectTo: 'engalar/drawroi', pathMatch: 'full'},
    { path: '', redirectTo: 'svgdemo/svg/components', pathMatch: 'full' },
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

module.exports = "<ul class=\"nav\">\n  <li class=\"nav-item\">\n    <a routerLink=\"svgdemo/svg/components\" class=\"nav-link active\" href=\"#\">Cascad render</a>\n  </li>\n  <li class=\"nav-item\">\n    <a routerLink=\"svgdemo/engalar/drawroi\" class=\"nav-link\" href=\"#\">Draw Roi</a>\n  </li>\n</ul>\n<div class=\"container\">\n  <router-outlet>\n  </router-outlet>\n</div>\n\n"

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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_animated_canvas_logo_animated_canvas_logo_component__ = __webpack_require__("../../../../../src/app/animated-canvas-logo/animated-canvas-logo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_basic_logo_basic_logo_component__ = __webpack_require__("../../../../../src/app/basic-logo/basic-logo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_logo_with_bindings_logo_with_bindings_component__ = __webpack_require__("../../../../../src/app/logo-with-bindings/logo-with-bindings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_animated_logo_css_animated_logo_css_component__ = __webpack_require__("../../../../../src/app/animated-logo-css/animated-logo-css.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_animated_logo_gsap_animated_logo_gsap_component__ = __webpack_require__("../../../../../src/app/animated-logo-gsap/animated-logo-gsap.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_basic_canvas_logo_basic_canvas_logo_component__ = __webpack_require__("../../../../../src/app/basic-canvas-logo/basic-canvas-logo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_animated_logo_nganimate_animated_logo_nganimate_component__ = __webpack_require__("../../../../../src/app/animated-logo-nganimate/animated-logo-nganimate.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_changing_canvas_logo_changing_canvas_logo_module__ = __webpack_require__("../../../../../src/app/changing-canvas-logo/changing-canvas-logo.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_logo_with_components_logo_with_components_module__ = __webpack_require__("../../../../../src/app/logo-with-components/logo-with-components.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__rectangle_rectangle_component__ = __webpack_require__("../../../../../src/app/rectangle/rectangle.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6_app_basic_logo_basic_logo_component__["a" /* BasicLogoComponent */],
            __WEBPACK_IMPORTED_MODULE_7_app_logo_with_bindings_logo_with_bindings_component__["a" /* LogoWithBindingsComponent */],
            __WEBPACK_IMPORTED_MODULE_8_app_animated_logo_css_animated_logo_css_component__["a" /* AnimatedLogoCssComponent */],
            __WEBPACK_IMPORTED_MODULE_11_app_animated_logo_nganimate_animated_logo_nganimate_component__["a" /* AnimatedLogoNganimateComponent */],
            __WEBPACK_IMPORTED_MODULE_9_app_animated_logo_gsap_animated_logo_gsap_component__["a" /* AnimatedLogoGsapComponent */],
            __WEBPACK_IMPORTED_MODULE_10_app_basic_canvas_logo_basic_canvas_logo_component__["a" /* BasicCanvasLogoComponent */],
            __WEBPACK_IMPORTED_MODULE_5_app_animated_canvas_logo_animated_canvas_logo_component__["a" /* AnimatedCanvasLogoComponent */],
            __WEBPACK_IMPORTED_MODULE_14__rectangle_rectangle_component__["a" /* RectangleComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_4_app_app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_13_app_logo_with_components_logo_with_components_module__["a" /* LogoWithComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_12_app_changing_canvas_logo_changing_canvas_logo_module__["a" /* ChangingCanvasLogoModule */],
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewChild */])('canvas'),
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewChild */])('canvas'),
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
        this.hc = true;
        console.log(this.svg, 'logo-a');
    };
    LogoAComponent.prototype.mouseout = function (event) {
        this.hc = false;
    };
    return LogoAComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__svg_service_service__["a" /* Svg */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__svg_service_service__["a" /* Svg */]) === "function" && _a || Object)
], LogoAComponent.prototype, "svg", void 0);
LogoAComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: '[box]',
        template: "\n    <svg:polygon #rect [attr.dataId]=\"svg.id\"\n                 [attr.points]=\"svg.points\" [ngClass]=\"{'left-over':hc,'left-out':!hc}\" (mouseover)=\"mouseover($event)\"\n                 (mouseout)=\"mouseout($event)\"></svg:polygon>\n  ",
        styles: [__webpack_require__("../../../../../src/app/logo.css")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectionStrategy */].OnPush
    })
], LogoAComponent);

var _a;
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

module.exports = "<div style=\"position: relative\">\r\n\r\n  <svg style=\"position: absolute\" xmlns:svg=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 250 250\">\r\n    <svg:polygon class=\"left\"\r\n                 points=\"125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2\"/>\r\n    <svg:polygon class=\"right\"\r\n                 points=\"125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2 125,30\"/>\r\n    <svg:path class=\"a\" d=\"M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h0h21.7h0L125,52.1L125,52.1L125,52.1L125,52.1\r\n      L125,52.1z M142,135.4H108l17-40.9L142,135.4z\"/>\r\n  </svg>\r\n  <svg style=\"position: absolute\" style=\"position: absolute\" xmlns:svg=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 250 250\">\r\n    <svg:g box *ngFor=\"let svg of svgs\" [svg]=\"svg\">\r\n    </svg:g>\r\n  </svg>\r\n</div>\r\n"

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
exports.push([module.i, "svg {\r\n  display: block;\r\n  max-width: 300px;\r\n  margin: 0 auto;\r\n}\r\n.left, .shield {\r\n  fill:#DD0031;\r\n}\r\n.left-over{\r\n  stroke: blue;\r\n  stroke-width: 5px;\r\n  fill-opacity: 0;\r\n}\r\n.left-out{\r\n  fill-opacity: 0;\r\n}\r\n.right {\r\n  fill:#C3002F;\r\n}\r\n.a {\r\n  fill:#FFFFFF;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

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

module.exports = "<svg (mousemove)=\"mousemove($event)\" (zoom)=\"zoom($event)\" (mouseover)=\"mouseover($event)\" width=\"1000\" height=\"300\" xmlns:svg=\"http://www.w3.org/2000/svg\">\n  <svg:polygon points=\"125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2\" />\n  <svg:polygon points=\"125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2 125,30\" />\n  <svg:path d=\"M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h0h21.7h0L125,52.1L125,52.1L125,52.1L125,52.1\n      L125,52.1z M142,135.4H108l17-40.9L142,135.4z\" />\n  <g>\n    <!--region-->\n    <rect class=\"cr\" [attr.width]=\"x\" [attr.height]=\"y\" [attr.x]=\"0\" [attr.y]=\"0\" />\n\n    <!--left top-->\n    <rect class=\"cp\" width=\"10\" height=\"10\"  [attr.x]=\"-5\" [attr.y]=\"-5\" />\n    <!--right top-->\n    <rect class=\"cp\" width=\"10\" height=\"10\"  [attr.x]=\"x-5\" [attr.y]=\"-5\" />\n    <!--right bottom-->\n    <rect class=\"cp\" width=\"10\" height=\"10\"  [attr.x]=\"x-5\" [attr.y]=\"y-5\" />\n    <!--left bottom-->\n    <rect class=\"cp\" width=\"10\" height=\"10\"  [attr.x]=\"-5\" [attr.y]=\"y-5\" />\n  </g>\n</svg>\n"

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
    }
    RectangleComponent.prototype.ngOnInit = function () {
    };
    RectangleComponent.prototype.mouseover = function (event) {
    };
    RectangleComponent.prototype.mousemove = function (event) {
        this.x = event.offsetX;
        this.y = event.offsetY;
        console.log("x=" + this.x + " y=" + this.y);
    };
    RectangleComponent.prototype.zoom = function (event) {
        console.log(event);
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
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* TemplateRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* TemplateRef */]) === "function" && _a || Object),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* TemplateRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* TemplateRef */]) === "function" && _b || Object])
], SvgNgForDirective.prototype, "ngForTemplate", null);
SvgNgForDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Directive */])({ selector: '[svgNgFor][svgNgForOf]' }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* ViewContainerRef */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* TemplateRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* TemplateRef */]) === "function" && _d || Object])
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
    function Svg(id, points, fill) {
        this._id = id;
        this.points = points;
        this.fill = fill;
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
            new Svg(1, '125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2', 'red'),
            new Svg(2, '125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2 125,30', 'green'),
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");





if (__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_23" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
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