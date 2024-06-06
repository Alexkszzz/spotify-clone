import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/libs/stripe"

import {
    upsertProductRecord,
    upsertPriceRecord,
    manageSubscriptionStatusChange
} from '@/libs/supabaseAdmin'

const relevantEvents = new Set([
    'product.created',
    'product.updated',
    'price.created',
    'price.updated',
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted'
])

export async function POST(request: Request) {
    const body = await request.text()
    const sig = headers().get('Stripe-Signature')

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    let event: Stripe.Event;

    try {
        if (!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    }
    catch (error: any) {
        console.log('Error Message' + error.Message)
        return new NextResponse(`Webhook Error: ${error.Message}`, { status: 400 })
    }

    if (relevantEvents.has(event.type)) {
        try {
            switch (event.type) {
                case 'product.created':
                case 'product.updated':
                    await upsertProductRecord(event.data.object as Stripe.Product)
                    break;
                case 'price.created':
                case 'price.updated':
                    await upsertPriceRecord(event.data.object as Stripe.Price)
                    break;
                case 'customer.subscription.created':
                case 'customer.subscription.deleted':
                case 'customer.subscription.updated':
                    const subscription = event.data.object as Stripe.Subscription
                    await manageSubscriptionStatusChange(subscription.id, subscription.customer as string, event.type === 'customer.subscription.created')
                    break;
                case 'checkout.session.completed':
                    const checkoutSession = event.data.object as Stripe.Checkout.Session
                    if (checkoutSession.mode === 'subscription') {
                        const subscriptionId = checkoutSession.subscription
                        await manageSubscriptionStatusChange(subscriptionId as string, checkoutSession.customer as string, true)
                    }
                    break
                default:
                    throw new Error('Unhandled Relevant Event')
            }
        }
        catch (error) {
            console.log(error)
            return new NextResponse(`Webhook Error:`, { status: 400 })
        }
    }
    return NextResponse.json({ received: true }, { status: 200 })
}