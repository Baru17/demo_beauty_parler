/**
 * Booking transport.
 *
 * By default the template runs in demo mode and never transmits the enquiry.
 * Set `booking.endpoint` in businessConfig.js to POST the payload as JSON to a
 * form service, serverless function or salon CRM.
 */
export async function submitEnquiry(payload, booking) {
  if (booking?.endpoint && booking?.demoMode === false) {
    const response = await fetch(booking.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Enquiry endpoint responded with ${response.status}`)
    }

    return { delivered: true }
  }

  // Demo mode: simulate the network round-trip so loading + success states are
  // genuinely exercised, without sending anything anywhere.
  await new Promise((resolve) => setTimeout(resolve, 850))
  return { delivered: false }
}

export function buildWhatsAppLink(number, payload) {
  const digits = String(number).replace(/\D/g, '')
  if (!digits) return ''

  const lines = [
    'Hello AURELLE, I would like to enquire about an appointment.',
    '',
    payload.name ? `Name: ${payload.name}` : '',
    payload.phone ? `Phone: ${payload.phone}` : '',
    payload.category ? `Service category: ${payload.category}` : '',
    payload.service ? `Service: ${payload.service}` : '',
    payload.date ? `Preferred date: ${payload.date}` : '',
    payload.time ? `Preferred time: ${payload.time}` : '',
    payload.message ? `Message: ${payload.message}` : '',
  ].filter(Boolean)

  return `https://wa.me/${digits}?text=${encodeURIComponent(lines.join('\n'))}`
}
