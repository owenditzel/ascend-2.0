import { RESOURCES } from '@/data/curriculum'
import { RESOURCE_CONTENT } from '@/data/resourceContent'
import type { Resource } from '@/types'

function generateHTML(resource: Resource, bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${resource.title} — Ascend 2.0</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a1a; background: #fff; line-height: 1.6; }
  .page { max-width: 800px; margin: 0 auto; padding: 40px 32px; }
  .header { border-bottom: 3px solid #C64E3A; padding-bottom: 24px; margin-bottom: 32px; }
  .brand { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #C64E3A; margin-bottom: 8px; }
  .title { font-size: 28px; font-weight: 800; color: #111; margin-bottom: 6px; line-height: 1.2; }
  .meta { font-size: 13px; color: #777; }
  h2 { font-size: 18px; font-weight: 700; color: #111; margin: 28px 0 12px; padding-bottom: 6px; border-bottom: 1px solid #eee; }
  h3 { font-size: 15px; font-weight: 700; color: #333; margin: 20px 0 8px; }
  p { margin-bottom: 10px; color: #333; font-size: 14px; }
  ul, ol { padding-left: 20px; margin-bottom: 12px; }
  li { margin-bottom: 6px; font-size: 14px; color: #333; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
  th { background: #f5f5f5; padding: 10px 12px; text-align: left; font-weight: 700; color: #444; border: 1px solid #e0e0e0; }
  td { padding: 9px 12px; border: 1px solid #e0e0e0; vertical-align: top; color: #333; }
  .exercise { background: #fafafa; border: 1px solid #e8e8e8; border-radius: 8px; padding: 20px; margin: 16px 0; }
  .answer-box { min-height: 60px; border: 1px solid #d0d0d0; border-radius: 4px; background: #fff; margin: 8px 0 14px; }
  .answer-box.highlight { min-height: 60px; border: 2px solid #C64E3A; border-radius: 4px; background: #fff9f8; margin: 8px 0 14px; }
  .answer-line { height: 32px; border-bottom: 1px solid #d0d0d0; margin: 4px 0; }
  .script-box { background: #f0f4ff; border-left: 4px solid #4a6cf7; padding: 14px 18px; border-radius: 0 6px 6px 0; margin: 12px 0; font-size: 14px; }
  .callout { background: #fff8f6; border: 1px solid #f5c4ba; border-radius: 8px; padding: 16px 20px; margin: 16px 0; font-size: 14px; color: #5a2a1f; }
  .calc-box { background: #f8f8f8; border: 1px solid #e0e0e0; border-radius: 8px; padding: 18px 20px; margin: 16px 0; }
  .calc-box p { font-size: 14px; margin-bottom: 8px; }
  .blank { display: inline-block; min-width: 120px; border-bottom: 1px solid #999; }
  .formula { background: #111; color: #C64E3A; padding: 12px 16px; border-radius: 6px; font-family: monospace; font-size: 13px; margin: 10px 0 6px; }
  .onepager .section { border: 1px solid #e0e0e0; border-radius: 6px; padding: 16px; margin-bottom: 12px; }
  .fill-line { height: 28px; border-bottom: 1px solid #ccc; margin: 6px 0; }
  .checklist { list-style: none; padding: 0; }
  .checklist li { padding: 6px 0 6px 28px; position: relative; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
  .checklist li::before { content: "☐"; position: absolute; left: 4px; font-size: 16px; }
  .numbered-list { padding-left: 24px; }
  .numbered-list li { margin-bottom: 10px; }
  .non-neg-grid { display: grid; gap: 12px; }
  .non-neg-item { background: #fafafa; border: 1px solid #e8e8e8; border-radius: 6px; padding: 14px; }
  .footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 11px; color: #aaa; }
  em { color: #888; font-style: italic; }
  strong { color: #111; }
  hr { border: none; border-top: 1px solid #eee; margin: 12px 0; }
  @media print { body { font-size: 12px; } .page { padding: 20px; } }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="brand">Ascend 2.0${resource.module_id ? ` · Module ${resource.module_id}` : ''} · ${resource.category}</div>
    <div class="title">${resource.title}</div>
    <div class="meta">${resource.description}</div>
  </div>
  ${bodyContent}
  <div class="footer">Ascend 2.0 · ascend-2-0-rouge.vercel.app · This document is for enrolled students only.</div>
</div>
</body>
</html>`
}

function downloadFile(resource: Resource): void {
  const content = RESOURCE_CONTENT[resource.id]
  if (!content) return
  const html = generateHTML(resource, content)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = resource.title.replace(/[^a-z0-9]/gi, '-').toLowerCase() + '.html'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function useResources(moduleId?: number) {
  const resources = moduleId
    ? RESOURCES.filter(r => r.module_id === moduleId)
    : RESOURCES

  return { resources, loading: false, downloadResource: downloadFile }
}

export function useResource(id: number) {
  const resource: Resource | null = RESOURCES.find(r => r.id === id) ?? null
  return { resource, loading: false, downloadResource: downloadFile }
}
