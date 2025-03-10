'use client'

import React, { CSSProperties, useEffect, useMemo, useRef } from 'react'

import Prism from 'prismjs'
import { format } from 'prettier/standalone'
import parserBabel from 'prettier/parser-babel'
import parserTs from 'prettier/parser-typescript'
import { js_beautify, html_beautify, css_beautify } from 'js-beautify'

import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-json'

import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'

import 'prismjs/components/prism-css'
import 'prismjs/components/prism-less'
import 'prismjs/components/prism-sass'
import 'prismjs/components/prism-scss'

import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-http'
import 'prismjs/components/prism-editorconfig'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-git'
import 'prismjs/components/prism-ignore'
import 'prismjs/components/prism-yaml'

import 'prismjs/themes/prism.css'

interface CodeViewProps {
  language?: 'html' | 'jsx' | 'tsx' | 'vue' | 'json' | 'javascript' | 'typescript' | 'css' | 'less' | 'sass' | 'scss' | 'bash' | 'http' | 'editorconfig' | 'dockerfile' | 'git' | 'ignore' | 'yaml'
  code?: string,
  children?: any,
  style?: CSSProperties,
}

export const CodeView = (props: CodeViewProps) => {
  const { language = 'javascript', style, children, code = children } = props

  const preRef = useRef(null)
  useEffect(() => {
    if (!preRef.current) {
      return
    }
    Prism.highlightElement(preRef.current)
  }, [])

  const beautifydCode = useMemo(() => {
    if (language === 'html') {
      return html_beautify(code, { indent_size: 2 })
    }
    if (language === 'css') {
      return css_beautify(code, { indent_size: 2 })
    }
    if (language === 'javascript') {
      return js_beautify(code, { indent_size: 2 })
    }

    try {
      return format(code, {
        semi: false,
        parser: 'babel',
        singleQuote: true,
        tabWidth: 2,
        jsxSingleQuote: true,
        plugins: [parserBabel, parserTs],
      })
    } catch (e) {
      return code
    }
  }, [code])

  return (
    <div style={{ overflow: 'scroll', ...style }}>
      <pre style={{ margin: 0, backgroundColor: 'transparent' }}>
        <code ref={preRef} className={`language-${language}`}>
          {beautifydCode}
        </code>
      </pre>
    </div>
  )
}
