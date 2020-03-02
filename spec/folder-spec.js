const path = require('path')
const os = require('os')
const fs = require('fs-extra')
const folder = require('../lib/folder')
const InputView = require('../lib/views/input-view')

describe('folder', () => {
	beforeEach(async () => {
		const folderPath = await fs.mkdtemp(path.join(os.tmpdir(), 'sync-settings-backup-'))
		atom.config.set('sync-settings-folder-location.folderPath', folderPath)
		await fs.writeFile(path.join(folderPath, 'README'), '# Generated by Sync Settings for Atom\n\n<https://github.com/atom-community/sync-settings>')
	})

	afterEach(async () => {
		const folderPath = atom.config.get('sync-settings-folder-location.folderPath')
		if (folderPath) {
			await fs.remove(folderPath)
		}
	})

	it('returns correct properties', async () => {
		const data = await folder.get()
		expect(Object.keys(data.files).length).toBe(1)
		const data2 = await folder.update({
			'init.coffee': {
				content: '# init',
			},
		})
		expect(data2).toEqual({
			time: jasmine.stringMatching(/^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/),
		})
		const data3 = await folder.get()
		expect(data3).toEqual({
			files: {
				README: jasmine.objectContaining({
					content: '# Generated by Sync Settings for Atom\n\n<https://github.com/atom-community/sync-settings>',
				}),
				'init.coffee': jasmine.objectContaining({
					content: '# init',
				}),
			},
			time: jasmine.stringMatching(/^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/),
		})
	})

	it('gets files in a directory', async () => {
		const folderPath = atom.config.get('sync-settings-folder-location.folderPath')
		const filePath = path.resolve(folderPath, './dir/test.txt')
		await fs.outputFile(filePath, 'test')
		const data = await folder.get()
		expect(data.files).toEqual(jasmine.objectContaining({
			'dir\\test.txt': jasmine.objectContaining({
				content: 'test',
			}),
		}))
	})

	it('adds files in a directory', async () => {
		await folder.update({
			'dir\\test.txt': {
				content: 'test',
			},
		})
		const folderPath = atom.config.get('sync-settings-folder-location.folderPath')
		const text = await fs.readFile(path.resolve(folderPath, './dir/test.txt'), { encoding: 'utf8' })
		expect(text).toBe('test')
	})

	it('removes files in a directory', async () => {
		const folderPath = atom.config.get('sync-settings-folder-location.folderPath')
		const filePath = path.resolve(folderPath, './dir/test.txt')
		await fs.outputFile(filePath, 'test')
		await expectAsync(fs.pathExists(filePath)).toBeResolvedTo(true)
		await folder.update({
			'dir\\test.txt': {
				content: '',
			},
		})
		await expectAsync(fs.pathExists(filePath)).toBeResolvedTo(false)
	})

	it('creates a folder', async () => {
		const newFolder = path.join(os.tmpdir(), `sync-settings-folder-${Math.random().toString(36).slice(2)}`)
		atom.config.set('sync-settings-folder-location.folderPath', newFolder)

		await expectAsync(fs.pathExists(newFolder)).toBeResolvedTo(false)
		await folder.create()
		await expectAsync(fs.pathExists(newFolder)).toBeResolvedTo(true)
	})

	it('deletes the folder', async () => {
		const folderPath = atom.config.get('sync-settings-folder-location.folderPath')
		await expectAsync(fs.pathExists(folderPath)).toBeResolvedTo(true)
		await folder.delete()
		await expectAsync(fs.pathExists(folderPath)).toBeResolvedTo(false)
		expect(atom.config.get('sync-settings-folder-location.folderPath')).toBe(undefined)
	})

	it('forks a folder', async () => {
		const oldFolder = atom.config.get('sync-settings-folder-location.folderPath')
		const newFolder = await fs.mkdtemp(path.join(os.tmpdir(), 'sync-settings-folder-'))
		spyOn(InputView.prototype, 'getInput').and.returnValues(oldFolder, newFolder)
		await folder.fork()
		const data = await folder.get()
		expect(atom.config.get('sync-settings-folder-location.folderPath')).toBe(newFolder)
		expect(Object.keys(data.files).length).toBe(1)
	})
})
