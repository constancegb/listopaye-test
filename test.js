/*
* SUPPOSITIONS :
* 1. Si l'absence commence le mois précédent, mais se termine sur le mois en cours,
* elle doit être comptabilisée dans le bulletin du mois en cours.
* 2. l'absence commence le mois en cours, mais se termine sur le mois suivant,
* elle doit être comptabilisée dans le bulletin du mois en cours.
*/


const getCurrentPeriod = () => {
  const date = new Date()
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime()/1000
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime()/1000

  return {
    start: firstDay, // 01/08/2021 à 00h00
    end: lastDay // 01/09/2021 à 00h00
  }
}

const isInclusDansPeriode = (absence) => {
  const { start, end } = getCurrentPeriod()

  // On vérifie si l'absence démarre pendant le mois en cours
  if (absence.start >= start && absence.start < end) {
    return true
  // On vérifie si l'absence termine pendant le mois en cours
  } else if (absence.end < end && absence.end >= start) {
    return true
  // On vérifie si l'absence commence avant ET termine après le mois en cours
  } else if (absence.start < start && absence.end > end) {
    return true
  }
  return false
}

/*
* ASSERT CURRENT PERIOD
*/

const currentPeriod = {
  start: 1627768800, // 01/08/2021 à 00h00
  end: 1630447200 // 01/09/2021 à 00h00
}

const assert = (msg, expr) => {
  if (!expr) {
    console.log(`${msg} FAILURE`)
    throw new Error(msg)
  }
  console.log(`${msg} SUCCESS`)
}

assert('getCurrentPeriod.start should return the start of the current period', getCurrentPeriod().start === currentPeriod.start)
assert('getCurrentPeriod.end should return the end of the current period', getCurrentPeriod().end === currentPeriod.end)


/*
* ASSERT isInclusDansPeriode FUNCTION
*/

// absence1 20/07/2021 minuit au 28/07/2021 minuit
const absence1 = { start: 1626732000, end: 1627423200 }
// absence2 29/07/2021 minuit au 01/08/2021 minuit
const absence2 = { start: 1627509600, end: 1627768800 }
// absence3 01/09/2021 minuit au 03/09/2021 minuit
const absence3 = { start: 1630447200, end: 1630620000 }
// absence4 06/08/2021 minuit au 07/08/2021 minuit
const absence4 = { start: 1628200800, end: 1628287200 }
// absence5 29/08/2021 minuit au 02/09/2021 minuit
const absence5 = { start: 1630188000, end: 1630533600 }
// absence6 29/07/2021 minuit au 02/09/2021 minuit
const absence6 = { start: 1627509600, end: 1630533600 }

assert('absence1 should return false', isInclusDansPeriode(absence1) === false)
assert('absence2 should return true', isInclusDansPeriode(absence2) === true)
assert('absence3 should return false', isInclusDansPeriode(absence3) === false)
assert('absence4 should return true', isInclusDansPeriode(absence4) === true)
assert('absence5 should return true', isInclusDansPeriode(absence5) === true)
assert('absence6 should return true', isInclusDansPeriode(absence6) === true)
