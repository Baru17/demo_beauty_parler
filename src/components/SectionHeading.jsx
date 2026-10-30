import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
  as: Tag = 'h2',
  className = '',
  titleClassName = '',
  introClassName = '',
  children,
}) {
  return (
    <div className={className}>
      {eyebrow ? (
        <Reveal
          as="p"
          className={`eyebrow ${dark ? 'eyebrow-light' : ''}`}
          style={{ color: dark ? '#b9b2a8' : undefined }}
        >
          {eyebrow}
        </Reveal>
      ) : null}

      <Reveal as={Tag} delay={70} className={`display-2 mt-5 ${titleClassName}`.trim()}>
        {title}
      </Reveal>

      {intro ? (
        <Reveal
          as="p"
          delay={130}
          className={`mt-6 max-w-xl ${dark ? 'text-[#b5aea4]' : 'lead'} ${introClassName}`.trim()}
        >
          {intro}
        </Reveal>
      ) : null}

      {children}
    </div>
  )
}
