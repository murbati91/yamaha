import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, DollarSign, Calendar, Percent } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { calculateEMI, formatCurrency } from '@/utils/helpers'
import { trackEvent } from '@/services/analytics'

const FinanceCalculator = ({ productPrice = 8500, productName = 'YZF-R1' }) => {
  const [downPayment, setDownPayment] = useState(20) // percentage
  const [loanTenure, setLoanTenure] = useState(3) // years
  const [interestRate, setInterestRate] = useState(4.5) // percentage
  const [showResults, setShowResults] = useState(false)

  const downPaymentAmount = (productPrice * downPayment) / 100
  const loanAmount = productPrice - downPaymentAmount

  const calculate = () => {
    setShowResults(true)
    trackEvent.track('finance_calculator_used', {
      product_name: productName,
      product_price: productPrice,
      down_payment: downPayment,
      tenure: loanTenure,
      interest_rate: interestRate,
    })
  }

  const results = calculateEMI(loanAmount, interestRate, loanTenure)

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Calculator className="w-6 h-6 text-red-500" />
            Finance Calculator
          </CardTitle>
          <CardDescription className="text-gray-400">
            Calculate your monthly payments for {productName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Calculator Inputs */}
            <div className="space-y-6">
              {/* Vehicle Price */}
              <div className="space-y-2">
                <Label className="text-gray-300">Vehicle Price</Label>
                <div className="text-3xl font-bold text-white">
                  {formatCurrency(productPrice)}
                </div>
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-gray-300">Down Payment</Label>
                  <span className="text-sm text-gray-400">
                    {downPayment}% = {formatCurrency(downPaymentAmount)}
                  </span>
                </div>
                <Slider
                  value={[downPayment]}
                  onValueChange={([value]) => setDownPayment(value)}
                  max={50}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>10%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-gray-300">Loan Tenure</Label>
                  <span className="text-sm text-gray-400">{loanTenure} years</span>
                </div>
                <Slider
                  value={[loanTenure]}
                  onValueChange={([value]) => setLoanTenure(value)}
                  max={7}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 year</span>
                  <span>7 years</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-gray-300">Interest Rate (Annual)</Label>
                  <span className="text-sm text-gray-400">{interestRate}%</span>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={([value]) => setInterestRate(value)}
                  max={10}
                  min={3}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>3%</span>
                  <span>10%</span>
                </div>
              </div>

              <Button
                onClick={calculate}
                className="w-full bg-red-600 hover:bg-red-700"
                size="lg"
              >
                Calculate Monthly Payment
              </Button>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Monthly EMI */}
                  <Card className="bg-red-600/10 border-red-600/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Monthly EMI</p>
                          <p className="text-3xl font-bold text-white mt-1">
                            {formatCurrency(results.emi)}
                          </p>
                        </div>
                        <Calendar className="w-8 h-8 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Loan Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <DollarSign className="w-4 h-4" />
                          <span>Loan Amount</span>
                        </div>
                        <p className="text-xl font-semibold text-white mt-1">
                          {formatCurrency(loanAmount)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Percent className="w-4 h-4" />
                          <span>Total Interest</span>
                        </div>
                        <p className="text-xl font-semibold text-white mt-1">
                          {formatCurrency(results.totalInterest)}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Total Amount */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Total Amount Payable</p>
                          <p className="text-2xl font-semibold text-white mt-1">
                            {formatCurrency(results.totalAmount)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-sm">Duration</p>
                          <p className="text-lg font-semibold text-white mt-1">
                            {loanTenure * 12} months
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Apply Button */}
                  <div className="pt-4 space-y-3">
                    <Button
                      className="w-full bg-white text-black hover:bg-gray-100"
                      size="lg"
                      onClick={() => {
                        trackEvent.track('finance_apply_clicked', {
                          emi: results.emi,
                          loan_amount: loanAmount,
                        })
                      }}
                    >
                      Apply for Finance
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      * Subject to bank approval and terms & conditions
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Finance Partners */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Our Finance Partners</h3>
            <div className="flex flex-wrap gap-4 items-center opacity-60">
              <div className="bg-gray-800 px-4 py-2 rounded">NBB</div>
              <div className="bg-gray-800 px-4 py-2 rounded">BBK</div>
              <div className="bg-gray-800 px-4 py-2 rounded">Ahli United Bank</div>
              <div className="bg-gray-800 px-4 py-2 rounded">BISB</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FinanceCalculator
