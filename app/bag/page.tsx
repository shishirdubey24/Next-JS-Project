import { getBagItems } from "@/lib/data/cart";
import Image from "next/image";
import DeleteCartButton from "../ui-cards/deleteCartButton";
const CartPage = async () => {
  const bagItems = await getBagItems();
  if (bagItems.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        {" "}
        <h1 className="text-2xl font-semibold">Your bag is empty</h1>{" "}
      </div>
    );
  }
  const totalprice = bagItems.reduce(
    (total, item) => total + (item.current_price ?? 0),
    0,
  );
  const counting = bagItems.length;
  console.log("totalCounting:", counting);
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {" "}
        <h1 className="text-2xl font-semibold mb-8"> My Bag </h1>{" "}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {" "}
          {/* Product List */}{" "}
          <section className="lg:col-span-2 space-y-4">
            {" "}
            {bagItems.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-gray-200 rounded-sm p-4 flex gap-4"
              >
                {" "}
                {/* Product Image */}{" "}
                <div className="w-28 h-36 relative shrink-0">
                  {" "}
                  <Image
                    src={item.image || "/images/img1.jpg"}
                    alt={item.item_name || "Product image"}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />{" "}
                </div>{" "}
                {/* Product Details */}{" "}
                <div className="flex-1">
                  {" "}
                  <h2 className="font-semibold text-gray-900">
                    {" "}
                    {item.company}{" "}
                  </h2>{" "}
                  <p className="text-sm text-gray-600 mt-1">
                    {" "}
                    {item.item_name}{" "}
                  </p>{" "}
                  <div className="mt-3">
                    {" "}
                    <span className="font-semibold">
                      {" "}
                      ₹{item.current_price}{" "}
                    </span>{" "}
                    {item.original_price && (
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        {" "}
                        ₹{item.original_price}{" "}
                      </span>
                    )}{" "}
                    {item.discount_percentage && (
                      <span className="ml-2 text-sm text-[#ff905a]">
                        {" "}
                        {item.discount_percentage}% OFF{" "}
                      </span>
                    )}{" "}
                  </div>{" "}
                  <p className="text-sm text-gray-600 mt-3">
                    {" "}
                    Delivery by {item.delivery_date}{" "}
                  </p>{" "}
                </div>{" "}
                <DeleteCartButton productId={item.id} />
              </article>
            ))}{" "}
          </section>{" "}
          {/* Price Summary */}{" "}
          <aside className="bg-white border border-gray-200 rounded-sm p-6 h-fit">
            {" "}
            <h2 className="font-semibold text-gray-800 mb-6">
              {" "}
              PRICE DETAILS{" "}
            </h2>{" "}
            <div className="flex justify-between text-sm mb-3">
              {" "}
              <span>Items</span> <span>{counting}</span>{" "}
            </div>{" "}
            <div className="flex justify-between text-sm mb-4">
              {" "}
              <span>Total Price</span> <span>₹{totalprice}</span>{" "}
            </div>{" "}
            <div className="border-t pt-4 flex justify-between font-semibold">
              {" "}
              <span>Total</span> <span>₹{totalprice}</span>{" "}
            </div>{" "}
            <button
              type="button"
              className="w-full mt-6 bg-[#ff3f6c] text-white py-3 text-sm font-semibold rounded-sm"
            >
              {" "}
              PLACE ORDER{" "}
            </button>{" "}
          </aside>{" "}
        </div>{" "}
      </div>{" "}
    </main>
  );
};
export default CartPage;
