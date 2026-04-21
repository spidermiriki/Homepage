import { ReactNode } from 'react'

export interface ItemProps {
  x: string
  y: string
  dur?: string
  delay?: string
  rot?: string
  zIndex?: number
  label?: string
  children: ReactNode
  id?: string
  onClick?: () => void
}

export function Item({
  x,
  y,
  dur    = '4s',
  delay  = '0s',
  rot    = '0deg',
  zIndex = 10,
  label,
  children,
  id,
  onClick,
}: ItemProps) {
  const style = {
    '--x':     x,
    '--y':     y,
    '--dur':   dur,
    '--delay': delay,
    '--rot':   rot,
    zIndex,
  } as React.CSSProperties

  return (
    <div id={id} className="item" style={style} onClick={onClick}>
      <div className="item-inner">
        {children}
      </div>
      {label && <span className="item-label">{label}</span>}
    </div>
  )
}