import { onBeforeUnmount } from 'vue'

export type ExampleData = {
  [key: string]: string | Record<string, string>
} & {
  'import-map.json'?: string
  _hint?: ExampleData
}

function forEachComponent(
  raw: ExampleData,
  files: Record<string, string>,
  cb: (file: Record<string, string>) => void
) {
  const { 'index.html': template, 'script.js': script, 'style.css': style } = raw
  for (const filename in raw) {
    if (filename !== 'index.html' && filename !== 'script.js' && filename !== 'style.css')
      files[filename] = <string>raw[filename]
  }
  cb({ template, script, style })
}

export function resolveSFCExample(raw: ExampleData, preferComposition: boolean) {
  const files: Record<string, string> = {}
  forEachComponent(raw, files, ({ template, script, style }) => {
    const desc = raw['description.txt'] as string
    let sfcContent = desc ? `<!--\n${desc.trim()}\n-->\n\n` : ``

    sfcContent += `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>\n${style || ''}</style>
</head>
<body>
  ${template}
</body>
<script>\n\t${script}<\/script>\n\n
</html>`
    files['index' + '.html'] = sfcContent
    console.log(files)
  })
  console.log(files)

  return files
}

export function resolveNoBuildExample(raw: ExampleData, preferComposition: boolean) {
  const files: Record<string, string> = {}

  const desc = raw['description.txt'] as string
  let html = desc ? `<!--\n${desc.trim()}\n-->\n\n` : ``
  let css = ''
  let js = ''

  // set it first for ordering
  files['index.html'] = html
  forEachComponent(raw, files, ({ template, script, style }) => {
    if (style) css += style
    console.log(template)

    if (template)
      html += `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
    ${template}
    </body>
    <script src='./script.js'><\/script>\n\n
    </html>`
    if (script) js += script
  })
  files['index.html'] = html
  if (css) {
    files['style.css'] = css
  }
  if (js) {
    files['script.js'] = js
  }
  return files
}

export function onHashChange(cb: () => void) {
  window.addEventListener('hashchange', cb)
  onBeforeUnmount(() => {
    window.removeEventListener('hashchange', cb)
  })
}
