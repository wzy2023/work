import { Button, IframePro, Tag, ButtonProps } from '@/components'

interface Props {
  href: string,
  size?: ButtonProps['size'],
  type?: 'link' | 'iframe',
}

export const ReferenceLink = (props: Props) => {
  const { href, size, type = 'link' } = props

  if (type === 'link') {
    return (
      <Tag color='volcano'>
        参考自：<Button size={size} type='link' target='_blank' href={href}>{href}</Button>
      </Tag>
    )
  }

  return (
    <IframePro
      style={{ height: '80vh' }}
      url={href}
    />
  )
}
