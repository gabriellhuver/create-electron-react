'use strict'

const test = require('ava')
const execa = require('execa')
const path = require('path')
const rmfr = require('rmfr')

const create = require('./create')

const tests = [
  {
    name: 'my-test-library',
    author: 'nala',
    description: 'this is a auto-generated test module. please ignore.',
    version: '0.0.1',
    manager: 'yarn',
    template: 'default',
    git: true
  },
  {
    name: 'my-test-typescript-library',
    author: 'nala',
    description: 'this is a auto-generated test module. please ignore.',
    version: '0.0.1',
    manager: 'yarn',
    template: 'typescript',
    git: true
  },
  {
    name: '@automagical/nala',
    author: 'superstar-cats',
    description: 'this is a auto-generated test module. please ignore.',
    version: '0.0.1',
    manager: 'yarn',
    template: 'default',
    git: true
  },
  {
    name: 'no-git-library',
    author: 'nala',
    description: 'this is a auto-generated test module. please ignore.',
    version: '0.0.1',
    manager: 'yarn',
    template: 'default',
    git: false
  },
  {
    name: 'my-custom-template',
    author: 'nala',
    description: 'this is a auto-generated test module. please ignore.',
    version: '0.0.1',
    manager: 'yarn',
    template: 'custom',
    templatePath: './template/default',
    git: true
  }
]

tests.forEach(opts => {
  test.serial(`creating "${opts.name}" using ${opts.manager}`, async t => {
    console.log(`creating "${opts.name}" using ${opts.manager}...`)
    let ret

    // ensure library is created successfully
    const root = await create(opts)

    try {
      t.truthy(root.indexOf(opts.shortName) >= 0)

      // ensure deps install successfully in root
      ret = await execa.shell(`${opts.manager} install`, { cwd: root })
      t.is(ret.code, 0)

      // ensure root tests pass
      ret = await execa.shell(`${opts.manager} test`, { cwd: root })
      t.is(ret.code, 0)

      // ensure git is initialized properly
      ret = await execa.shell('git rev-parse --git-dir', { cwd: root })
      t.is(ret.stdout, opts.git ? '.git' : path.join(process.cwd(), '.git'))
    } catch (e) {
      console.log(`test ${root} error:\r\n `, e)
    } finally {
      await rmfr(root)
    }
  })
})
