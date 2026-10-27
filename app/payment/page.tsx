import { getBagItems } from "@/lib/data/cartData";
import CheckoutItems from "./ui-cards/CheckoutItems";
import OrderSummary from "./ui-cards/OrderSummary";
import AddressSelector from "./ui-cards/addressSelector/AddressSelector";
import { CheckoutAddressProvider } from "./ui-cards/SharedCheckoutAddress";
import { GetSavedAddressesAction } from "@/lib/actions/getSavedAddressAction";
const PaymentPage = async () => {
  const bagItems = await getBagItems();
  console.log("bagitems are ", bagItems);
  const savedAddresses = await GetSavedAddressesAction();

  if (bagItems.length === 0) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Your bag is empty
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Add some items to continue with checkout.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f5] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-2xl border border-white bg-white px-6 py-7 shadow-sm sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a16242]">
                Almost yours
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
                Checkout
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Confirm your delivery details and review your bag before placing
                your order.
              </p>
            </div>
            <div
              className="flex items-center gap-2 text-xs font-semibold text-gray-500 sm:text-sm"
              aria-label="Checkout progress"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white">
                1
              </span>
              <span className="text-gray-900">Delivery</span>
              <span className="mx-1 h-px w-6 bg-gray-200" />
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white">
                2
              </span>
              <span>Payment</span>
            </div>
          </div>
        </header>

        <CheckoutAddressProvider
          initialAddress={savedAddresses.addresses[0] ?? null}
        >
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)]">
            <section className="min-w-0 space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <AddressSelector
                  initialAddresses={savedAddresses.addresses}
                  initialMessage={
                    savedAddresses.success
                      ? ""
                      : (savedAddresses.message ??
                        "Unable to load saved addresses.")
                  }
                />
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <CheckoutItems bagItems={bagItems} />
              </div>
            </section>

            <aside className="min-w-0 lg:sticky lg:top-6">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <OrderSummary bagItems={bagItems} />
              </div>
            </aside>
          </div>
        </CheckoutAddressProvider>
      </div>
    </main>
  );
};

export default PaymentPage;
