import type { AnchorHTMLAttributes } from 'react'
import { scrollToSection } from '../hooks/scroll'

/** A link to a section of the home page (the Works and About pages are switched off, so their links land here). */
export default function SectionLink({ to, onClick, ...rest }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...rest}
      href={`#${to}`}
      onClick={(e) => {
        e.preventDefault()
        scrollToSection(to)
        onClick?.(e)
      }}
    />
  )
}
