"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var utils_1 = require("./utils");
var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pages, keyword, name, data, allData, existingData, err_1, existingSet, _loop_1, _i, pages_1, page;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
                keyword = 'baby fashion show';
                name = "./".concat(keyword || 'random', ".json");
                data = {};
                allData = [];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fs_extra_1.default.readFile(name, 'utf8')];
            case 2:
                existingData = _b.sent();
                data = JSON.parse(existingData);
                allData = Object.values(data).flat();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                data = {};
                return [3 /*break*/, 4];
            case 4:
                existingSet = new Set(allData.map(function (item) { return item.id; }));
                _loop_1 = function (page) {
                    var res, jobs, newJobs, uniqueNewJobs, jsonData, err_2;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                console.log(666, page + ' / ' + pages.length);
                                return [4 /*yield*/, (0, utils_1.sendRequest)({
                                        // url: `https://www.midjourney.com/api/app/recent-jobs?amount=500&page=${page}&feed=random&_ql=explore`,
                                        url: "https://www.midjourney.com/api/app/vector-search?prompt=".concat(encodeURIComponent(keyword), "&page=").concat(page, "&_ql=explore"),
                                        method: 'GET',
                                    })];
                            case 1:
                                res = _c.sent();
                                _c.label = 2;
                            case 2:
                                _c.trys.push([2, 4, , 5]);
                                jobs = ((_a = JSON.parse(res)) === null || _a === void 0 ? void 0 : _a.jobs) || [];
                                newJobs = jobs.filter(function (job) { return !existingSet.has(job.id); });
                                if (!data[page]) {
                                    data[page] = [];
                                }
                                uniqueNewJobs = newJobs.filter(function (job) {
                                    return !data[page].some(function (existingJob) { return existingJob.id === job.id; });
                                });
                                data[page] = __spreadArray(__spreadArray([], data[page], true), uniqueNewJobs, true);
                                uniqueNewJobs.forEach(function (job) { return existingSet.add(job.id); });
                                jsonData = JSON.stringify(data, null, 2);
                                return [4 /*yield*/, fs_extra_1.default.writeFile(name, jsonData, 'utf8')];
                            case 3:
                                _c.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                err_2 = _c.sent();
                                console.error("\u5904\u7406\u7B2C ".concat(page, " \u9875\u65F6\u51FA\u9519:"), err_2);
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, pages_1 = pages;
                _b.label = 5;
            case 5:
                if (!(_i < pages_1.length)) return [3 /*break*/, 8];
                page = pages_1[_i];
                return [5 /*yield**/, _loop_1(page)];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 5];
            case 8:
                console.log('数据已成功保存。');
                return [2 /*return*/];
        }
    });
}); };
exports.getData = getData;
// getData()
