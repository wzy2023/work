import { CAC } from 'cac'
import merge from './script'

export default (cli: CAC) => {
  cli.command('m', '合并 commit')
  .option('--count [number]', '合并几个commit，不填会自动计算与最新commit相同名称的数量')
  .option('--commit [boolean]', '是否在合并前提交代码')
  .option('--push [boolean]', '是否在合并后推送代码')
  .action(merge)
}
