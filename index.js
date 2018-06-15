const { EnclaveFactory } = require('./enclave')
const { SawtoothClientFactory } = require('./sawtooth-client')
const argv = require('yargs')
  .usage('Usage: node $0 --name [string] --verb [buy,calculate,getData] --value [integer]')
  .choices('verb', ['buy', 'calculate', 'getData'])
  .number(['bankAccount', 'days', 'refund', 'purchase', 'total'])
  .string(['verb', 'name', 'mail', 'placeAddress', 'town', 'province', 'checkinDate', 'checkoutDate', 'rainAmount', 'startHour', 'endHour'])
  .describe('name', 'unique identifier for the entry')
  .describe('verb', 'action to take on the entry')
  .describe('value', 'value to pass to the entry')
  .example('node index.js --name foo --verb set --value 42', 'If `foo` is undefined, create it and set its value to 42')
  .example('node index.js --name foo --verb inc --value 13', 'If `foo` is defined, increment it by 13')
  .example('node index.js --name foo --verb dec --value 7', 'If `foo` is defined, decrement it by 7 (but not below 0)')
  .wrap(null)
  .demandOption(['name', 'verb'])
  .help('h')
  .alias('h', 'help')
  .argv

const env = require('./env')
const input = require('./input')

const enclave = EnclaveFactory(Buffer.from(env.privateKey, 'hex'))

const segurolluviaClient = SawtoothClientFactory({
  enclave: enclave,
  restApiUrl: env.restApiUrl
})

const segurolluviaTransactor = segurolluviaClient.newTransactor({
  familyName: env.familyName,
  familyVersion: env.familyVersion
})
 
const newPayload = {
  Verb: argv.verb,
  Name: argv.name,
  Mail: argv.mail,
  BankAccount: argv.bankAccount,
  PlaceAddress: argv.placeAddress,
  Town: argv.town,
  Province: argv.province,
  CheckinDate: argv.checkinDate,
  CheckoutDate: argv.checkoutDate,
  Days: argv.days,
  RainAmount: argv.rainAmount,
  StartHour: argv.startHour,
  EndHour: argv.endHour,
  Refund: argv.refund,
  Purchase: argv.purchase,
  Total: argv.total
  
}

if (input.payloadIsValid(newPayload)) {
  input.submitPayload(newPayload, segurolluviaTransactor)
} else {
  console.log(`Oops! Your payload failed validation and was not submitted.`)
}
