import React from 'react'
import { themeConfig } from '../config/themeConfig'

const SecondaryButton = ({ children, href, onClick, className = '', target, rel, icon: Icon }) => {
  const baseClasses = 'inline-flex items-center gap-2 text-sm sm:text-base font-medium transition-all duration-300 hover:opacity-80 underline'
  const colorStyle = { color: themeConfig.cssVariables['--secondary-text'] }
  
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`${baseClasses} ${className}`}
        style={colorStyle}
      >
        {children}
        {Icon && <Icon className="w-4 h-4" style={colorStyle} />}
      </a>
    )
  }
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      style={colorStyle}
    >
      {children}
      {Icon && <Icon className="w-4 h-4" style={colorStyle} />}
    </button>
  )
}

export default SecondaryButton
