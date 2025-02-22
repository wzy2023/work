const { model, xs, ys, predict } = require('./model');
// const { generateNumbers } = require('./data');

// 训练模型
(async () => {
  await model.fit(xs, ys, {
    epochs: 100,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        // console.log(`迭代轮次 ${epoch}: 损失 = ${logs.loss}, 准确率 = ${logs.acc}, 验证损失 = ${logs.val_loss}, 验证准确率 = ${logs.val_acc}`)
      },
    },
  })

  await model.save('file://./my-model')

  // 统计正确率
  // let correctCount = 0
  // let totalCount = 0

  // 测试偶数数组
  // Array.from({ length: 100 }).forEach(() => {
  //   const testNums = generateNumbers(false).nums
  //   const idOdd = predict(testNums) > 0.5
  //   const isCorrect = idOdd === false
  //   console.log(`${testNums}: false, ${idOdd}, ${isCorrect}`)
  //   totalCount++
  //   if (isCorrect) {
  //     correctCount++
  //   }
  // })
  //
  // // 测试奇数数组
  // Array.from({ length: 100 }).forEach(() => {
  //   const testNums = generateNumbers(true).nums
  //   const idOdd = predict(testNums) > 0.5
  //   const isCorrect = idOdd === true
  //   console.log(`${testNums}: true, ${idOdd}, ${isCorrect}`)
  //   totalCount++
  //   if (isCorrect) {
  //     correctCount++
  //   }
  // })

  // const accuracy = (correctCount / totalCount) * 100
  // console.log(`正确率: ${accuracy}%`)
})()
