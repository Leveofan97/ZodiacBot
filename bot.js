import Telegraf from 'telegraf'
import covidApi from 'covid19-api'
const bot = new Telegraf('1472312554:AAH_CT2GoTdSsYMdPGRLmdgG2bFvz916BDU')
import { getMainMenu } from './keyboard.js'

bot.start( ctx => ctx.reply(`
   Привет ${ctx.from.first_name}!
   Узнай статистику по Коронавирусу.
   Введи страну на английском языке и получи статистику.
   Получить весь список стран можно по команде /help."
`))

bot.help( ctx => ctx.reply('Выбери из списка страну', getMainMenu()))
bot.on('text', async (ctx) => {
    try {
        const userText = ctx.message.text
        const covidData = await covidApi.getReportsByCountries(userText)
        const countryData = covidData[0][0]
        const formatData = `
           Страна: ${countryData.country},
           Случаи: ${countryData.cases},
           Смерти: ${countryData.deaths},
           Выздоровело: ${countryData.recovered}`
        await ctx.reply(formatData)
    } catch(e) {
        ctx.reply('Такой страны не существует, для получения списка стран используй команду /help')
    }
})
bot.launch()