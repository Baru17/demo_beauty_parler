import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowUpRight,
  Check,
  Info,
  MessageCircle,
  RotateCcw,
  X,
} from 'lucide-react'
import { businessConfig } from '../config/businessConfig'
import { useBooking } from '../hooks/useBooking'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { buildWhatsAppLink, submitEnquiry } from '../lib/booking'
import { digitsOnly, formatDate, formatTime, todayISO } from '../lib/format'
import SmartImage from './SmartImage'

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  category: '',
  service: '',
  date: '',
  time: '',
  message: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values) {
  const errors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Please share your name.'
  }

  if (digitsOnly(values.phone).length < 10) {
    errors.phone = 'Enter a mobile number with at least 10 digits.'
  }

  if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address, or leave this blank.'
  }

  if (!values.category) {
    errors.category = 'Choose a service category.'
  }

  if (!values.date) {
    errors.date = 'Choose a preferred date.'
  } else if (values.date < todayISO()) {
    errors.date = 'Choose today or a future date.'
  }

  if (!values.time) {
    errors.time = 'Choose a preferred time.'
  }

  return errors
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-charcoal/10 py-2.5">
      <dt className="text-[8.5px] uppercase tracking-[0.2em] text-warmgrey">{label}</dt>
      <dd className="text-right text-[0.85rem] leading-snug text-charcoal">{value}</dd>
    </div>
  )
}

export default function BookingModal() {
  const { isOpen, preset, closeBooking } = useBooking()
  const { services, booking, images } = businessConfig

  const dialogRef = useRef(null)
  const formRef = useRef(null)
  const statusRef = useRef(null)
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [payload, setPayload] = useState(null)
  const [delivered, setDelivered] = useState(false)

  useLockBodyScroll(isOpen)
  useFocusTrap(dialogRef, isOpen, closeBooking)

  useEffect(() => {
    if (!isOpen) return
    setValues({ ...EMPTY, category: preset.category || '', service: preset.service || '' })
    setErrors({})
    setStatus('idle')
    setPayload(null)
    setDelivered(false)
  }, [isOpen, preset])

  // Move focus to the first field that failed validation, once it is rendered.
  useEffect(() => {
    if (!isOpen || status !== 'idle') return
    const firstField = Object.keys(errors)[0]
    if (!firstField) return
    formRef.current?.querySelector(`#booking-${firstField}`)?.focus()
  }, [errors, isOpen, status])

  // Announce the outcome to keyboard and screen-reader users.
  useEffect(() => {
    if (status === 'success' || status === 'error') statusRef.current?.focus()
  }, [status])

  const activeCategory = useMemo(
    () => services.find((service) => service.name === values.category),
    [services, values.category],
  )

  const serviceOptions = activeCategory ? activeCategory.items : []
  const whatsappLink =
    booking.whatsappNumber && payload ? buildWhatsAppLink(booking.whatsappNumber, payload) : ''

  const update = (field) => (event) => {
    const { value } = event.target
    setValues((current) => {
      const next = { ...current, [field]: value }
      if (field === 'category') next.service = ''
      return next
    })
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) {
      const firstInvalid = formRef.current?.querySelector('[aria-invalid="true"]')
      if (firstInvalid) firstInvalid.focus()
      return
    }

    const enquiry = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      category: values.category,
      service: values.service,
      date: values.date,
      time: values.time,
      message: values.message.trim(),
    }

    setStatus('submitting')

    try {
      const result = await submitEnquiry(enquiry, booking)
      setPayload(enquiry)
      setDelivered(Boolean(result.delivered))
      setStatus('success')
    } catch {
      setPayload(enquiry)
      setStatus('error')
    }
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setStatus('idle')
    setPayload(null)
    setDelivered(false)
    window.requestAnimationFrame(() => {
      formRef.current?.querySelector('input')?.focus()
    })
  }

  if (!isOpen) return null

  const busy = status === 'submitting'

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <div
        aria-hidden="true"
        onClick={() => {
          if (!busy) closeBooking()
        }}
        className="absolute inset-0 animate-fade-in bg-ink/70 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        aria-describedby="booking-intro"
        className="relative z-10 flex max-h-[94dvh] w-full max-w-[62rem] animate-modal-in flex-col overflow-hidden bg-ivory shadow-[0_50px_120px_-40px_rgba(0,0,0,0.6)] sm:max-h-[92vh] sm:flex-row"
      >
        <div className="relative hidden w-[38%] shrink-0 overflow-hidden bg-charcoal sm:block">
          <SmartImage
            image={images.modal}
            sizes="(min-width: 992px) 380px, 38vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/15"
          />

          <div className="relative flex h-full flex-col justify-between p-7 lg:p-9">
            <p className="text-[8.5px] uppercase tracking-[0.28em] text-champagne">
              {booking.eyebrow}
            </p>

            <div>
              <p className="font-display text-[1.9rem] leading-tight text-ivory lg:text-[2.15rem]">
                A considered
                <br />
                <em className="italic text-champagne">first impression</em>.
              </p>
              <p className="mt-4 max-w-[15rem] text-[0.78rem] leading-relaxed text-ivory/65">
                Tell the studio what you have in mind. Every appointment begins with a
                conversation.
              </p>
              <div aria-hidden="true" className="mt-6 h-px w-12 bg-champagne/60" />
              <p className="mt-4 text-[8px] uppercase tracking-[0.24em] text-ivory/60">
                {businessConfig.location.display}
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-charcoal/10 px-5 py-4 sm:px-8 sm:py-5">
            <div>
              <p className="text-[8px] uppercase tracking-[0.26em] text-champagne-deep">
                {booking.eyebrow} · {booking.modeLabel}
              </p>
              <h2 id="booking-title" className="mt-1.5 font-display text-[1.6rem] leading-none sm:text-[1.85rem]">
                {booking.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={closeBooking}
              disabled={busy}
              aria-label="Close appointment form"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:bg-charcoal hover:text-ivory disabled:opacity-40"
            >
              <X aria-hidden="true" size={17} strokeWidth={1.4} />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8">
            {status === 'success' || status === 'error' ? (
              <div className="flex min-h-full flex-col">
                {status === 'success' ? (
                  <>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne/60 text-champagne-deep">
                      <Check aria-hidden="true" size={19} strokeWidth={1.6} />
                    </span>

                    <h3
                      ref={statusRef}
                      tabIndex={-1}
                      className="mt-5 font-display text-[1.55rem] leading-tight outline-none"
                    >
                      {delivered ? 'Thank you — your request is on its way.' : 'Your request is ready.'}
                    </h3>

                    <p
                      id="booking-intro"
                      className="mt-2 max-w-md text-[0.82rem] leading-relaxed text-warmgrey"
                    >
                      {delivered
                        ? 'The studio will follow up using the details you shared. Nothing has been confirmed until you hear back.'
                        : 'This is a demonstration preview. Your details were not transmitted, stored or booked, and no appointment exists.'}
                    </p>

                    {payload ? (
                      <dl className="mt-6 border-t border-charcoal/12">
                        <SummaryRow label="Name" value={payload.name} />
                        <SummaryRow label="Phone" value={payload.phone} />
                        {payload.email ? <SummaryRow label="Email" value={payload.email} /> : null}
                        <SummaryRow label="Category" value={payload.category} />
                        {payload.service ? <SummaryRow label="Service" value={payload.service} /> : null}
                        <SummaryRow label="Preferred date" value={formatDate(payload.date)} />
                        <SummaryRow label="Preferred time" value={formatTime(payload.time)} />
                        {payload.message ? <SummaryRow label="Notes" value={payload.message} /> : null}
                      </dl>
                    ) : null}

                    <div className="mt-6 flex flex-wrap gap-3">
                      {whatsappLink ? (
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-solid btn-sm"
                        >
                          <MessageCircle aria-hidden="true" size={14} />
                          Send via WhatsApp
                        </a>
                      ) : null}

                      <button type="button" onClick={reset} className="btn btn-outline btn-sm">
                        <RotateCcw aria-hidden="true" size={13} />
                        Make another enquiry
                      </button>

                      <button type="button" onClick={closeBooking} className="btn btn-sm">
                        Close
                      </button>
                    </div>

                    <p className="mt-auto pt-6 text-[0.66rem] leading-relaxed text-warmgrey">
                      {booking.disclaimer} No payment is taken and no slot is reserved by this
                      form.
                    </p>
                  </>
                ) : (
                  <>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#9b2c2c]/40 text-[#9b2c2c]">
                      <Info aria-hidden="true" size={19} strokeWidth={1.6} />
                    </span>
                    <h3
                      ref={statusRef}
                      tabIndex={-1}
                      className="mt-5 font-display text-[1.55rem] leading-tight outline-none"
                    >
                      Something went wrong.
                    </h3>
                    <p
                      id="booking-intro"
                      className="mt-2 max-w-md text-[0.82rem] leading-relaxed text-warmgrey"
                    >
                      The enquiry could not be sent. Nothing has been booked. Please try again, or
                      contact the studio directly if the problem continues.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="btn btn-solid btn-sm"
                      >
                        Try again
                        <ArrowUpRight aria-hidden="true" />
                      </button>
                      <button type="button" onClick={closeBooking} className="btn btn-outline btn-sm">
                        Close
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <p id="booking-intro" className="max-w-lg text-[0.82rem] leading-relaxed text-warmgrey">
                  {booking.intro}
                </p>

                <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-6">
                  <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="booking-name" className="field-label">
                        Full name <span className="text-champagne-deep">*</span>
                      </label>
                      <input
                        id="booking-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        className="field"
                        placeholder="Your name"
                        value={values.name}
                        onChange={update('name')}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'booking-name-error' : undefined}
                        required
                      />
                      {errors.name ? (
                        <p id="booking-name-error" className="field-error" role="alert">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="booking-phone" className="field-label">
                        Phone <span className="text-champagne-deep">*</span>
                      </label>
                      <input
                        id="booking-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        className="field"
                        placeholder="Mobile number"
                        value={values.phone}
                        onChange={update('phone')}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'booking-phone-error' : undefined}
                        required
                      />
                      {errors.phone ? (
                        <p id="booking-phone-error" className="field-error" role="alert">
                          {errors.phone}
                        </p>
                      ) : null}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="booking-email" className="field-label">
                        Email <span className="normal-case tracking-normal text-warmgrey">(optional)</span>
                      </label>
                      <input
                        id="booking-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="field"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={update('email')}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'booking-email-error' : undefined}
                      />
                      {errors.email ? (
                        <p id="booking-email-error" className="field-error" role="alert">
                          {errors.email}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="booking-category" className="field-label">
                        Service category <span className="text-champagne-deep">*</span>
                      </label>
                      <select
                        id="booking-category"
                        name="category"
                        className="field"
                        value={values.category}
                        onChange={update('category')}
                        aria-invalid={Boolean(errors.category)}
                        aria-describedby={errors.category ? 'booking-category-error' : undefined}
                        required
                      >
                        <option value="">Select a category</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.name}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                      {errors.category ? (
                        <p id="booking-category-error" className="field-error" role="alert">
                          {errors.category}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="booking-service" className="field-label">
                        Service <span className="normal-case tracking-normal text-warmgrey">(optional)</span>
                      </label>
                      <select
                        id="booking-service"
                        name="service"
                        className="field"
                        value={values.service}
                        onChange={update('service')}
                        disabled={!activeCategory}
                      >
                        <option value="">
                          {activeCategory ? 'Not sure yet' : 'Choose a category first'}
                        </option>
                        {serviceOptions.map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="booking-date" className="field-label">
                        Preferred date <span className="text-champagne-deep">*</span>
                      </label>
                      <input
                        id="booking-date"
                        name="date"
                        type="date"
                        min={todayISO()}
                        className="field"
                        value={values.date}
                        onChange={update('date')}
                        aria-invalid={Boolean(errors.date)}
                        aria-describedby={errors.date ? 'booking-date-error' : undefined}
                        required
                      />
                      {errors.date ? (
                        <p id="booking-date-error" className="field-error" role="alert">
                          {errors.date}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="booking-time" className="field-label">
                        Preferred time <span className="text-champagne-deep">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="booking-time"
                          name="time"
                          className="field"
                          value={values.time}
                          onChange={update('time')}
                          aria-invalid={Boolean(errors.time)}
                          aria-describedby={errors.time ? 'booking-time-error' : undefined}
                          required
                        >
                          <option value="">Select a time</option>
                          {booking.timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {formatTime(slot)}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.time ? (
                        <p id="booking-time-error" className="field-error" role="alert">
                          {errors.time}
                        </p>
                      ) : null}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="booking-message" className="field-label">
                        Anything the studio should know?{' '}
                        <span className="normal-case tracking-normal text-warmgrey">(optional)</span>
                      </label>
                      <textarea
                        id="booking-message"
                        name="message"
                        rows={3}
                        className="field"
                        placeholder="Hair length, occasion, inspiration, or a preferred stylist…"
                        value={values.message}
                        onChange={update('message')}
                      />
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col gap-4 border-t border-charcoal/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex max-w-xs items-start gap-2 text-[0.66rem] leading-relaxed text-warmgrey">
                      <Info aria-hidden="true" size={12} strokeWidth={1.5} className="mt-0.5 shrink-0 text-champagne-deep" />
                      {booking.disclaimer}
                    </p>

                    <button
                      type="submit"
                      disabled={busy}
                      className="btn btn-solid shrink-0 disabled:opacity-70"
                    >
                      {busy ? 'Sending…' : 'Request appointment'}
                      {busy ? null : <ArrowUpRight aria-hidden="true" />}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
