import { AlertPro, AnchorCard, Button, CodeView, ImagePro, TabsPro, Typography, CollapsePro } from '@/components'

export default () => [
  <TabsPro
    items={[
      {
        label: 'HTTP版本',
        children: [
          <ImagePro src='/9.其它/http_res.png' />,
        ],
      },
      {
        label: 'HTTP请求',
        children: [
          <AnchorCard title='请求行' subTitle='包含请求方法、请求URI、协议版本，格式如下'>
            <span>GET /1.jpg HTTP/1.1</span>
          </AnchorCard>,
          <AnchorCard title='请求头' subTitle='允许客户端向服务器端传递请求的附加信息以及客户端自身的信息'>
            <ImagePro src='/9.其它/http_head.png' />
            <AlertPro message='Host（必需）主要用于指定被请求资源的Internet主机和端口号'>
              <span>Host：www.baidu.com:80</span>
            </AlertPro>
            <AlertPro message='Accept 客户端声明可以接受哪些类型的信息'>
              <span>Accept: text/html, application/xhtml+xml, image/jxr, */*</span>
            </AlertPro>
            <AlertPro message='Accept-Encoding 客户端声明可以接受哪些压缩方法'>
              <span>Accept-Encoding:gzip.deflate</span>
            </AlertPro>
            <AlertPro message='Accept-Language 用于指定一种自然语言'>
              <span>Accept-Language:zh-Hans-CN,zh-Hans;q=0.5</span>
            </AlertPro>
            <AlertPro message='User-Agent 客户端将它的操作系统、浏览器等信息告诉服务器'>
              <span>User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 10.0; WOW64; Trident/7.0)</span>
            </AlertPro>
            <AlertPro message='Referer 来路地址'>
              <span>Referer: www.baidu.com</span>
            </AlertPro>
            <AlertPro message='Connection 用于指定持久连接还是立即关闭'>
              <span>Connection: Keep-Alive</span>
            </AlertPro>
            <AlertPro message='Content-Type 内容类型'>
              <span>Content-Type: text/html; charset=utf-8</span>
            </AlertPro>
            <AlertPro message='Content-Length 内容长度'>
              <span>Content-Length: 40</span>
            </AlertPro>
            <AlertPro message='Transfer-Encoding 表明数据将有几个数据块组成'>
              <div>Transfer-Encoding: chunked</div>
              <CodeView language='http'>
                {`
              Host：www.guet.edu.cn:80
              Accept: text/html, application/xhtml+xml, image/jxr, */*
              Accept-Encoding:gzip.deflate
              Accept-Language:zh-Hans-CN,zh-Hans;q=0.5
              User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 10.0; WOW64; Trident/7.0)
              Connection: Keep-Alive
            `}
              </CodeView>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='请求正文' subTitle='常用于POST请求，请求报头与请求正文之间一定要有空行'>
            <span>name=小明&password=ABC123</span>
          </AnchorCard>,
        ],
      },
      {
        label: 'HTTP响应',
        children: [
          <AnchorCard title='响应行' subTitle='包含协议版本，状态码，状态描述'>
            <span>HTTP/1.1 200 OK</span>
            <ImagePro src='/9.其它/http_status.png' />
          </AnchorCard>,
          <AnchorCard title='响应头'>
            <ImagePro src='/9.其它/http_res_head.png' />
            <AlertPro message='Date 生成响应的日期和时间'>
              <span>Date: Sat, 24 Jun 2017 09:06:16 GMT</span>
            </AlertPro>
            <AlertPro message='Content-Type 指定了内容的类型'>
              <span>Content-Type: text/html; charset=utf-8</span>
            </AlertPro>
            <AlertPro message='Content-Encoding 指定了内容的编码方式'>
              <span>Content-Encoding: gzip</span>
            </AlertPro>
            <AlertPro message='Cache-Control 控制是否缓存'>
              <span>Cache-Control: no-cache</span>
            </AlertPro>
            <AlertPro message='Content-Length 指定了内容的长度'>
              <div>Content-Length: 152</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='响应正文' subTitle='响应报头与响应正文之间一定要有空行'>
            <CodeView language='html'>
              {`
            <html>
                  <head></head>
                  <body>
                        ...
                  </body>
            </html>
          `}
            </CodeView>
          </AnchorCard>,
        ],
      },
      {
        label: '工作原理',
        children: [
          <AnchorCard title='步骤'>
            <CollapsePro>
              <CollapsePro.Pane index={1} header='客户端连接到Web服务器'>
                <span>一个HTTP客户端，通常是浏览器，与Web服务器的HTTP端口（默认为80）建立一个TCP套接字连接</span>
              </CollapsePro.Pane>
              <CollapsePro.Pane index={2} header='发送HTTP请求'>
                <span>通过TCP套接字，客户端向Web服务器发送一个请求报文，请求报文由请求行、请求头、空行和请求正文4部分组成。</span>
              </CollapsePro.Pane>
              <CollapsePro.Pane index={3} header='服务器接受请求并返回HTTP响应'>
                <span>Web服务器解析请求，定位请求资源，将资源复本写到TCP套接字，由客户端读取。一个响应由响应行、响应头、空行和响应正文4部分组成。</span>
              </CollapsePro.Pane>
              <CollapsePro.Pane index={4} header='释放TCP连接'>
                <div>若connection 协议头的值为close，则服务器主动关闭TCP连接，客户端被动关闭连接，释放TCP连接；</div>
                <div>若connection 协议头的值为keep-alive，则该连接会保持一段时间，在该时间内可以继续接收请求;</div>
              </CollapsePro.Pane>
              <CollapsePro.Pane index={5} header='客户端浏览器解析响应报文内容'>
                <div>客户端浏览器首先解析状态行，查看表明请求是否成功的状态代码。</div>
                <div>然后解析每一个响应头，根据响应头来解析响应报文的内容(html或image等)。</div>
                <div>如果是HTML的话，客户端根据HTML的语法对其进行格式化，并在浏览器窗口中显示。</div>
              </CollapsePro.Pane>
            </CollapsePro>
          </AnchorCard>,
        ],
      },
      {
        label: '一些问题',
        children: [
          <AnchorCard title='GET和POST的区别'>
            <div>在http协议中，get代表向服务器获取数据，post代表向服务器发送数据，两者仅仅是含义不同。</div>
            <div>但是大部分情况下，浏览器等客户端在实现协议的基础上，为了符合协议中的定义，对get及post做了相应的限制。</div>
            <br />
            <Typography.Title level={5}>数据传输方式及大小方面：</Typography.Title>
            <div>在发送 get 请求时，参数需要写在URL地址后面，并且参数的大小也做了相应限制，浏览器厂商不同，大小限制也不相同
            </div>
            <div>在发送POST请求时，一般会在HTML的表单中写入数据，由浏览器自行组织数据格式发送</div>
            <div>而在ajax技术的实现中，需要将数据放进send方法传递</div>
            <div>如果非要说有区别，那也是大部分情况下，get的数据在请求头，post数据在请求体</div>
            <br />
            <Typography.Title level={5}>安全性方面：</Typography.Title>
            <div>网上流行的一种说法是 post要比get安全一些，其实这是错误的，</div>
            <div>我们不能愚昧的将眼睛看到的视为不安全而眼睛看不到的视为安全。</div>
            <div>真实的情况是 http 协议中，不仅仅有get和post，还有put、delete、push等等，</div>
            <div>都是明文传输的，也就是说，相对https，http本身就是不安全的。</div>
            <br />
            <Typography.Title level={5}>对于传输的数据类型：</Typography.Title>
            <div>网上还有一种说法是post可以做文件上传而get不可以，</div>
            <div>对于协议角度来说并不准确，只是浏览器及服务器在实现上没有为get方式实现相应的功能而已。</div>
            <br />
            <div>工具实现协议，工具不能代表协议，</div>
            <div>实现可以不遵循协议，但是实现不能修改协议。</div>
          </AnchorCard>,
        ],
      },
      {
        label: '参考资料',
        children: [
          <Button type='link' target='_blank' href='http://www.ruanyifeng.com/blog/2016/08/http.html'>http://www.ruanyifeng.com/blog/2016/08/http.html</Button>,
        ],
      },
    ]}
  />,
]
