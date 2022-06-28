import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { useSession } from 'next-auth/react'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27'
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sid } = req.query
  const { data: session } = useSession()
  const userEmail = session?.user?.email as string

  //   if (req.method === 'POST') {
  //     try {
  //       // Create Checkout Sessions from body params.
  //       const sessionStripe = await stripe.checkout.sessions.create({
  //         line_items: [
  //           {
  //             // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
  //             price: sid as string,
  //             quantity: 1
  //           }
  //         ],
  //         mode: 'subscription',
  //         customer_email: userEmail,
  //         success_url: `${req.headers.origin}/?success=true`,
  //         cancel_url: `${req.headers.origin}/?canceled=true`
  //       })
  //       return res.redirect(303, sessionStripe.url as string)
  //     } catch (err) {
  //       return res.send({ message: 'error 1' })
  //     }
  //   } else {
  //     res.setHeader('Allow', 'POST')
  //     res.status(405).end('Method Not Allowed')
  //   }
  return res.end({ message: userEmail })
}
