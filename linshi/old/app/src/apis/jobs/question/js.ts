export default [
  {
    'content': 'JavaScript 中，哪种声明变量的方式会在全局作用域中创建变量？',
    'type': 'SingleChoice',
    'options': {
      'A': {
        'content': 'var',
        'tip': '正确！使用 \'var\' 声明的变量在全局作用域中可访问。',
      },
      'B': {
        'content': 'let',
        'tip': 'let 声明的变量具有块级作用域，不会在全局作用域中创建。',
      },
      'C': {
        'content': 'const',
        'tip': 'const 声明的变量具有块级作用域，不会在全局作用域中创建。',
      },
      'D': {
        'content': 'function',
        'tip': 'function 声明函数，在全局作用域中创建，但这与声明变量不同。',
      },
    },
    'answer': ['A'],
    'level': 'easy',
    'pointText': '了解变量声明的作用域',
    'point': ['作用域', '变量声明'],
    'asalysis': '在 JavaScript 中，\'var\' 声明的变量有函数作用域或全局作用域，而 \'let\' 和 \'const\' 有块级作用域。',
    'technique': '理解不同声明方式的作用域有助于避免变量冲突。',
  },
  {
    'content': '以下哪个选项不是 JavaScript 的数据类型？',
    'type': 'SingleChoice',
    'options': {
      'A': {
        'content': 'String',
        'tip': 'String 是 JavaScript 的基本数据类型之一，用于表示文本数据。',
      },
      'B': {
        'content': 'Number',
        'tip': 'Number 是 JavaScript 的基本数据类型之一，用于表示数值。',
      },
      'C': {
        'content': 'Boolean',
        'tip': 'Boolean 是 JavaScript 的基本数据类型之一，用于表示布尔值（真/假）。',
      },
      'D': {
        'content': 'Character',
        'tip': 'Character 不是 JavaScript 的数据类型。JavaScript 用 String 来表示字符或字符串。',
      },
    },
    'answer': ['D'],
    'level': 'easy',
    'pointText': '了解 JavaScript 的基本数据类型',
    'point': ['数据类型'],
    'asalysis': 'JavaScript 的基本数据类型包括 String, Number, Boolean, Null, Undefined, Symbol 和 BigInt。',
    'technique': '记住 JavaScript 没有 Character 类型，所有文本都用 String 表示。',
  },
  {
    'content': '在 JavaScript 中，`===` 和 `==` 的区别是什么？',
    'type': 'TrueFalse',
    'options': {
      'A': {
        'content': '正确',
        'tip': '正确！`===` 比较值和类型，`==` 只比较值，不同类型会进行类型转换。',
      },
      'B': {
        'content': '错误',
        'tip': '这是正确的。`===` 是严格相等，`==` 是宽松相等。',
      },
    },
    'answer': ['A'],
    'level': 'easy',
    'pointText': '理解相等运算符的差异',
    'point': ['运算符', '相等'],
    'asalysis': '`===` 是严格相等运算符，比较时不会进行类型转换。`==` 是宽松相等运算符，会先进行类型转换再比较。',
    'technique': '使用 `===` 可以避免类型转换带来的意外结果。',
  },
  {
    'content': '哪种 JavaScript 语法结构用于处理异步操作？',
    'type': 'SingleChoice',
    'options': {
      'A': {
        'content': 'async/await',
        'tip': '正确！async/await 是处理异步操作的现代方法，使代码更易读。',
      },
      'B': {
        'content': 'try/catch',
        'tip': 'try/catch 用于处理错误，不是处理异步操作的结构。',
      },
      'C': {
        'content': 'for/while',
        'tip': 'for 和 while 是循环结构，不是专门处理异步操作的语法。',
      },
      'D': {
        'content': 'switch',
        'tip': 'switch 是条件控制结构，不是处理异步操作的结构。',
      },
    },
    'answer': ['A'],
    'level': 'medium',
    'pointText': '了解异步编程的基本语法',
    'point': ['异步编程'],
    'asalysis': 'async/await 语法让开发者以同步代码的形式编写异步代码，提高了代码的可读性和维护性。',
    'technique': '掌握 async/await 是现代 JavaScript 开发者的必备技能。',
  },
  {
    'content': '在 JavaScript 中，`null` 和 `undefined` 的区别是什么？',
    'type': 'TrueFalse',
    'options': {
      'A': {
        'content': '正确',
        'tip': '正确！`null` 表示一个空值，`undefined` 表示变量未定义或未赋值。',
      },
      'B': {
        'content': '错误',
        'tip': '这是正确的。`null` 是一个特殊值，表示“没有对象”，`undefined` 是变量声明但未赋值时的初始值。',
      },
    },
    'answer': ['A'],
    'level': 'easy',
    'pointText': '区分 `null` 和 `undefined`',
    'point': ['数据类型', '特殊值'],
    'asalysis': '在 JavaScript 中，`null` 和 `undefined` 都表示“无值”，但使用场景不同。`null` 是有意赋予的空值，`undefined` 通常是变量未定义或未赋值的状态。',
    'technique': '区分 `null` 和 `undefined` 有助于避免逻辑错误。',
  },
  {
    'content': '以下哪个 JavaScript 方法用于将数组元素合并成字符串？',
    'type': 'SingleChoice',
    'options': {
      'A': {
        'content': 'concat()',
        'tip': 'concat() 方法用于合并数组，不是将数组转为字符串。',
      },
      'B': {
        'content': 'join()',
        'tip': '正确！join() 方法将数组的所有元素连接成一个字符串。',
      },
      'C': {
        'content': 'split()',
        'tip': 'split() 方法将字符串拆分成数组，而不是将数组合并成字符串。',
      },
      'D': {
        'content': 'slice()',
        'tip': 'slice() 方法用于截取数组的一部分，不是将数组转为字符串。',
      },
    },
    'answer': ['B'],
    'level': 'easy',
    'pointText': '理解数组方法的用途',
    'point': ['数组方法', '字符串操作'],
    'asalysis': 'join() 方法接受一个参数，表示连接符，将数组的所有元素连接成一个字符串。',
    'technique': '记住 join() 是将数组转为字符串的方法。',
  },
  {
    'content': '在 JavaScript 中，`typeof NaN` 的结果是什么？',
    'type': 'SingleChoice',
    'options': {
      'A': {
        'content': 'number',
        'tip': '正确！虽然 NaN 表示“不是数字”，但它的类型是 number。',
      },
      'B': {
        'content': 'NaN',
        'tip': 'NaN 代表“不是数字”，但它的类型是 number，而不是 NaN。',
      },
      'C': {
        'content': 'undefined',
        'tip': 'NaN 的类型是 number，而不是 undefined。',
      },
      'D': {
        'content': 'object',
        'tip': 'NaN 的类型是 number，而不是 object。',
      },
    },
    'answer': ['A'],
    'level': 'medium',
    'pointText': '理解 NaN 的类型特性',
    'point': ['数据类型', 'NaN'],
    'asalysis': 'NaN 表示计算结果不是数字，通常由于无效的数学操作产生。虽然 NaN 代表“不是数字”，但它的类型依然是 number。',
    'technique': '记住 `typeof NaN` 结果是 number，这可能有助于调试时理解问题。',
  },
  {
    'content': 'JavaScript 中的 `this` 关键字指代什么？',
    'type': 'SingleChoice',
    'options': {
      'A': {
        'content': '当前函数的作用域',
        'tip': '不完全正确。`this` 与作用域不同，作用域决定变量的可访问性。',
      },
      'B': {
        'content': '当前代码执行的上下文对象',
        'tip': '正确！`this` 关键字指代当前执行上下文的对象，可能是全局对象、函数对象等。',
      },
      'C': {
        'content': '全局对象',
        'tip': '在非严格模式下，未绑定的 `this` 在函数中指向全局对象，但这只是其中一种情况。',
      },
      'D': {
        'content': 'DOM 元素',
        'tip': '只有在事件处理函数中，`this` 可能指向触发事件的 DOM 元素。',
      },
    },
    'answer': ['B'],
    'level': 'medium',
    'pointText': '理解 `this` 的指向规则',
    'point': ['this', '执行上下文'],
    'asalysis': '`this` 的值取决于函数的调用方式。了解 `this` 的指向是理解 JavaScript 中面向对象编程的关键。',
    'technique': '记住 `this` 通常指向当前执行上下文的对象，而非固定指向某一特定类型的对象。',
  },
  {
    'content': 'JavaScript 中如何声明一个常量？',
    'type': 'SingleChoice',
    'options': {
      'A': {
        'content': 'var',
        'tip': 'var 用于声明变量，不是常量。',
      },
      'B': {
        'content': 'let',
        'tip': 'let 用于声明变量，允许修改其值。',
      },
      'C': {
        'content': 'const',
        'tip': '正确！const 声明一个不可重新赋值的常量。',
      },
      'D': {
        'content': 'constant',
        'tip': 'constant 不是 JavaScript 中的关键词。',
      },
    },
    'answer': ['C'],
    'level': 'easy',
    'pointText': '区分变量与常量的声明方式',
    'point': ['变量', '常量', '声明'],
    'asalysis': 'const 声明一个常量，其值在初始化后不能被重新赋值。常量提升了代码的可读性和维护性。',
    'technique': '使用 const 声明不可变的值，可以避免意外的值更改。',
  },
  {
    'content': '以下哪个 JavaScript 方法用于数组元素的排序？',
    'type': 'SingleChoice',
    'options': {
      'A': {
        'content': 'sort()',
        'tip': '正确！sort() 方法用于对数组的元素进行排序。',
      },
      'B': {
        'content': 'order()',
        'tip': 'order() 不是 JavaScript 中的数组方法。',
      },
      'C': {
        'content': 'arrange()',
        'tip': 'arrange() 不是 JavaScript 中的数组方法。',
      },
      'D': {
        'content': 'organize()',
        'tip': 'organize() 不是 JavaScript 中的数组方法。',
      },
    },
    'answer': ['A'],
    'level': 'easy',
    'pointText': '掌握数组的常用操作方法',
    'point': ['数组', '排序'],
    'asalysis': 'sort() 方法可以根据指定的比较函数对数组元素进行排序。如果未提供比较函数，默认按 Unicode 码点排序。',
    'technique': '对于自定义排序，可以传入比较函数，例如 `array.sort((a, b) => a - b)`。',
  },
  {
    'content': '如何在 JavaScript 中检查一个变量是否为数组？',
    'type': 'SingleChoice',
    'options': {
      'A': {
        'content': 'typeof',
        'tip': 'typeof 检查变量类型，但对数组的返回值是 \'object\'，无法区分对象和数组。',
      },
      'B': {
        'content': 'isArray()',
        'tip': '正确！Array.isArray() 是检测数组的最佳方法。',
      },
      'C': {
        'content': 'instanceof',
        'tip': 'instanceof 可以用于检查数组，但在不同窗口或 iframe 间可能不准确。',
      },
      'D': {
        'content': '== Array',
        'tip': '== Array 不是有效的检查数组的方法。',
      },
    },
    'answer': ['B'],
    'level': 'medium',
    'pointText': '了解数据类型检查方法',
    'point': ['数据类型', '数组'],
    'asalysis': 'Array.isArray() 是现代 JavaScript 检查变量是否为数组的首选方法。',
    'technique': '使用 Array.isArray() 可以可靠地检查数组，避免 typeof 返回 \'object\' 的混淆。',
  },
  {
    'content': '在 JavaScript 中，`==` 和 `===` 的区别是什么？',
    'type': 'SingleChoice',
    'options': {
      'A': {
        'content': '`==` 比较值，`===` 比较值和类型',
        'tip': '正确！`==` 会进行类型转换，`===` 则不会。',
      },
      'B': {
        'content': '`==` 比较类型，`===` 比较值',
        'tip': '不正确。`==` 和 `===` 都比较值，但 `===` 还比较类型。',
      },
      'C': {
        'content': '`==` 和 `===` 没有区别',
        'tip': '不正确。它们的主要区别在于是否进行类型转换。',
      },
      'D': {
        'content': '`==` 用于字符串，`===` 用于数字',
        'tip': '不正确。它们适用于所有数据类型。',
      },
    },
    'answer': ['A'],
    'level': 'easy',
    'pointText': '区分宽松相等和严格相等',
    'point': ['运算符', '相等性'],
    'asalysis': '了解 `==` 和 `===` 的差异可以帮助避免类型转换带来的意外结果。',
    'technique': '为了避免意外的类型转换，建议使用 `===` 进行比较。',
  },
  {
    'content': '在 JavaScript 中，哪种类型的数据可以是对象的键？',
    'type': 'SingleChoice',
    'options': {
      'A': {
        'content': 'string',
        'tip': '正确！在 JavaScript 中，所有对象的键实际上是字符串。',
      },
      'B': {
        'content': 'number',
        'tip': '在使用数字作为键时，它会被转换为字符串。',
      },
      'C': {
        'content': 'boolean',
        'tip': 'boolean 类型会被转换为字符串 \'true\' 或 \'false\' 作为键。',
      },
      'D': {
        'content': 'all of the above',
        'tip': '所有这些类型在作为键时都会转换为字符串，但最常见的是使用字符串作为键。',
      },
    },
    'answer': ['D'],
    'level': 'medium',
    'pointText': '理解对象键的类型特性',
    'point': ['对象', '键'],
    'asalysis': '在 JavaScript 中，任何类型的值都可以作为对象的键，但最终都会转换为字符串。',
    'technique': '建议使用明确的字符串作为对象键，以避免不必要的类型转换。',
  },
  {
    'content': 'JavaScript 中如何删除对象的某个属性？',
    'type': 'SingleChoice',
    'options': {
      'A': {
        'content': 'delete property',
        'tip': '正确！使用 delete 运算符可以删除对象的属性。',
      },
      'B': {
        'content': 'remove property',
        'tip': 'remove 不是 JavaScript 中的有效运算符。',
      },
      'C': {
        'content': 'unset property',
        'tip': 'unset 不是 JavaScript 中的有效运算符。',
      },
      'D': {
        'content': 'discard property',
        'tip': 'discard 不是 JavaScript 中的有效运算符。',
      },
    },
    'answer': ['A'],
    'level': 'easy',
    'pointText': '了解对象属性的操作方法',
    'point': ['对象', '属性删除'],
    'asalysis': 'delete 运算符可以从对象中删除一个属性，并改变该对象的原型链。',
    'technique': '使用 delete 时要注意，这会改变对象的结构，可能影响性能。',
  },
]
