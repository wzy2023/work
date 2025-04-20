import { AlertPro, AnchorCard, CodeView, ReferenceLink } from '@/components'

export default () => [
  <AnchorCard title='基础概念' subTitle='它们之间的关系是，通过Dockerfile构建出镜像，然后通过镜像来创建容器，程序就跑在容器中。并且一个镜像可以随意创建N个容器，各个容器间相互隔离'>
    <AlertPro message='Dockerfile' description='镜像构建的模版，描述镜像构建的步骤' />
    <AlertPro message='image' description='镜像，是一个只读模版，用来创建容器' />
    <AlertPro message='container' description='容器，是一个可运行的镜像实例' />
  </AnchorCard>,
  <AnchorCard title='使用步骤'>
    <AlertPro message='编写 Dockerfile'>
      <span>新建一个 Dockerfile 文件（不需要后缀），键入以下指令</span>
      <CodeView language='dockerfile'>
        {`
          FROM node:15.10.0-slim # 继承 node:15.10.0-slim 这个镜像
          COPY . ./demo # 是把当前目录拷贝到镜像的/demo目录下，
          WORKDIR /demo # 设置工作目录，类似于 cd /demo
          CMD node index.js # 容器启动后执行 node index.js

          # 其它常用命令
          # ARG var # 接收 docker build --build-arg var=xxx 传递来的参数
          # RUN apt-get install -y git # 安装 Git
          # RUN npm install --production # 安装npm包
          # RUN npm run build # 打包
          # CMD npm run start # 运行
        `}
      </CodeView>
    </AlertPro>
    <AlertPro message='构建镜像'>
      <CodeView language='dockerfile'>
        {`docker image build -t [imageName] -f [DockerfilePath] (构建上下文=.)`}
      </CodeView>
    </AlertPro>
    <AlertPro message='查看镜像列表'>
      <CodeView language='dockerfile'>
        {`docker image ls`}
      </CodeView>
    </AlertPro>
    <AlertPro message='根据镜像创建容器，并运行'>
      <CodeView language='dockerfile'>
        {`
          docker container run [-p hostPort:containerPort] [imageName] # 指定端口运行
          docker container run -it [imageName] bash # 进入bash
          docker container run -rm [imageName] # 运行完自动删除
          docker container run -d [imageName] # 后台运行容器
        `}
      </CodeView>
    </AlertPro>
    <AlertPro message='运行已存在的容器'>
      <CodeView language='dockerfile'>
        {`docker container start [containerID]`}
      </CodeView>
    </AlertPro>
    <AlertPro message='推送到 DockerHub'>
      <span>注意：镜像名称要有自己的账号前缀，才可以 push 到 DockerHub</span>
      <CodeView language='dockerfile'>
        {`docker push [imageName]`}
      </CodeView>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='其它命令'>
    <AlertPro message='查看占用的磁盘'>
      <CodeView language='dockerfile'>
        {`docker system df`}
      </CodeView>
    </AlertPro>
    <AlertPro message='清理磁盘占用'>
      <span>会删除镜像、缓存、网络</span>
      <CodeView language='dockerfile'>
        {`docker system prune --volumes`}
      </CodeView>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='其它'>
    <AlertPro message='忽略文件'>
      <span>可创建 .dockerignore，指定要忽略的目录及文件</span>
    </AlertPro>
    <AlertPro message='查看容器的日志'>
      <CodeView language='dockerfile'>
        {`docker container logs [containerID]`}
      </CodeView>
    </AlertPro>
    <AlertPro message='关闭正在运行的容器'>
      <CodeView language='dockerfile'>
        {`docker container stop [containerID]`}
      </CodeView>
    </AlertPro>
  </AnchorCard>,
  <ReferenceLink href='https://yeasy.gitbook.io/docker_practice' />,
]
