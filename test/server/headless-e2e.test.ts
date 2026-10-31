import { describe, it, expect } from 'vitest'
import fs from 'fs'
import os from 'os'
import path from 'path'
import net from 'net'
import { startServer } from '../../src/server/index'

/** A loopback port held open for the whole callback — proves headless boot never binds it. */
async function withOccupiedLoopbackPort<T>(fn: (port: number) => Promise<T>): Promise<T> {
  const guard = net.createServer()
  await new Promise<void>((resolve, reject) => {
    guard.once('error', reject)
    guard.listen(0, '127.0.0.1', resolve)
  })
  const address = guard.address()
  if (address === null || typeof address === 'string') {
    await new Promise<void>((resolve, reject) =>
      guard.close((error) => (error ? reject(error) : resolve()))
    )
    throw new Error('failed to reserve a loopback test port')
  }
  try {
    return await fn(address.port)
  } finally {
    await new Promise<void>((resolve, reject) =>
      guard.close((error) => (error ? reject(error) : resolve()))
    )
  }
}

// Headless notification-host boot smoke: every core service (incl. the loopback hook server) boots,
// but NO public HTTP/WS listener is bound. Follows the same startServer harness as server-e2e, minus
// tmux/pty (nothing is spawned here), so it runs everywhere.
describe('server headless mode: boots core services, binds no public listener', () => {
  it('startServer with headless:true returns port 0 and closes cleanly', async () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nt-headless-'))
    try {
      await withOccupiedLoopbackPort(async (sentinelPort) => {
        const srv = await startServer({
          port: sentinelPort,
          host: '127.0.0.1',
          dataDir,
          rendererDir: path.join(dataDir, 'no-renderer'),
          insecureHttp: false,
          headless: true,
          // Never touch the developer's real ~/.claude — the hook would point into `dataDir`,
          // which the teardown removes, leaving a dangling hook that breaks agent sessions.
          installHooks: false
        })
        // Nothing bound: the sentinel port is 0.
        expect(srv.port).toBe(0)
        // The guard still owns the configured port — headless boot must not have displaced it.
        const guardStillListening = await new Promise<boolean>((resolve) => {
          const sock = net
            .connect({ host: '127.0.0.1', port: sentinelPort }, () => {
              sock.destroy()
              resolve(true)
            })
            .on('error', () => resolve(false))
          sock.setTimeout(500, () => {
            sock.destroy()
            resolve(false)
          })
        })
        expect(guardStillListening).toBe(true)
        await srv.close()
      })
    } finally {
      fs.rmSync(dataDir, { recursive: true, force: true })
    }
  }, 30_000)
})
