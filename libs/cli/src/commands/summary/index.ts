import { CAC } from 'cac'
import summary from './script'

export default (cli: CAC) => {
  cli.command('s', '生成项目的代码摘要')
  .action(summary)
}
