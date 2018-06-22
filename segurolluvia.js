/*const { EnclaveFactory } = require('./enclave')
const { SawtoothClientFactory } = require('./sawtooth-client')
const env = require('./env')
const input = require('./input')*/

const enclave = EnclaveFactory(Buffer.from(env.privateKey, 'hex'))

const segurolluviaClient = SawtoothClientFactory({
  enclave: enclave,
  restApiUrl: env.restApiUrl
})

const segurolluviaTransactor = segurolluviaClient.newTransactor({
  familyName: env.familyName,
  familyVersion: env.familyVersion
})

function buyVerb(name, mail, bankAccount, placeAddress, town, province,
					checkinDate, checkoutDate, days, rainAmount, 
					startHour, endHour, refund, purchase, total){
	const newPayload = {
	  Verb: 'buy',
	  Name: name,
	  Mail: mail,
	  BankAccount: bankAccount,
	  PlaceAddress: placeAddress,
	  Town: town,
	  Province: province,
	  CheckinDate: checkinDate,
	  CheckoutDate: checkoutDate,
	  Days: days,
	  RainAmount: rainAmount,
	  StartHour: startHour,
	  EndHour: endHour,
	  Refund: refund,
	  Purchase: purchase,
	  Total: total
	}
	
	if (input.payloadIsValid(newPayload)) {
	  input.submitPayload(newPayload, segurolluviaTransactor)
	} else {
	  console.log(`Oops! Your payload failed validation and was not submitted.`)
	}
}

/* 
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
*/
