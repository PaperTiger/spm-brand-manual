#!/usr/bin/env node
// Reads the repo name from the git remote and sets VITE_BASE_PATH automatically.
// Replaces the need to manually update the base path in package.json per client.

import { execSync, spawn } from 'child_process'

const remote = execSync('git remote get-url origin').toString().trim()
const repoName = remote.split('/').pop().replace(/\.git$/, '')
const basePath = `/${repoName}/`

console.log(`Building with base path: ${basePath}`)

const build = spawn('npm', ['run', 'build'], {
  env: { ...process.env, VITE_BASE_PATH: basePath },
  stdio: 'inherit',
  shell: true,
})

build.on('exit', code => process.exit(code ?? 0))
