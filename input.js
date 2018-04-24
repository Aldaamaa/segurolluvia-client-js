const input = {
  payloadIsValid: (payload) => {
    //if (valueIsValid(payload.Value) && verbIsValid(payload.Verb) && nameIsValid(payload.Name)) return true
    if (verbIsValid(payload.Verb) && nameIsValid(payload.Name) && bankAccountIsValid(payload.BankAccount) && mailIsValid(payload.Mail)
			&& placeAddressIsValid(payload.PlaceAddress) && townIsValid(payload.Town) && provinceIsValid(payload.Province)
			&& checkinDateIsValid(payload.CheckinDate) && checkoutDateIsValid(payload.CheckoutDate) && daysIsValid(payload.Days)
			&& rainAmountIsValid(payload.RainAmount) && startHourIsValid(payload.StartHour) && endHourIsValid(payload.EndHour)
			&& refundIsValid(payload.Refund) && purchaseIsValid(payload.Purchase) && totalIsValid(payload.Total)) return true
    else return false
  },
  submitPayload: async (payload, transactor) => {
    try {
      // Format the Sawtooth transaction
      const txn = payload
      console.log(`Submitting transaction to Sawtooth REST API`)
      // Wait for the response from the validator receiving the transaction
      const txnRes = await transactor.post(txn)
      // Log only a few key items from the response, because it's a lot of info
      console.log({
        status: txnRes.status,
        statusText: txnRes.statusText
      })
      return txnRes
    } catch (err) {
      console.log('Error submitting transaction to Sawtooth REST API: ', err)
      console.log('Transaction: ', txn)
    }
  }
}

const isInteger = (value) => {
  if (isNaN(value)) {
    return false
  }
  var x = parseFloat(value)
  return (x | 0) === x
}

/* const valueIsValid = (value) => {
  if ((isInteger(value)) && (value >= 0) && (value < Math.pow(2, 32) - 1)) return true
  else return false
} */


const verbIsValid = (verb) => {
  const trimmed = verb.trim()
  if (trimmed === 'buy' || trimmed === 'calculate' || trimmed === 'getData') return true
  else return false
}

const nameIsValid = (name) => {
  if (name.toString().length <= 20) return true
  else return false
}

const bankAccountIsValid = (bankAccount) => {
  if (bankAccount.toString().length <= 16) return true
  else return false
}

const mailIsValid = (mail) => {
  if (mail.toString().indexOf('@') > -1) return true
  else return false
}

const placeAddressIsValid = (placeAddress) => {
  if (placeAddress.toString().length > 0) return true
  else return false
}

const townIsValid = (town) => {
  if (town.toString().length > 0) return true
  else return false
}

const provinceIsValid = (province) => {
  if (province.toString().length > 0) return true
  else return false
}

const checkinDateIsValid = (checkinDate) => {
  if (checkinDate.toString().length > 0) return true
  else return false
}

const checkoutDateIsValid = (checkoutDate) => {
  if (checkoutDate.toString().length > 0) return true
  else return false
}

const daysIsValid = (days) => {
  if ((isInteger(days)) && (days >= 0) && (days < 31)) return true
  else return false
}

const rainAmountIsValid = (rainAmount) => {
  const trimmed = rainAmount.trim()
  if (trimmed === 'muydebil' || trimmed === 'debil' || trimmed === 'fuerte' || trimmed === 'muyfuerte' || trimmed === 'torrencial') return true
  else return false
}

const startHourIsValid = (startHour) => {
  if (startHour.toString().length > 0) return true
  else return false
}

const endHourIsValid = (endHour) => {
  if (endHour.toString().length > 0) return true
  else return false
}

const refundIsValid = (refund) => {
  if ((isInteger(refund)) && (refund >= 0)) return true
  else return false
}

const purchaseIsValid = (purchase) => {
  if ((isInteger(purchase)) && (purchase >= 0)) return true
  else return false
}

const totalIsValid = (total) => {
  if ((isInteger(total)) && (total > 0)) return true
  else return false
}

module.exports = input
