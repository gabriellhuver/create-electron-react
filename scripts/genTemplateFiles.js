const fs = require('fs')
const path = require('path')
const execa = require('execa')
const ignore = require('ignore')
const cpFile = require('cp-file')

const rootPath = path.resolve(__dirname, '../')
const sourceDir = path.join(rootPath, 'packages')
const destDir = path.join(rootPath, 'templates')

const ignoreRule = [
  '.DS_Store',
  'dist/electron/*',
  'dist/web/*',
  'build/*',
  '!build/icons',
  'coverage',
  'node_modules/',
  'npm-debug.log',
  'npm-debug.log.*',
  'thumbs.db',
  '!.gitkeep'
]

const ig = ignore().add(ignoreRule)

/** Retrieve file paths from a given folder and its subfolders. */
const getFilePaths = folderPath => {
  const entryPaths = fs
    .readdirSync(folderPath)
    .map(entry => path.join(folderPath, entry))

  const filePaths = entryPaths.filter(entryPath =>
    fs.statSync(entryPath).isFile()
  )
  const dirPaths = entryPaths.filter(
    entryPath => !filePaths.includes(entryPath)
  )
  const dirFiles = dirPaths.reduce(
    (prev, curr) => prev.concat(getFilePaths(curr)),
    []
  )
  return [...filePaths, ...dirFiles]
}
const replaceContent = content => {
  const package = JSON.parse(content)
  package.name = '{{name}}'
  package.version = '{{version}}'
  package.author = '{{author}}'
  package.description = '{{description}}'
  const scripts = package.scripts
  const build = package.build
  scripts.pack = '{{manager}} run pack:main && {{manager}} run pack:renderer'
  scripts.postinstall = '{{manager}} run lint:fix'
  scripts.test = '{{manager}} run test:unit && {{manager}} run test:e2e'
  scripts['test:e2e'] = '{{manager}} run pack && jest -c jest.e2e.config.js'
  build.productName = '{{name}}'
  build.appId = '{{app_id}}'
  return JSON.stringify(package, null, 2)
}

const genTemplateFiles = async opts => {
  const { name } = opts
  const sourcePath = path.join(sourceDir, name)
  const distPath = path.join(destDir, name)
  const paths = getFilePaths(sourcePath)
  const validSourcePaths = paths.filter(
    fpath => !ig.ignores(fpath.slice(sourcePath.length + 1))
  )

  execa.shellSync(`rm -fr ${distPath}`)

  let len = validSourcePaths.length

  while (len > 0) {
    len--
    const file = validSourcePaths[len]
    if (file.endsWith('package.json')) {
      let content = fs.readFileSync(file)
      content = replaceContent(content)
      fs.writeFileSync(file, content)
    }

    await cpFile(file, file.replace(sourcePath, distPath))
  }

  console.log(`copy ${name} done.`)
}

genTemplateFiles({ name: 'typescript' })
