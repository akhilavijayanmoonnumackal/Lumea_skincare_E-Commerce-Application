import Razorpay from "razorpay";
import crypto from 'crypto';
import { config } from "../config";

export class RazorpayService {
    private getRazorpayInstance(): Razorpay {
        const keyId = config.keyId;
        const keySecret = config.keySecret;

        if(!keyId || !keySecret){
            throw new Error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be defined in .env');
        }
        
        return new Razorpay({
            key_id: keyId,
            key_secret: keySecret
        });
    }

    async createRazorpayOrder(amountInINR: number, receipt: string) {
        const razorpay = this.getRazorpayInstance();
        const options = {
            amount: Math.round(amountInINR * 100),
            currency: 'INR',
            receipt: receipt
        };
        return await razorpay.orders.create(options);
    }

    verifySignature(orderId: string, paymentId: string, signature: string): boolean {
        const secret = config.keySecret || '';
        const generatedSignature = crypto
            .createHmac('sha256', secret)
            .update(`${orderId}|${paymentId}`)
            .digest('hex');

        return generatedSignature === signature;
    }
}