import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './MarkdownRenderer.module.css';

function CodeBlock({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : 'plaintext';
    return !inline && match ? (
        <div className={styles.codeBlockContainer}>
            <div className={styles.languageLabel}>{language}</div>
            <SyntaxHighlighter
                style={solarizedlight}
                language={language}
                PreTag="div"
                className={styles.codeBlock}
                {...props}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        </div>
    ) : (
        <code className={styles.codeBlock} {...props}>
            {children}
        </code>
    );
}

function BlockQuote({ children }) {
    return (
        <div className={styles.blockQuoteContainer}>
            <blockquote className={styles.blockQuote}>{children}</blockquote>
        </div>
    );
}

function MarkdownRenderer({ text }) {
    return (
        <div className={styles.markdownContainer}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code: CodeBlock,
                    blockquote: BlockQuote,
                }}
            >
                {text}
            </ReactMarkdown>
        </div>
    );
}

export default MarkdownRenderer;