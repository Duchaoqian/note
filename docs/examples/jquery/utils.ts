import { onBeforeUnmount } from 'vue'

export type ExampleData = {
  [key: string]: string | Record<string, string>
} & {
  'import-map.json'?: string
  _hint?: ExampleData
}

function deepFile(path: String, raw: ExampleData, files: Record<string, string>) {
  for (const filename in raw) {
    if (typeof raw[filename] !== 'string') {
      // continue
      deepFile(path + '/' + filename, raw[filename], files)
    } else {
      files[path + '/' + filename] = <string>raw[filename]
    }
  }
}
function forEachComponent(
  raw: ExampleData,
  files: Record<string, string>,
  cb: (file: any) => void
) {
  const { 'index.html': template, 'script.js': script, 'style.css': style } = raw
  for (const filename in raw) {
    if (
      filename !== 'index.html' &&
      filename !== 'script.js' &&
      filename !== 'style.css' &&
      filename !== 'description.txt' &&
      typeof raw[filename] === 'string'
    )
      files[filename] = <string>raw[filename]
    else if (typeof raw[filename] !== 'string') {
      // continue
      // console.log(raw[filename])
      deepFile(filename, raw[filename], files)
    }
  }
  cb({ template, script, style })
}

export function resolveSFCExample(raw: ExampleData, preferComposition: boolean) {
  const files: Record<string, string> = {}
  raw['import-map.json'] = raw['import-map.json'] ? raw['import-map.json'] : ''
  forEachComponent(raw, files, ({ template, script, style }) => {
    const desc = raw['description.txt'] as string
    let sfcContent = desc ? `<!--\n${desc.trim()}\n-->\n\n` : ``

    if (style)
      template = template.replace(
        /<link(.*?)href=("|')(.*?)style.css("|')(.*?)>/g,
        `<style>\n\n\t${style}\n\n</style>`
      )
    if (script)
      template = template.replace(
        /<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,
        `<script type="module">\n\t\t\timport 'jquery' \n\n\t\t\t${script}\n\t\t</script>`
      )
    sfcContent += template
    files['index' + '.html'] = sfcContent
  })

  return files
}

export function resolveNoBuildExample(raw: ExampleData, preferComposition: boolean) {
  const files: Record<string, string> = {}
  raw['import-map.json'] = raw['import-map.json'] ? raw['import-map.json'] : ''

  const desc = raw['description.txt'] as string
  let html = desc ? `<!--\n${desc.trim()}\n-->\n\n` : ``
  let css = ''
  let js = ''

  // set it first for ordering
  files['index.html'] = html
  forEachComponent(raw, files, ({ template, script, style }) => {
    if (style) css += style

    if (template)
      html += template.replace(
        /<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,
        `\n\t\t<script type="module" >
      import "./script.js"
    </script>`
      )
    if (script) {
      script = script.replace(/(\$|jQuery)([^\w\{\}])/g, function (match, group, group1) {
        return `window.${group}${group1}`
      })
      js += `import 'jquery'\n\n${script}`
    }
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
