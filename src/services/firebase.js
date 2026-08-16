// Vyapar Digital - Firebase Cloud Firestore Service
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  onSnapshot, 
  serverTimestamp,
  arrayUnion,
  query,
  orderBy 
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

export const firebaseConfig = {
  apiKey: "AIzaSyBOW01sv5tjujW-UCy9XjpabNdfT-a64SY",
  authDomain: "vyapardigital-4669e.firebaseapp.com",
  projectId: "vyapardigital-4669e",
  storageBucket: "vyapardigital-4669e.firebasestorage.app",
  messagingSenderId: "854214708199",
  appId: "1:854214708199:web:c0b3e71786d6efe3da4b42",
  measurementId: "G-8RC1KPLH7S"
};

export let app = null;
export let db = null;
export let isFirebaseReady = false;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  isFirebaseReady = true;
  console.log('⚡ Firebase Cloud Firestore connected for Vyapar Digital');
} catch (err) {
  console.warn('⚠️ Firebase init fallback to LocalStorage:', err);
}

// ═══════════════ CLOUD ORDERS MANAGEMENT ═══════════════

/**
 * Save a new order to Firebase Firestore (and LocalStorage)
 */
export async function saveOrder(orderData) {
  const docId = orderData.trackingId || `VD-IND-${Math.floor(1000 + Math.random() * 9000)}`;
  const cleanOrder = {
    ...orderData,
    trackingId: docId,
    stageIndex: orderData.stageIndex || 1,
    status: orderData.status || 'Order & Brief Received',
    createdAt: orderData.createdAt || new Date().toISOString().split('T')[0],
    revisions: orderData.revisions || []
  };

  // 1. Mirror in LocalStorage
  try {
    const existing = JSON.parse(localStorage.getItem('vyapar_digital_orders') || '[]');
    const filtered = existing.filter(o => o.trackingId !== docId);
    filtered.unshift(cleanOrder);
    localStorage.setItem('vyapar_digital_orders', JSON.stringify(filtered));
  } catch (e) {
    console.error('LocalStorage mirror error:', e);
  }

  // 2. Save to Cloud Firestore
  if (isFirebaseReady && db) {
    try {
      const orderRef = doc(db, 'orders', docId);
      await setDoc(orderRef, {
        ...cleanOrder,
        updatedAt: serverTimestamp()
      }, { merge: true });
      console.log('✅ Order saved to Firebase Firestore:', docId);
    } catch (err) {
      console.warn('Firestore write error (using local backup):', err);
    }
  }

  return cleanOrder;
}

/**
 * Fetch all orders from Firebase Firestore (falls back to LocalStorage)
 */
export async function fetchOrders() {
  if (isFirebaseReady && db) {
    try {
      const ordersCol = collection(db, 'orders');
      const snapshot = await getDocs(ordersCol);
      if (!snapshot.empty) {
        const cloudOrders = [];
        snapshot.forEach(docSnap => {
          cloudOrders.push(docSnap.data());
        });
        // Cache to LocalStorage
        localStorage.setItem('vyapar_digital_orders', JSON.stringify(cloudOrders));
        return cloudOrders;
      }
    } catch (err) {
      console.warn('Firestore read error (falling back to LocalStorage):', err);
    }
  }

  // Fallback to LocalStorage
  try {
    return JSON.parse(localStorage.getItem('vyapar_digital_orders') || '[]');
  } catch (e) {
    return [];
  }
}

/**
 * Real-time Listener for a specific Order tracking ID
 */
export function subscribeToOrder(trackingId, onUpdate) {
  if (!trackingId) return () => {};

  if (isFirebaseReady && db) {
    try {
      const orderRef = doc(db, 'orders', trackingId.toUpperCase());
      const unsubscribe = onSnapshot(orderRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          onUpdate(data);
        }
      }, (err) => {
        console.warn('Firestore snapshot listener error:', err);
      });
      return unsubscribe;
    } catch (err) {
      console.warn('Subscribe error:', err);
    }
  }

  return () => {};
}

/**
 * Update order milestone stage (Admin CRM)
 */
export async function updateOrderStage(trackingId, stageIndex, statusText) {
  // Update LocalStorage
  try {
    const existing = JSON.parse(localStorage.getItem('vyapar_digital_orders') || '[]');
    const idx = existing.findIndex(o => o.trackingId === trackingId);
    if (idx !== -1) {
      existing[idx].stageIndex = stageIndex;
      if (statusText) existing[idx].status = statusText;
      localStorage.setItem('vyapar_digital_orders', JSON.stringify(existing));
    }
  } catch (e) {}

  // Update Firebase
  if (isFirebaseReady && db) {
    try {
      const orderRef = doc(db, 'orders', trackingId);
      await updateDoc(orderRef, {
        stageIndex: Number(stageIndex),
        status: statusText || 'In Progress',
        updatedAt: serverTimestamp()
      });
      console.log(`✅ Order ${trackingId} updated to Stage ${stageIndex}`);
    } catch (err) {
      console.warn('Firestore update error:', err);
    }
  }
}

/**
 * Add revision note to an order
 */
export async function addOrderRevision(trackingId, noteText) {
  // Update LocalStorage
  try {
    const existing = JSON.parse(localStorage.getItem('vyapar_digital_orders') || '[]');
    const idx = existing.findIndex(o => o.trackingId === trackingId);
    if (idx !== -1) {
      if (!existing[idx].revisions) existing[idx].revisions = [];
      existing[idx].revisions.push(noteText);
      localStorage.setItem('vyapar_digital_orders', JSON.stringify(existing));
    }
  } catch (e) {}

  // Update Firebase
  if (isFirebaseReady && db) {
    try {
      const orderRef = doc(db, 'orders', trackingId);
      await updateDoc(orderRef, {
        revisions: arrayUnion(noteText),
        updatedAt: serverTimestamp()
      });
      console.log(`✅ Revision added to order ${trackingId}`);
    } catch (err) {
      console.warn('Firestore add revision error:', err);
    }
  }
}

/**
 * Save rate calculator inquiry/quote lead to Firebase
 */
export async function saveQuoteLead(quoteData) {
  if (isFirebaseReady && db) {
    try {
      const quoteId = `QUOTE-${Date.now()}`;
      const quoteRef = doc(db, 'quotes', quoteId);
      await setDoc(quoteRef, {
        ...quoteData,
        quoteId,
        createdAt: serverTimestamp()
      });
      console.log('✅ Quote inquiry saved to Firebase:', quoteId);
    } catch (err) {
      console.warn('Firestore quote save error:', err);
    }
  }
}
