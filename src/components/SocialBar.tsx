import { FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa6'
import { SiLetterboxd } from 'react-icons/si'

const links = [
  { icon: <FaTiktok />,      href: 'https://www.tiktok.com/@homero_francisco',      label: 'TikTok'     },
  { icon: <FaInstagram />,   href: 'https://www.instagram.com/homero_francisco_/',  label: 'Instagram'  },
  { icon: <FaLinkedin />,    href: 'https://www.linkedin.com/in/derouck-homero',    label: 'LinkedIn'   },
  { icon: <SiLetterboxd />,  href: 'https://letterboxd.com/Homelo/',                label: 'Letterboxd' },
]

export function SocialBar() {
  return (
    <div className="social-bar">
      {links.map(({ icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label={label}
        >
          {icon}
        </a>
      ))}
    </div>
  )
}
