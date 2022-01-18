import glob from 'glob'
import express from 'express'

/**
 * Registers component's routes
 * @param  {express.Application} app
 * @param  {string} cwd - current working directory
 */
export default (app: express.Application, cwd: string) => {
	glob('**/*.route.*', { cwd }, (error: Error | null, files: string[]) => {
		try {
			if (error) throw error
			files.forEach(file => require(`../${file}`).default(app))
		} catch (error: any) {
			return console.log(error.message)
		}
	})
}
