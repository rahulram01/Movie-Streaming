import { useEffect, useState } from "react";
import "./PlanScreen.css";
import { db } from "../utils/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";
import { loadStripe } from "@stripe/stripe-js";

export default function PlanScreen() {
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user && user.uid) {
      // Check if user is not null
      db.collection("customers")
        .doc(user.uid)
        .collection("subscriptions")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((subscriptions) => {
            setSubscription({
              role: subscriptions.data().role,
              current_period_end:
                subscriptions.data().current_period_end.seconds,
              current_period_start:
                subscriptions.data().current_period_start.seconds,
            });
          });
        });
    }
  }, [user]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach((productDoc) => {
          products[productDoc.id] = productDoc.data();
          productDoc.ref
            .collection("prices")
            .get()
            .then((priceSnap) => {
              priceSnap.docs.forEach((price) => {
                products[productDoc.id].prices = {
                  priceId: price.id,
                  priceData: price.data(),
                };
              });
            });
        });
        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occurred: ${error.message} `);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51Nj1yxSIuVLE1XhkQ80nE4OyawT2mkEeyIsCVn0Pl13inqqZQ0BINldJVOzcCWNevLguWUxO1IyMC8zQ4DjTsJcm00Cpugt1KX"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="planScreen">
      <br></br>
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "planScreen_plans--disabled"
            } planScreen_plans`}
          >
            <div className="planScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
