'use strict'

import View from '@ioc:Adonis/Core/View'
import Application from '@ioc:Adonis/Core/Application'

import pdf from 'html-pdf'
import docx from 'docx-templates'

import Edge from './functions-edge'

export default class PrintService {
  /**
   * Gera a impressão
   * @param {*} dataForPrint
   * @param {*} templatePath
   * @param {*} optionsPrint
   */
  public static async generatePrint(dataForPrint, templatePath, optionsPrint) {
    const hash = '_' + Math.random().toString(36).substr(2, 9)
    const fileAndPath = Application.publicPath(hash + '.pdf')

    const optionsPrintDefault = {
      format: 'a4',
      border: {
        top: '5px',
        right: '5px',
        bottom: '5px',
        left: '5px',
      },
    }

    Edge.addFunctionsGlobals()

    const options = !optionsPrint ? optionsPrintDefault : optionsPrint
    const dataView = await View.render(templatePath, dataForPrint)

    return new Promise(function (resolve) {
      pdf.create(dataView, options).toFile(`${fileAndPath}`, function (err) {
        if (err) {
          console.log('error ocurring', err)
        }
        if (err) throw err

        resolve({
          file_and_path: fileAndPath,
          file_name: hash + '.pdf',
        })
      })
    }).then((result) => {
      return result
    })
  }

  public static async generateWord(data, template, destination: string) {
    const hash = '_' + Math.random().toString(36).substr(2, 9)

    await docx({
      template: template,
      output: `${destination}/${hash}.docx`,
      data,
      processLineBreaks: true,
    })

    return {
      file_and_path: `${destination}/${hash}.docx`,
      file_name: hash + '.docx',
    }
  }
}
