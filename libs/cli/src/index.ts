import cac from 'cac'
import gen from './commands/gen'
import merge from './commands/merge'
import summary from './commands/summary'

const cli = cac()

merge(cli)
gen(cli)
summary(cli)

cli.help()
cli.version('0.0.5')
cli.parse()
