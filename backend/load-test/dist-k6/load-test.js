"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
exports.default = default_1;
var http_1 = require("k6/http");
var k6_1 = require("k6");
exports.options = {
    vus: 10, // 10 virtual users
    duration: '10s', // run for 10 seconds
};
function default_1() {
    var res = http_1.default.get('http://localhost:3000/hello');
    (0, k6_1.check)(res, {
        'status is 200': function (r) { return r.status === 200; },
        'body is correct': function (r) {
            var bodyStr = typeof r.body === 'string' ? r.body : String.fromCharCode.apply(null, new Uint8Array(r.body));
            return bodyStr.includes('Hello from NestJS!');
        },
    });
    (0, k6_1.sleep)(1);
}
