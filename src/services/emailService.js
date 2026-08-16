/**
 * Vyapar Digital - EmailJS Instant Founder Notification Service
 * Sends automated real-time email alerts to founder's Gmail on every new order, quote, or client revision.
 */

const EMAILJS_CONFIG = {
  serviceId: 'service_c0w2nb6',
  templateId: 'template_ixmfo2q',
  publicKey: '_VgnIJzB5gzifBeHK',
  endpoint: 'https://api.emailjs.com/api/v1.0/email/send'
};

/**
 * Send EmailJS notification via Browser SDK or REST fallback
 */
async function sendEmailNotification(templateParams) {
  try {
    // If EmailJS Browser SDK is loaded on window
    if (window.emailjs && typeof window.emailjs.send === 'function') {
      const res = await window.emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        { publicKey: EMAILJS_CONFIG.publicKey }
      );
      console.log('✅ [EmailJS SDK] Instant Founder Alert dispatched successfully:', res.status, res.text);
      return { success: true };
    }

    // Fallback direct REST payload
    const payload = {
      service_id: EMAILJS_CONFIG.serviceId,
      template_id: EMAILJS_CONFIG.templateId,
      user_id: EMAILJS_CONFIG.publicKey,
      template_params: templateParams
    };

    const response = await fetch(EMAILJS_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('✅ [EmailJS REST] Instant Founder Alert dispatched successfully');
      return { success: true };
    } else {
      const errText = await response.text();
      console.warn('⚠️ [EmailJS REST] Notice:', response.status, errText);
      return { success: false, error: errText };
    }
  } catch (err) {
    console.error('❌ [EmailJS] Network error while sending alert:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Dispatch alert for new customer booking / project submission
 */
export async function notifyNewOrder(order) {
  const cleanPhone = (order.clientPhone || order.phone || '').replace(/[^0-9]/g, '');
  return sendEmailNotification({
    tracking_id: order.id || order.trackingId || 'VD-NEW',
    client_name: order.clientName || order.name || 'New Client',
    business_name: order.businessName || 'Local Business',
    city: order.city || 'India',
    phone: order.clientPhone || order.phone || 'Not Provided',
    phone_clean: cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`,
    package_name: order.packageName || order.package || 'Custom Project',
    price: order.price ? `₹${Number(order.price).toLocaleString('en-IN')}` : '₹1,999',
    notes: order.notes || order.message || 'No additional notes provided.',
    event_type: 'NEW_ORDER_BOOKED',
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  });
}

/**
 * Dispatch alert when client requests a revision in Project Tracker
 */
export async function notifyClientRevision(order, revisionText) {
  const cleanPhone = (order.clientPhone || order.phone || '').replace(/[^0-9]/g, '');
  return sendEmailNotification({
    tracking_id: order.id || order.trackingId || 'VD-REV',
    client_name: order.clientName || order.name || 'Client',
    business_name: order.businessName || 'Business',
    city: order.city || '',
    phone: order.clientPhone || order.phone || '',
    phone_clean: cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`,
    package_name: `${order.packageName || 'Project'} (⚡ Client Revision Requested)`,
    price: order.price ? `₹${Number(order.price).toLocaleString('en-IN')}` : 'N/A',
    notes: `⚡ CLIENT REVISION NOTE:\n"${revisionText}"\n\nCurrent Stage: Stage ${order.stageIndex || order.stage || 3} of 5`,
    event_type: 'CLIENT_REVISION_SUBMITTED',
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  });
}

/**
 * Dispatch alert when client requests custom estimate quote from Rate Calculator
 */
export async function notifyCalculatorQuote(quote) {
  const cleanPhone = (quote.phone || '').replace(/[^0-9]/g, '');
  return sendEmailNotification({
    tracking_id: quote.id || `QUOTE-${Date.now().toString().slice(-4)}`,
    client_name: quote.name || 'Website Visitor',
    business_name: quote.businessType || 'Calculated Lead',
    city: quote.city || '',
    phone: quote.phone || 'Direct Chat',
    phone_clean: cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`,
    package_name: `Custom Calculator Quote (${quote.selectedServices ? quote.selectedServices.join(', ') : 'Selected Add-ons'})`,
    price: quote.estimatedTotal ? `₹${Number(quote.estimatedTotal).toLocaleString('en-IN')}` : '₹1,999',
    notes: `Calculator Breakdown:\nBase: ₹${quote.basePrice || 0}\nAddons: ₹${quote.addonsTotal || 0}\nTimeline: ${quote.timeline || '2-4 Days'}`,
    event_type: 'CALCULATOR_QUOTE_GENERATED',
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  });
}
