export const DAY_STATUS = {
	NONE: 0,
	SINGLE_CHOSEN: 1,
	RANGE_BEGIN_CHOSEN: 2,
	RANGE_MIDDLE_CHOSEN: 3,
	RANGE_END_CHOSEN: 4
};

export const Helper = {
	getDayStatus(date, selectionRange = []) {

		let status = DAY_STATUS.NONE;
		const [startDate, endDate] = selectionRange;

		if(!startDate || !endDate) {
			return status;
		}

		if(startDate.getTime() === endDate.getTime()) {
			if(date.getTime() === startDate.getTime()) {
				return DAY_STATUS.SINGLE_CHOSEN;
			}
		} else {
			if(date.getTime() === startDate.getTime()) {
				return DAY_STATUS.RANGE_BEGIN_CHOSEN;
			} else if(date > startDate && date < endDate) {
				return DAY_STATUS.RANGE_MIDDLE_CHOSEN;
			} else if(date.getTime() === endDate.getTime()) {
				return DAY_STATUS.RANGE_END_CHOSEN;
			}
		}

		return status;
	},
	binarySearch(data=[], comparedObj, comparedFunc) {

		let start = 0;
		let end = data.length - 1;
		let middle;

		let compareResult;
		while(start <= end) {
			middle = Math.floor((start + end) / 2);
			compareResult = comparedFunc(data[middle], comparedObj);
			if(compareResult < 0) {
				end = middle - 1;
			} else if(compareResult === 0) {
				return data[middle];
			} else {
				start = middle + 1;
			}
		}

		return undefined;
	},
	positionToDate(position, dayLayoutsIndex) {

		// 1. use binary search to find the monthIndex
		const monthData = Helper.binarySearch(dayLayoutsIndex, position, (cur, compared) => {
			if(compared.y < cur.boundary.upper) {
				return -1;
			} else if(compared.y > cur.boundary.lower) {
				return 1;
			} else {
				return 0;
			}
		});

		// 2. use binary search to find the rowData
		if(monthData === undefined) return null;
		const rowData = Helper.binarySearch(monthData.dayLayouts, position, (cur, compared) => {
			if(compared.y < cur[0].y) {
				return -1;
			} else if(compared.y > cur[0].y + cur[0].height) {
				return 1;
			} else {
				return 0;
			}
		});

		// 3. use binary search to find the result
		if(rowData === undefined) return null;
		const result = Helper.binarySearch(rowData, position, (cur, compared) => {
			if(compared.x < cur.x) {
				return -1;
			} else if(compared.x > cur.x + cur.width) {
				return 1;
			} else {
				return 0;
			}
		});

		// 4. return the final result
		return result !== undefined ? Helper.parseDate(result.date) : null;
	},
	dateToData(date, calendarData) {
		if(calendarData && date) {
			const identifier = Helper.formatDate(date, 'yyyy-MM');
			if(calendarData[identifier]) {
				let emptyCount = 0;
				for(let i = 0; i < calendarData[identifier].length; i++) {
					if(!Helper.isEmptyObject(calendarData[identifier][i])) {
						break;
					} else {
						emptyCount++;
					}
				}
				return calendarData[identifier][emptyCount + date.getDate() - 1];
			}
		}
		return undefined;
	},
	arrayTransform(arr = []) {

		if(arr.length === 0) return [];

		let result = [[]], lastY = arr[0].y;
		for(let i = 0, count = 0; i < arr.length; i++) {
			if(arr[i].y === lastY) {
				result[count].push(arr[i]);
			} else {
				lastY = arr[i].y;
				result[++count] = [arr[i]];
			}
		}

		return result;
	},
	buildIndexItem({identifier, dayLayouts, left, right}) {
		const len = dayLayouts.length;
		return {
			identifier,
			boundary: {
				left, right, upper: dayLayouts[0].y,
				lower: dayLayouts[len - 1].y + dayLayouts[len - 1].height
			},
			dayLayouts: Helper.arrayTransform(dayLayouts.map((item, index) => {
				const date = `${identifier}-${index + 1}`;
				if(index === 0){
					return Object.assign({date}, item, {x: left, width: item.x + item.width - left});
				} else if (index === len - 1) {
					return Object.assign({date}, item, {width: right - item.x});
				} else {
					return Object.assign({date}, item);
				}
			}))
		}
	},
	isEmptyObject(obj) {
		if(typeof obj !== 'object') {
			return true;
		}
		for(let key in obj) {
			return false;
		}
		return true;
	},
	isEmptyArray(arr) {
		if(!(arr instanceof Array)) {
			return false;
		}
		else {
			return arr.length === 0;
		}
	},
	waitFor(millSeconds) {
		return new Promise(resolve => {
			setTimeout(resolve, millSeconds);
		});
	},
	addDay(date, day) {
		return new Date(date.getTime() + day * 24 * 60 * 60 * 1000);
	},
	parseDate(value, format) {
		if (value && !(value instanceof Date)) {
			if (format) {
				if (typeof value === 'number') {
					value = new Date(value);
				} else {
					const groups = [0],
						obj = {},
						match = new RegExp(format.replace(/([-.*+?^${}()|[\]/\\])/g, '\\$1').replace(/([yMdHms])\1*/g, function (all, w) {
							groups.push(w);
							return '\\s*(\\d+)?\\s*';
						})).exec(value);
					if (match) {
						for (let i = 1; i < match.length; i++) {
							obj[groups[i]] = +match[i];
						}
					}
					value = new Date(
						obj.y || new Date().getFullYear(),
						obj.M ? obj.M - 1 : new Date().getMonth(),
						obj.d || 1,
						obj.H || 0,
						obj.m || 0,
						obj.s || 0
					);
				}
			} else {
				if ((typeof value === 'string') && /^(\d{4})[-/]?(\d{1,2})[-/]?(\d{1,2})( +(\d+):(\d+)(?::(\d+))?)?$/.test(value)) {
					value = new Date(
						RegExp.$1 >> 0,
						(RegExp.$2 >> 0) - 1,
						RegExp.$3 >> 0,
						(RegExp.$5 || 0) >> 0,
						(RegExp.$6 || 0) >> 0,
						(RegExp.$7 || 0) >> 0
					);
				} else {
					value = new Date(value);
				}
			}
		} else {
			value = value || new Date();
		}
		return value;
	},
	formatDate(date, format) {

		if (!(date instanceof Date)) {
			date = this.parseDate(date);
		}

		const formators = {
			y: function (date, length) {
				date = date.getFullYear();
				return date < 0 ? 'BC' + (-date) : length < 3 && date < 2000 ? date % 100 : date;
			},
			M: function (date) {
				return date.getMonth() + 1;
			},
			d: function (date) {
				return date.getDate();
			},
			H: function (date) {
				return date.getHours();
			},
			m: function (date) {
				return date.getMinutes();
			},
			s: function (date) {
				return date.getSeconds();
			},
			e: function (date, length) {
				return (length === 1 ? '' : length === 2 ? '周' : '星期') + [length === 2 ? '日' : '天', '一', '二', '三', '四', '五', '六'][date.getDay()];
			}
		};

		return (format || 'yyyy/MM/dd HH:mm:ss').replace(/(\w)\1*/g, function (all, key) {
			if (key in formators) {
				key = '' + formators[key](date, all.length);
				while (key.length < all.length) {
					key = '0' + key;
				}
				all = key;
			}
			return all;
		});
	},
	getLastDayOfMonth(fullYear, month) {
		const newDate = new Date(fullYear, month + 1, 1);
		return new Date(newDate.getTime() - 1000 * 60 * 60 * 24);
	},
	getValue(obj, keyChain, defaultValue) {

		// 输入不合法
		if(!(obj instanceof Object) || typeof keyChain !== 'string') {
			return defaultValue;
		}

		// 从keyChain中提取出以:分割的keys
		const keys = keyChain.split(':');

		// 遍历key，如果遇到值为undefined，返回默认值; 否则，返回真正的值
		let result = obj;
		for(let i = 0; i < keys.length; i++) {
			if(result[keys[i]] === undefined) {
				result = defaultValue;
				break;
			} else {
				result = result[keys[i]];
			}
		}

		return result;
	}
};