import { AlertPro, AnchorCard } from '@/components'

export default () => [
  <AnchorCard title='基础概念'>
    <AlertPro message='终端'>
      <span>没有图形界面时操作系统的方式，用户通过终端输入命令，终端将命令传给Shell，执行后，把结果显示在终端上</span>
    </AlertPro>
    <AlertPro message='终端模拟器'>
      <span>图形界面系统里，模拟终端的软件</span>
      <span>有很多种：cmd、powershell、itrem2、ohmyzsh</span>
    </AlertPro>
    <AlertPro message='Shell'>
      <span>命令解析器，它接收人输入的命令，发送到终端命令解析器，也就是shell里</span>
      <span>有很多种：bash，zsh，csh，sh，ksh</span>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='Shell命令'>
    <AlertPro>
      <div>可以执行Shell命令的程序有很多种，我们一般使用bash</div>
      <div>bash自带了40多个命令，自带的命令叫内建命令，可以用`type 命令`来看是否为内建命令</div>
      <div>bash也可以执行其它程序的命令，使用type查看的时候，会显示程序安装的位置</div>
    </AlertPro>
    <AlertPro message='cd [path]'>
      <div>cd 到指定 path 的目录</div>
      <div>cd 到家目录</div>
      <div>cd / 到根目录</div>
      <div>cd - 返回上次的目录</div>
    </AlertPro>
    <AlertPro message='ls [选项] [指定目录]'>
      <div>查看指定目录下的文件</div>
      <div>ls -l 查看详细信息，可以简写成ll</div>
      <div>ls -a 查看所有文件(包含隐藏)</div>
      <div>ls -a -l 可以简写成 ls -al || la</div>
    </AlertPro>
    <AlertPro message='shutdown [选项] [几分钟后]'>
      <div>关机 (需要root权限)</div>
      <div>shutdown -h 关机</div>
      <div>shutdown -r 重启</div>
      <div>shutdown -k 通知</div>
      <div>shutdown -c 结束其它进程的关机或者重启操作</div>
    </AlertPro>
    <AlertPro message='history'>
      <div>查看输入命令的历史</div>
      <div>附：使用 !350 可以重新输入命令历史的命令</div>
      <div>附：使用 !字母 可以重新输入可匹配到的最近的命令</div>
    </AlertPro>
    <AlertPro message='wc [选项] [文本路径]'>
      <div>统计命令</div>
      <div>wc -l 统计行数</div>
    </AlertPro>
    <AlertPro message='grep [搜索的值] [搜索的文本]'>
      <div>文本内容搜索 (搜索到就会把当前行显示出来)</div>
    </AlertPro>
    <AlertPro message='vim [文本路径]'>
      <div>vim编辑器打开文本文件</div>
    </AlertPro>
    <AlertPro message='|'>
      <div>管道命令</div>
      <div>命令 | 命令 将左边命令的结果，送给右边命令来操作</div>
    </AlertPro>
    <AlertPro message='pwd' description='查看所在目录' />
    <AlertPro message='su' description='切换到指定用户' />
    <AlertPro message='clear' description='清空输入的命令' />
    <AlertPro message='halt' description='关机' />
    <AlertPro message='reboot' description='重启' />
  </AnchorCard>,
]
