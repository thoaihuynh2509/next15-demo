import { PricingTable } from '@clerk/nextjs'

export default function PricingPage() {
  return (
    <div className='flex items-center justify-center h-full'>
      <PricingTable appearance={{ elements: { card: "shadow-lg p-6 border border-gray-200 rounded-xl" } }} />
    </div>
  )
}