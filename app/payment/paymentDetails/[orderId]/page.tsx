import { notFound, redirect } from "next/navigation";
import mongoose from "mongoose";
import { mongoDBConnect } from "@/lib/mongoDb";

import { verifyAuthToken } from "@/lib/auth/verifyAuthToken";
import Order from "@/models/orderMode";
import Address from "@/models/addressModel";
import Product from "@/models/productModel";
import Link from "next/link";

type PaymentDetailsPageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function PaymentDetailsPage({
  params,
}: PaymentDetailsPageProps) {
  const { orderId } = await params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    notFound();
  }

  const user = await verifyAuthToken();

  if (!user?.userId) {
    redirect("/login");
  }

  await mongoDBConnect();

  const order = await Order.findOne({
    _id: orderId,
    userId: user.userId,
  }).lean();

  if (!order) {
    notFound();
  }

  const address = await Address.findOne({
    _id: order.addressId,
    userId: user.userId,
  }).lean();

  const productIds = order.items.map((item) => item.productId);

  const products = await Product.find({
    id: { $in: productIds },
  })
    .select("item_name company image")
    .lean();

  type ProductSummary = {
    id: string;
    item_name?: string;
    company?: string;
    image?: string;
  };
  const productSummaries = products as ProductSummary[];
  const productMap = new Map(
    productSummaries.map((product) => [product.id, product]),
  );

  const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

  return (
    <main className="min-h-screen bg-[#f8f7f5] px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-5xl">
      <header className="mb-8 rounded-2xl bg-white px-6 py-8 shadow-sm sm:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a16242]">Order update</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div><h1 className="text-3xl font-semibold tracking-tight text-gray-900">Order details</h1>
          <p className="mt-2 text-sm text-gray-500">Your purchase and delivery information, all in one place.</p></div>
          <span className={`rounded-full px-4 py-2 text-sm font-semibold ${order.paymentStatus === "PAID" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{order.paymentStatus}</span>
        </div>
        <p className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-500">Order reference <span className="ml-1 break-all font-medium text-gray-700">{order._id.toString()}</span></p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)]">
      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-900">Items in your order</h2>
          <span className="text-sm text-gray-500">{order.items.length} {order.items.length === 1 ? "item" : "items"}</span>
        </div>
        <p className="mt-2 text-sm text-gray-500">Order status: <span className="font-medium text-gray-800">{order.status}</span></p>
        <div className="mt-6 divide-y divide-gray-100">
            {order.items.map((item, index) => {
              const product = productMap.get(item.productId);

              return (
                <div
                  key={`${item.productId}-${index}`}
                  className="flex items-center justify-between gap-4 py-5 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">
                      {product?.item_name ?? "Product"}
                    </p>

                    {product?.company && (
                      <p className="mt-1 text-sm text-gray-500">{product.company}</p>
                    )}
                  </div>

                  <p className="font-medium">{formatPrice(item.price)}</p>
                </div>
              );
            })}
        </div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="text-lg font-semibold text-gray-900">Payment details</h2>
          <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5 text-sm text-gray-600"><span>Payment status</span><span className="font-medium text-gray-900">{order.paymentStatus}</span></div>
          <div className="mt-4 flex items-end justify-between gap-2"><span className="text-sm font-medium text-gray-600">{order.paymentStatus === "PAID" ? "Total paid" : "Amount due"}</span><span className="text-2xl font-bold tracking-tight text-gray-900">{formatPrice(order.totalPrice)}</span></div>
          <p className="mt-3 text-xs leading-5 text-gray-500">All amounts are shown in {order.currency}.</p>
          <dl className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-xs text-gray-600">
            <div><dt className="font-medium text-gray-800">Order reference</dt><dd className="mt-1 break-all">{order._id.toString()}</dd></div>
            {order.razorpayOrderId && <div><dt className="font-medium text-gray-800">Razorpay order ID</dt><dd className="mt-1 break-all">{order.razorpayOrderId}</dd></div>}
            {order.razorpayPaymentId && <div><dt className="font-medium text-gray-800">Payment ID</dt><dd className="mt-1 break-all">{order.razorpayPaymentId}</dd></div>}
            {order.paymentMethod && <div><dt className="font-medium text-gray-800">Payment method</dt><dd className="mt-1 capitalize">{order.paymentMethod}</dd></div>}
            {order.paidAt && <div><dt className="font-medium text-gray-800">Paid on</dt><dd className="mt-1">{new Date(order.paidAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })}</dd></div>}
          </dl>
        </section>

        {address && (
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a16242]">Delivery</p>
          <h2 className="mt-2 text-lg font-semibold text-gray-900">Shipping address</h2>
          <div className="mt-4 text-sm leading-6 text-gray-600">
          <p className="font-semibold text-gray-900">{address.fullName}</p>
          <p>{address.phone}</p>
          <p className="mt-2">{address.address}{address.locality ? `, ${address.locality}` : ""}</p>
          <p>{address.city}, {address.state} · {address.pincode}</p>
          </div>
        </section>
        )}
      </aside>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
        >
          Continue Shopping
        </Link>
      </div>
      </div>
    </main>
  );
}
