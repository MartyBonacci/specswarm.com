import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Props {
  code: string;
  highlightedHTML: string; // Pre-rendered by Shiki
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, highlightedHTML, language = 'bash', filename }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm text-gray-400">
          {filename || language}
        </span>
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded hover:bg-gray-700 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-gray-400" />
          )}
        </button>
      </div>

      {/* Code */}
      <div
        className="p-4 overflow-x-auto text-sm"
        dangerouslySetInnerHTML={{ __html: highlightedHTML }}
      />
    </div>
  );
}
